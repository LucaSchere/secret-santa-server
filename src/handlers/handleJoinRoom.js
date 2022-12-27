"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../helpers");
const types_1 = require("../types");
const handleJoinRoom = async (args, socket, io, storage) => {
    try {
        const roomData = await storage.getRoomData(args.roomId);
        if (roomData.started) {
            io.to(socket.id).emit('error', { message: types_1.Errors.room_already_started });
            return;
        }
        socket.data.nickName = args.nickName;
        socket.join(args.roomId);
        (0, helpers_1.getSocketIdsOfRoom)(io, args.roomId).forEach(socketId => {
            io.to(socketId).emit('changed-room', {
                roomId: args.roomId,
                members: (0, helpers_1.getMembersNickNames)(io, args.roomId),
                name: roomData.name,
                owner: roomData.owner,
                you: socketId,
                started: roomData.started,
            });
        });
    }
    catch (error) {
        io.to(socket.id).emit('error', { message: error });
    }
};
exports.default = handleJoinRoom;
