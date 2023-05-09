import { createContext, useEffect, useState } from "react";
import { obtainChannelsRequest, addChannelRequest, addMemberRequest, openChannelRequest, sendMessageRequest, searchChannelRequest } from "../api/chatRequest";

const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
   const [messages, setMessage] = useState([]);
   const [channels, setChannels] = useState([]);
   const [socketMessages, setSocketMessages] = useState([]);
   const [newMessages, setNewMessages] = useState([]);
   
   const memberData = JSON.parse(localStorage.getItem("credentials"));

   useEffect(() => {
        (async () => {
            await obtainChannelContext();
        })();
        // eslint-disable-next-line
   }, [])

   const obtainChannelContext = async () => {
     const channelsData = await obtainChannelsRequest(memberData[0]._id);
     setChannels(channelsData.data);
   }

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
    setChannels(res.data);
   }

   const sendMessageContext = async (messageData) => {
    const res = await sendMessageRequest(messageData);
    setSocketMessages([...socketMessages, res.data]);
   }

   const searchChannelContext = async (search) => {
     const res = await searchChannelRequest(search);
     setChannels(res.data);
   }

   return(
    <ChatContext.Provider value={{
     obtainChannelContext,
     addChannelContext, 
     addMemberContext, 
     openChannelContext, 
     sendMessageContext, 
     memberData, 
     channels, 
     messages, 
     socketMessages, 
     setSocketMessages, 
     newMessages, 
     setNewMessages,
     searchChannelContext
}}>{children}</ChatContext.Provider>
   )
}

export default ChatContext;
