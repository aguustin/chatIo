import chatGroup from '../models/chatModel.js';
import users from '../models/users.js';

export const addNewChannelController = async (req, res) => {
     const {title, description, idMember, profilePhoto, memberEmail} = req.body;

        const newChannel = await new chatGroup({
            title: title,
            description: description,
            members: { 
            idMember : idMember,
            profilePhoto: profilePhoto,
            memberEmail: memberEmail
            }
         });
         const response = await newChannel.save();
         res.send(response);
}

export const addMemberController = async (req, res) => {
    const {channelId, memberEmail} = req.body;
    const userExist = await users.find({email: memberEmail});

    if(userExist){
        const memberExist = await chatGroup.find({_id: channelId, "members.memberEmail": memberEmail});
        if(memberExist.length !== 0){
            console.log("usuario ya existe en el grupo");
            
        }else{
            await chatGroup.updateOne(
                {_id: channelId},
                {
                    $addToSet:{
                        members: {
                            idMember: userExist[0]._id.valueOf(),
                            profilePhoto: userExist[0].photo.url,
                            memberEmail: memberEmail
                        }
                    }
                }
            )

            const updateMemberList = await chatGroup.find({_id: channelId});
            res.send(updateMemberList);
        }
    }else{
        res.sendStatus(201);
    }

}

export const openChannelController = async (req, res) => {

    const {channelId} = req.params; 
    const getOldMessages = await chatGroup.find({_id: channelId});
    
    res.send(getOldMessages);
 
}

export const sendMessageController = async (req, res) => {
    const {id, memberPhoto, memberEmail, memberName, messageDate, messageMember} = req.body;

    await chatGroup.updateOne(
        {_id: id},
        {
            $addToSet:{
                message:{
                    memberPhoto: memberPhoto,
                    memberEmail: memberEmail,
                    memberName: memberName, 
                    messageDate: messageDate,
                    messageMember: messageMember
                }
            }
        }
    )
    
    res.send({memberPhoto, memberEmail, memberName,  messageDate, messageMember});
}

export const findChannelsController = async (req, res) => {
     const {session} = req.params;
     console.log(session);
     const allChannels = await chatGroup.find({"members.idMember" : session});
     res.send(allChannels);
}

export const searchChannelsController = async (req, res) => {
    const {search} = req.body;
    const response = await chatGroup.find({ title: { '$regex': search, '$options': 'i' } });
    res.send(response);
}

export const deleteAllMessages = async (req, res) => {
    await chatGroup.deleteMany({});
    res.sendStatus(200);
}

export const getAllChannels = async (req, res) =>{
    const response = await chatGroup.find({});
    res.send(response);
}
