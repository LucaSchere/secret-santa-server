import {Server} from "socket.io";
import {getMembersNickNames} from "../helpers";
import {Socket} from "../types";
import {Storage} from "../storage";
import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId({
    length: 6,
    dictionary: 'hex'
});

const handleCreateRoom = (args: { nickName: any; roomName: string; }, socket: Socket, io: Server, storage: Storage) => {
    const roomId = uid().toUpperCase();
    socket.data.nickName = args.nickName;
    socket.join(roomId);
    storage.setRoomData(roomId, {name: args.roomName, owner: socket.id, started: false});

    io.to(roomId).emit('changed-room',
        {
            roomId: roomId,
            members: getMembersNickNames(io, roomId),
            name: args.roomName,
            owner: socket.id,
            you: socket.id,
            started: false,
        });
}
export default handleCreateRoom;