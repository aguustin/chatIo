import { Router } from "express";
import { addNewChannelController, addMemberController, openChannelController, sendMessageController, findChannelsController, deleteAllMessages } from "../controllers/chatController.js";

const router = Router();

router.post('/addChannel', addNewChannelController);

router.post('/addMember', addMemberController);

router.get('/openChannel/:channelId', openChannelController);

router.post('/sendMessage', sendMessageController);

router.get('/getChannels/:session', findChannelsController);

router.delete('/deleteAll', deleteAllMessages);

export default router;