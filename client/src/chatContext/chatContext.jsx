import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { obtainChannelsRequest, addChannelRequest, addMemberRequest, openChannelRequest, sendMessageRequest } from "../api/chatRequest";

const socket = io('http://localhost:4000');

const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
   const [messages, setMessage] = useState([]);
   const [channels, setChannels] = useState([]);
   
   const memberData = JSON.parse(localStorage.getItem("credentials"));
     console.log(memberData);
   useEffect(() => {
        (async () => {
            const channelsData = await obtainChannelsRequest(memberData[0]._id);
            setChannels(channelsData.data);
        })();
   }, [])

   const addChannelContext = async (channelPropierties) => {
        const res = await addChannelRequest(channelPropierties);
        setChannels([...channels, res.data]);
   }

   const addMemberContext = async (addMember) => {
        await addMemberRequest(addMember);
   }

   const openChannelContext = async (channelId) => {
    const res = await openChannelRequest(channelId);
    setMessage(res.data);
   }

   const sendMessageContext = async (msj, messageData) => {
    socket.emit("newMessage", msj);
    setMessage([...messages, msj]);
    await sendMessageRequest(messageData);
   }

   return(
    <ChatContext.Provider value={{addChannelContext, addMemberContext, openChannelContext, sendMessageContext, memberData, channels, messages}}>{children}</ChatContext.Provider>
   )
}

export default ChatContext;