"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initSocketSever = void 0;
const socket_io_1 = require("socket.io");
const initSocketSever = (server) => {
    const io = new socket_io_1.Server(server);
    io.on("connection", (socket) => {
        console.log("A User has been connected");
        // listen for notification form frontend
        socket.on("notification", (data) => {
            //Broadcast the notification data to all connected clients (admin dashboard)
            io.emit("newNotification", data);
        });
        socket.on("disconnect", () => {
            console.log("User Disconnected");
        });
    });
};
exports.initSocketSever = initSocketSever;
