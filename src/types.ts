import {Socket as OriginalSocket} from "socket.io";
import {IClientToServerEvents, IInterServerEvents, IServerToClientEvents, ISocketData} from "./socketTypes";

export type Socket = OriginalSocket<IClientToServerEvents,
    IServerToClientEvents,
    IInterServerEvents,
    ISocketData>;

export type Room = {
    roomId: string,
    members: { name:string, id:string }[],
    name: string,
    owner: string,
    you: string,
    started: boolean,
};

export type RoomData = {
    name: string,
    owner: string,
    started: boolean
}

export enum Errors {
    room_not_found = 'room_not_found',
    to_less_members = 'to_less_members',
    room_already_started = 'room_already_started',
}