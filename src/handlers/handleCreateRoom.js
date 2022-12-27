"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const short_unique_id_1 = __importDefault(require("short-unique-id"));
const uid = new short_unique_id_1.default({
    length: 6,
    dictionary: 'hex'
});
const handleCreateRoom = (args, socket, io, storage) => {
    const roomId = uid().toUpperCase();
    socket.data.nickName = args.nickName;
    socket.join(roomId);
    storage.setRoomData(roomId, { name: args.roomName, owner: socket.id, started: false });
    io.to(roomId).emit('changed-room', {
        roomId: roomId,
        members: (0, helpers_1.getMembersNickNames)(io, roomId),
        name: args.roomName,
        owner: socket.id,
        you: socket.id,
        started: false,
    });
};
exports.default = handleCreateRoom;
