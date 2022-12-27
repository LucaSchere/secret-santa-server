"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketIdsOfRoom = exports.getMembersNickNames = void 0;
const getMembersNickNames = (io, roomId) => {
    let sockets;
    const socketsIds = (0, exports.getSocketIdsOfRoom)(io, roomId);
    const fetchedSockets = socketsIds.map(id => io.sockets.sockets.get(id));
    // @ts-ignore
    sockets = fetchedSockets.filter(socket => socket !== undefined);
    return sockets.map(socket => {
        return {
            name: socket.data.nickName,
            id: socket.id
        };
    });
};
exports.getMembersNickNames = getMembersNickNames;
const getSocketIdsOfRoom = (io, roomId) => {
    const roomMap = io.sockets.adapter.rooms.get(roomId);
    if (roomMap !== undefined) {
        return Array.from(roomMap);
    }
    return [];
};
exports.getSocketIdsOfRoom = getSocketIdsOfRoom;
