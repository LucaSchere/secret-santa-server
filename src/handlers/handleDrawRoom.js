"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../types");
const helpers_1 = require("../helpers");
const secret_santa_draw_1 = require("secret-santa-draw");
const MIN_ROOM_MEMBERS = 3;
const handleDrawRoom = async (args, socket, io, storage) => {
    const socketIds = (0, helpers_1.getSocketIdsOfRoom)(io, args.roomId);
    if (socketIds.length < MIN_ROOM_MEMBERS) {
        io.to(socket.id).emit('error', { message: types_1.Errors.to_less_members });
        return;
    }
    await storage.startRoom(args.roomId);
    const shuffledIds = (0, secret_santa_draw_1.draw)(socketIds);
    try {
        const roomData = await storage.getRoomData(args.roomId);
        socketIds.forEach((socketId, index) => {
            io.to(socketId).emit('draw-results', {
                room: {
                    roomId: args.roomId,
                    members: (0, helpers_1.getMembersNickNames)(io, args.roomId),
                    name: roomData.name,
                    owner: roomData.owner,
                    you: socketId,
                    started: roomData.started,
                },
                santaOf: shuffledIds[index],
            });
        });
    }
    catch (error) {
        io.to(socket.id).emit('error', { message: error });
    }
};
exports.default = handleDrawRoom;
