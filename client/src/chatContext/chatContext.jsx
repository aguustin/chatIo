import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { obtainChannelsRequest ,addChannelRequest, openChannelRequest } from "../api/chatRequest";

const socket = io('http://localhost:4000');

const ChatContext = createContext();

export const ChatContextProvider = ({children}) => {
   const [messages, setMessage] = useState([]);
   const [channels, setChannels] = useState([]);
   
   const a = JSON.parse(localStorage.getItem("credentials"));
   useEffect(() => {
        (async () => {
            const channelsData = await obtainChannelsRequest(a[0]._id);
            setChannels(channelsData.data);
        })();
   }, [])

   const addChannelContext = async (channelPropierties) => {
    const res = await addChannelRequest(channelPropierties);
    setChannels([...channels, res.data]);
   }

   const openChannelContext = async (channelId) => {
    const res = await openChannelRequest(channelId);
    setMessage(res.data);
   }

   const sendMessageContext = async (msj) => {
    socket.emit("newMessage", msj);
    setMessage([...messages, msj]);
   }

   return(
    <ChatContext.Provider value={{addChannelContext, openChannelContext, sendMessageContext, channels, messages}}>{children}</ChatContext.Provider>
   )
}

export default ChatContext;