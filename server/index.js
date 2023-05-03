import express from "express";
import { Server as SocketServer } from "socket.io";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import { PORT } from "./config.js";
import { connectionDb } from "./db.js";
import passport from "passport";
import cookieSession from "cookie-session";
import userRoutes from "./routes/userRoutes.js";
import socialRoutes from "./routes/socialRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import http from 'http';
import cors from "cors";

const app = express();
app.use(cors());
const httpServer = http.createServer(app);
const io = new SocketServer(httpServer, {
    cors: {
        origin: 'http://localhost:3000'
    }
});

connectionDb();



io.on('connection', (socket) => { //ultimo hecho
    socket.on('newMessage', (newMessages, messageData) => {
        socket.broadcast.emit('receiveMessage', socket.id, newMessages, messageData);
    })
})

//settings

//middlewares
app.use(express.text());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './usersImg',
}));
app.use(cookieSession({
    name:"session",
    keys:["authenticated"],
    maxAge: 24 * 24 * 60 * 100
}))

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('tiny'));

//routes
app.use(userRoutes);
app.use(socialRoutes);
app.use(chatRoutes);

//listen
httpServer.listen(PORT);

console.log("the server is connected in port:", PORT);