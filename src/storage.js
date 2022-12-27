"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Storage = void 0;
const types_1 = require("./types");
class Storage {
    constructor() {
        this.getRoomData = (roomId) => {
            return new Promise((resolve, reject) => {
                this.storage.getItem(roomId)
                    .then(data => {
                    if (data)
                        resolve(data);
                    reject(types_1.Errors.room_not_found);
                })
                    .catch(err => reject(err));
            });
        };
        this.setRoomData = (roomId, roomData) => {
            this.storage.setItem(roomId, roomData)
                .then(() => console.log(`Room ${roomId} data saved`))
                .catch(err => console.log(err));
        };
        this.deleteRoomData = (roomId) => {
            this.storage.removeItem(roomId)
                .then(() => {
                console.log(`Room ${roomId} data deleted`);
            })
                .catch(err => console.log(err));
        };
        this.startRoom = async (roomId) => {
            return new Promise(async (resolve, reject) => {
                const roomData = await this.storage.getItem(roomId);
                roomData.started = true;
                try {
                    await this.storage.setItem(roomId, roomData);
                    console.log(`Room ${roomId} started`);
                    resolve();
                }
                catch (err) {
                    console.log(err);
                    reject();
                }
            });
        };
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
}
exports.Storage = Storage;
