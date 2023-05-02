import chatGroup from '../models/chatModel.js';
import users from '../models/users.js';

export const addNewChannelController = async (req, res) => {
     const {title, description, idMember} = req.body;

     const newChannel = await new chatGroup({
        title: title,
        description: description,
        members: { idMember : idMember}
     });

     const response = await newChannel.save();

     res.send(response);
}

export const addMemberController = async (req, res) => {
    const {channelId, memberEmail} = req.body;
    const userExist = await users.find({email: memberEmail});

    if(userExist.length !== 0){
        const memberExist = await chatGroup.find({"members.memberEmail": memberEmail})

        if(memberExist.length !== 0){
            console.log("usuario ya existe en el grupo");
        }else{
            const updateMemberList = await chatGroup.updateOne(
                {_id: channelId},
                {
                    $addToSet:{
                        members: {
                            idMember: userExist[0]._id.valueOf(),
                            memberEmail: memberEmail
                        }
                    }
                }
            )
            res.send(updateMemberList);
        }
    }else{
        res.sendStatus(400);
    }

}

export const openChannelController = async (req, res) => {

    const {channelId} = req.params; 
    const getOldMessages = await chatGroup.find({_id: channelId});
    
    res.send(getOldMessages);
 
}

export const sendMessageController = async (req, res) => {
    const {id, memberPhoto, memberEmail, memberName, messageDate, messageMember} = req.body;
    console.log(id);
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
    
    /*const updateGroupMessages = await chatGroup.find(
        {_id: id},
        {message: {$elemMatch: { messageMember: messageMember}}}
    )*/
    res.send({memberPhoto, memberEmail, memberName,  messageDate, messageMember});
}

export const findChannelsController = async (req, res) => {
     const {session} = req.params;
     const allChannels = await chatGroup.find({"members.idMember" : session});
     res.send(allChannels);
}

export const deleteAllMessages = async (req, res) => {
    await chatGroup.deleteMany({});
    res.sendStatus(200);
}
