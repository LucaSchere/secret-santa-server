import {Room} from "./types";

export interface IServerToClientEvents {
    'changed-room': (room: Room) => void;
    'draw-results': (room: Room, santaOf: string) => void;
    'error': (message: string) => void;
}

export interface IClientToServerEvents {
    'create-room': (args: {nickName: string, roomName: string}) => void;
    'join-room': (args: {nickName: string, roomId: string}) => void;
    'draw-room': (args: {roomId: string}) => void;
}

export interface IInterServerEvents {}

export interface ISocketData {
    'nickName': string;
}