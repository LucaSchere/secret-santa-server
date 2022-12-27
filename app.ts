import {Server} from "socket.io";
import 'dotenv/config';
import handleConnect from "./src/handlers/handleConnect";
import {Socket} from "./src/types";
import {Storage} from "./src/storage";
import * as http from "http";

const express = require( "express" );
const app = express();

const storage = new Storage();

const options = {
    cors: {
        origin: process.env.CORS_ORIGIN,
        matchOriginProtocol: true,
        transports: ["websocket"],
    },
    allowEIO3: true
};

const server = http.createServer(app)

const io = new Server(server, options);

io.on("connect", (socket: Socket) => handleConnect(socket, io, storage));

server.listen(process.env.port || 3000, () => {
    console.log(`listening on *:${process.env.port || 3000}`);
});

