"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleCreateRoom_1 = __importDefault(require("./handleCreateRoom"));
const handleJoinRoom_1 = __importDefault(require("./handleJoinRoom"));
const helpers_1 = require("../helpers");
const handleDrawRoom_1 = __importDefault(require("./handleDrawRoom"));
const handleConnect = (socket, io, storage) => {
    let socketRoomIds = new Set();
    socket.on('create-room', args => (0, handleCreateRoom_1.default)(args, socket, io, storage));
    socket.on('join-room', args => (0, handleJoinRoom_1.default)(args, socket, io, storage));
    socket.on('draw-room', args => (0, handleDrawRoom_1.default)(args, socket, io, storage));
    socket.on('disconnecting', () => socketRoomIds = socket.rooms);
    socket.on('disconnect', () => {
        socketRoomIds.forEach(roomId => {
            if (!io.sockets.adapter.rooms.get(roomId)) {
                storage.deleteRoomData(roomId);
            }
            io.to(roomId).emit('changed-room', { roomId: roomId, members: (0, helpers_1.getMembersNickNames)(io, roomId) });
        });
    });
};
exports.default = handleConnect;
