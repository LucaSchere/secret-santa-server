import {Server} from "socket.io";
import handleCreateRoom from "./handleCreateRoom";
import handleJoinRoom from "./handleJoinRoom";
import {getMembersNickNames} from "../helpers";
import {Socket} from "../types";
import {Storage} from "../storage";
import handleDrawRoom from "./handleDrawRoom";

const handleConnect = (socket: Socket, io: Server, storage: Storage) => {

    let socketRoomIds: Set<any> = new Set();

    socket.on('create-room', args => handleCreateRoom(args, socket, io, storage));
    socket.on('join-room', args => handleJoinRoom(args, socket, io, storage));
    socket.on('draw-room', args => handleDrawRoom(args, socket, io, storage));
    socket.on('disconnecting', () => socketRoomIds = socket.rooms);
    socket.on('disconnect', () => {
        socketRoomIds.forEach(roomId => {
            if(!io.sockets.adapter.rooms.get(roomId)) {
                storage.deleteRoomData(roomId);
            }
            io.to(roomId).emit('changed-room', {roomId: roomId, members: getMembersNickNames(io, roomId)});
        });
    });
}
export default handleConnect;