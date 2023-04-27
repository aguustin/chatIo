import { Router } from "express";
import { addNewChannelController, openChannelController, enterMessageController, findChannelsController } from "../controllers/chatController.js";

const router = Router();

router.post('/addChannel', addNewChannelController);

router.get('/openChannel/:channelId', openChannelController);

router.post('/senedMessage', enterMessageController);

router.get('/getChannels/:session', findChannelsController);

export default router;