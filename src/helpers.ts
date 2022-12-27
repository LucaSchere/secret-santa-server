import {Server} from "socket.io";
import {Socket} from "./types";

export const getMembersNickNames = (io: Server, roomId: string) => {
    let sockets: Socket[];
    const socketsIds = getSocketIdsOfRoom(io, roomId);
    const fetchedSockets = socketsIds.map(id => io.sockets.sockets.get(id));

    // @ts-ignore
    sockets = fetchedSockets.filter(socket => socket !== undefined);
    return sockets.map(socket => {
        return {
            name: socket.data.nickName,
            id: socket.id
        }
    });
};

export const getSocketIdsOfRoom = (io: Server, roomId: string) => {
    const roomMap = io.sockets.adapter.rooms.get(roomId);
    if (roomMap !== undefined) {
        return Array.from(roomMap);
    }
    return [];
}
