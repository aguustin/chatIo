import axios from "axios";

export const obtainChannelsRequest = (session) => axios.get(`/getChannels/${session}`); 

export const addChannelRequest = (channelPropierties) => axios.post('/addChannel', channelPropierties);

export const addMemberRequest = (addMember) => axios.post('/addMember', addMember);

export const openChannelRequest = (channelId) => axios.get(`/openChannel/${channelId}`);

export const sendMessageRequest = (messageData) => axios.post('/sendMessage', messageData);

export const searchChannelRequest = (search) => axios.post('/searchChannel', search);