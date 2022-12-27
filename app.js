"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
require("dotenv/config");
const handleConnect_1 = __importDefault(require("./src/handlers/handleConnect"));
const storage_1 = require("./src/storage");
const storage = new storage_1.Storage();
const origin = process.env.NODE_ENV === 'production' ? process.env.CORS_ORIGIN_PROD : process.env.CORS_ORIGIN;
const options = {
    cors: { origin: origin },
    matchOriginProtocol: true,
    transports: ["websocket"],
};
// @ts-ignore
const io = new socket_io_1.Server(8080, options);
io.on("connect", (socket) => (0, handleConnect_1.default)(socket, io, storage));
