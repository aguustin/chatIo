import axios from "axios";

export const obtainChannelsRequest = (session) => axios.get(`/getChannels/${session}`); 

export const addChannelRequest = (channelPropierties) => axios.post('/addChannel', channelPropierties);

export const openChannelRequest = (channelId) => axios.get(`/openChannel/${channelId}`);