
// import { Server as SocketIOServer } from "socket.io";

// const setupSocket = (server) => {
//   const io = new SocketIOServer(server, {
//     cors: {
//       origin: process.env.ORIGIN,
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });
//   const userSocketMap = new Map();
  
//   const disconnect=(socket)=>{
//     console.log(`Client Disconnected: ${socket.id}`);
//     for(const [userId,socketId] of userSocketMap.entries()){
//         if(socketId===socket.id){
//             userSocketMap.delete(userId);
//             break;
//         }
//     }
//   }
//   io.on("connection", (socket) => {
//     const userId = socket.handshake.query.userId;
//     if (userId) {
//       userSocketMap.set(userId, socket.id);
//       console.log(`user connected:${userId} with socket ID : ${socket.id}`);
//     } else {
//       console.log("User ID not provided during connection.");
//     }

//     socket.on("disconnect",()=>disconnect(socket));
//   });
// };
// export default setupSocket;
import { Server as HttpServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
// import Message from './models/MessagesModels.js';


const setupSocket = (server) => {
  const io = new SocketIOServer(server, {
    cors: {
      origin: process.env.ORIGIN,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });
//  const sendMessage=async()=>{
//   const senderSocketId=userSocketMap.get(message.sender);
//   const recipientSocketId=userSocketMap.get(message.reciepient);

//   const createdMessage= await Message.create(message);

//   const messageData=await Message.findById(createdMessage._id)
//   .populate("sender","id email firstNmae lastName image color")
//   .populate("recipient","id email firstName lastName image color");

//   if(recipientSocketId){
//     io.to(recipientSocketId).emit("recieveMessage",messageData);
//   }
//   if(senderSocketId){
//     io.to(recipientSocketId).emit("recieveMessage",messageData);
//   }

//  }
  const userSocketMap = new Map();

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSocketMap.set(userId, socket.id);
      console.log(`User connected: ${userId} with socket ID: ${socket.id}`);
    } else {
      console.log('User ID not provided during connection.');
    }


    // socket.on("sendMessage",sendMessage)
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
      for (const [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          break;
        }
      }
    });
  });
};

export default setupSocket;