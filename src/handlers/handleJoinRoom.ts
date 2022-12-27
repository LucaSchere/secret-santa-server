import {Server} from "socket.io"
import {getMembersNickNames, getSocketIdsOfRoom} from "../helpers";
import {Errors, Socket} from "../types";
import {Storage} from "../storage";

const handleJoinRoom = async (args: { nickName: string, roomId: string }, socket: Socket, io: Server, storage: Storage) => {
    try {
        const roomData = await storage.getRoomData(args.roomId);

        if (roomData.started) {
            io.to(socket.id).emit('error', {message: Errors.room_already_started});
            return;
        }

        socket.data.nickName = args.nickName;
        socket.join(args.roomId);

        getSocketIdsOfRoom(io, args.roomId).forEach(socketId => {
            io.to(socketId).emit('changed-room',
                {
                    roomId: args.roomId,
                    members: getMembersNickNames(io, args.roomId),
                    name: roomData.name,
                    owner: roomData.owner,
                    you: socketId,
                    started: roomData.started,
                });
        });
    } catch (error) {
        io.to(socket.id).emit('error', {message: error});
    }
}
export default handleJoinRoom;