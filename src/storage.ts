import {LocalStorage} from "node-persist";
import {Errors, RoomData} from "./types";

export class Storage {
    private storage: LocalStorage;

    constructor() {
        this.storage = require('node-persist');
        this.storage.init({
            stringify: JSON.stringify,
            parse: JSON.parse,
            encoding: 'utf8',
        }).then(async () => {
            await this.storage.clear();
            console.log('persistent localstorage initialized');
        });
    }

    getRoomData = (roomId: string): Promise<RoomData> => {
        return new Promise((resolve, reject) => {
            this.storage.getItem(roomId)
                .then(data => {
                    if (data) resolve(data);
                    reject(Errors.room_not_found);
                })
                .catch(err => reject(err));
        });
    }

    setRoomData = (roomId: string, roomData: RoomData): void => {
        this.storage.setItem(roomId, roomData)
            .then(() => console.log(`Room ${roomId} data saved`))
            .catch(err => console.log(err));
    }

    deleteRoomData = (roomId: string): void => {
        this.storage.removeItem(roomId)
            .then(() => {
                console.log(`Room ${roomId} data deleted`);
            })
            .catch(err => console.log(err));
    }

    startRoom = async (roomId: string): Promise<void> => {
        return new Promise(async (resolve, reject) => {
            const roomData = await this.storage.getItem(roomId);
            roomData.started = true;
            try {
                await this.storage.setItem(roomId, roomData);
                console.log(`Room ${roomId} started`)
                resolve();
            } catch (err) {
                console.log(err);
                reject();
            }
        });
    }
}