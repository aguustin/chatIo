import chatGroup from '../models/chatModel.js';
import { imageUploader } from '../libs/cloudinary.js';
import fs from "fs-extra";

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

export const openChannelController = async (req, res) => {

    const {channelId} = req.params; 
    const getOldMessages = await chatGroup.find({_id: channelId});
    
    res.send(getOldMessages);
    /*const {id, idMember, memberName} = req.body;
 
    const userExist = await chatGroup.find({"members.idMember": idMember});

    if(userExist.length === 0){
        
       const getOldMessages = await chatGroup.find({_id: id});

       res.send(getOldMessages);

    }else{
        if(req.files){

            const result = await imageUploader(req.files.memberPhoto.tempFilePath);
            await fs.remove(req.files.memberPhoto.tempFilePath);

            const memberPhoto = result.secure_url;
            console.log(memberPhoto); 
            const saveMemberInChannel = await chatGroup.updateOne(
                {_id: id},
                {
                    $addToSet:{
                        message:{ 
                            memberPhoto: memberPhoto,
                            memberName: memberName,
                            messageMember: "Hi Guys"
                        }
                    }
                }
             )

             res.send(saveMemberInChannel);

            }else{      

                const saveMemberInChannel = await chatGroup.updateOne(
                    {_id: id},
                    {
                        $addToSet:{
                            message:{ 
                                memberName: memberName,
                                messageMember: "Hi Guys"
                            }
                        }
                    }
                 )
                res.send(saveMemberInChannel);

            }
    }*/
}

export const enterMessageController = async (req, res) => {
    const {id, memberPhoto, memberName, messageDate, memberMessage} = req.body;

    await chatGroup.updateOne(
        {_id: id},
        {
            $addToSet:{
                message:{
                    memberPhoto: memberPhoto,
                    memberName: memberName, 
                    messageDate: messageDate,
                    messageMember: memberMessage
                }
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


export const findChannelsController = async (req, res) => {
     const {session} = req.params;
     const allChannels = await chatGroup.find({"members.idMember" : session});
     res.send(allChannels);
}
