import { createContext, useEffect, useState } from "react";
import { obtainChannelsRequest, addChannelRequest, addMemberRequest, openChannelRequest, sendMessageRequest } from "../api/chatRequest";

const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
   const [messages, setMessage] = useState([]);
   const [channels, setChannels] = useState([]);
   const [socketMessages, setSocketMessages] = useState([]);
   const [newMessages, setNewMessages] = useState([]);
   
   const memberData = JSON.parse(localStorage.getItem("credentials"));

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
    //setSocketMessages(res.data[0].message); 
    setNewMessages(res.data[0].message);
   }

   const sendMessageContext = async (messageData) => {
    const res = await sendMessageRequest(messageData);
    setSocketMessages([...socketMessages, res.data]);
   }

   return(
    <ChatContext.Provider value={{addChannelContext, addMemberContext, openChannelContext, sendMessageContext, memberData, channels, messages, socketMessages, setSocketMessages, newMessages, setNewMessages}}>{children}</ChatContext.Provider>
   )
}

export default ChatContext;

/*traer solo los mensajes de la base de datos y guardalos en un nuevo estado llamado "oldMessages" y que solo traiga los "messages" de la base de datos, luego
 agregarle a los socketMessage los oldMessages mas el nuevo mensaje retornado por sendMessageRequest*/