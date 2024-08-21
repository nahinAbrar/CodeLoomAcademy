import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSocketSever = (server: http.Server) => {
  const io = new SocketIOServer(server);

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
