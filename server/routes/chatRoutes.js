import { Router } from "express";
import { addNewChannelController, enterInChannelController, findChannelsController } from "../controllers/chatController.js";

const router = Router();

router.post('/addChannel', addNewChannelController);

router.post('/enterChannel', enterInChannelController);

router.get('/getChannels/:id', findChannelsController);

export default router;