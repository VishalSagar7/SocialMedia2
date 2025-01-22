import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
    },
});


const userSocketMap = {};


export const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;

    if (!userId) {
        console.error("Connection rejected: userId is missing.");
        return socket.disconnect();
    }

 
    userSocketMap[userId] = socket.id;
    // console.log(`User connected: ${userId} (Socket ID: ${socket.id})`);

    // Emit the list of online users
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    
    socket.on("disconnect", () => {
        // console.log(`User disconnected: ${userId} (Socket ID: ${socket.id})`);

        if (userId) {
            delete userSocketMap[userId];
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });

    
    socket.on("error", (err) => {
        console.error("Socket error:", err.message);
    });
});

export { app, server, io };
