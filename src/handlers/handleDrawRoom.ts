import {Errors, Socket} from "../types";
import {Server} from "socket.io";
import {Storage} from "../storage";
import {getMembersNickNames, getSocketIdsOfRoom} from "../helpers";
import {draw} from "secret-santa-draw";

const MIN_ROOM_MEMBERS = 3;

const handleDrawRoom = async (args: { roomId: string }, socket: Socket, io: Server, storage: Storage) => {
    const socketIds = getSocketIdsOfRoom(io, args.roomId);

    if (socketIds.length < MIN_ROOM_MEMBERS) {
        io.to(socket.id).emit('error', {message: Errors.to_less_members});
        return;
    }

    await storage.startRoom(args.roomId);

    const shuffledIds = draw(socketIds);

    try {
        const roomData = await storage.getRoomData(args.roomId)

        socketIds.forEach((socketId, index) => {
            io.to(socketId).emit('draw-results', {
                room: {
                    roomId: args.roomId,
                    members: getMembersNickNames(io, args.roomId),
                    name: roomData.name,
                    owner: roomData.owner,
                    you: socketId,
                    started: roomData.started,
                },
                santaOf: shuffledIds[index],
            });
        });
    } catch (error) {
        io.to(socket.id).emit('error', {message: error});
    }

}
export default handleDrawRoom;