import chatGroup from '../models/chatModel.js';

export const addNewChannelController = async (req, res) => {
     const {title, description} = req.body;

     const newChannel = await new chatGroup({
        title: title,
        description: description
     });

     const response = await newChannel.save();

     res.send(response);
}

export const enterInChannelController = async (req, res) => {
    const {id, idMember, memberName} = req.params;

    const userExist = await chatGroup.find({"members.idMember": idMember});

    if(userExist.length !== 0){

       const getOldMessages = await chatGroup.find({_id: id});

       res.send(getOldMessages);

    }else{

        const saveMemberInChannel = await chatGroup.updateOne(
            {_id: id},
            {
                $addToSet:{
                    members:{ idMember: idMember }
                }
            }
         )
        const response = await saveMemberInChannel.save();
        res.send(response);
    }
}

export const enterMessageController = async (req, res) => {
    const {id, memberName, messageDate, memberMessage} = req.body;

    await chatGroup.updateOne(
        {_id: id},
        {
            $addToSet:{
                message:{memberName, messageDate, messageMember}
            }
        }
    )
    
    const updateGroupMessages = await chatGroup.find(
        {_id: id},
        {
            $last:{ message }
        });

    res.send(updateGroupMessages);
}
