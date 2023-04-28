import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    title:{
        type:String,
        require: true
    },
    description:{
        type: String
    },
    members:[
        {
        idMember:{
            type:String
        },
        memberEmail:{
            type:String
        }
    }
    ],
    message:[
        {
            memberPhoto:{
                type:String
            },
            memberName:{
                type:String
            },
            messageDate:{
                type:String
            },
            messageMember:{
                type:String
            }
        }
    ]
});

export default mongoose.model("chatGroup", chatSchema);