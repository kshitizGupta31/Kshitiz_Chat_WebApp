// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import mongoose from "mongoose";
// import cookieParser from "cookie-parser";
// import authRoutes from "../Server/routes/AuthRoutes.js";

// import contactRoutes from "./routes/ContactsRoutes.js";
// import setupSocket from "./socket.js";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3002;
// const databaseURL = process.env.DATABASE_URL;

// app.use(
//  cors({
//     origin: [process.env.ORIGIN],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//     credential: true,
//   })
// );

// app.use("/uploads/profiles",express.static("uploads/profiles"))
// app.use(cookieParser());
// app.use(express.json());
// app.use("/api/auth",authRoutes);
// app.use("/api/contacts",contactRoutes)

// const server = app.listen(port, () => {
//   console.log(`server is running at  http://localhost:${port}`);
// });

// setupSocket(server)
// mongoose
//   .connect(databaseURL)
//   .then(() => {
//     console.log("Database connection successful");
//   })
//   .catch((error) => {
//     console.error("Database connection error:", error);
//   });

// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import { createServer } from 'http';
// import authRoutes from './routes/AuthRoutes.js';
// import contactRoutes from './routes/ContactsRoutes.js';
// import setupSocket from './socket.js';

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3002;
// const databaseURL = process.env.DATABASE_URL;

// app.use(cors({
//   origin: process.env.ORIGIN,
//   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
//   credentials: true,
// }));

// app.use('/uploads/profiles', express.static('uploads/profiles'));
// app.use(cookieParser());
// app.use(express.json());
// app.use('/api/auth', authRoutes);
// app.use('/api/contacts', contactRoutes);

// const server = createServer(app);
// setupSocket(server);

// server.listen(port, () => {
//   console.log(`Server is running at http://localhost:${port}`);
// });

// mongoose.connect(databaseURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('Database connection successful');
// }).catch((error) => {
//   console.error('Database connection error:', error);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/AuthRoutes.js";
import contactRoutes from "./routes/ContactsRoutes.js";
import setupSocket from "./socket.js";
import messagesRoutes from "./routes/MessagesRoutes.js";

import channelRoutes from "./routes/ChannelRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3002;
const databaseURL = process.env.DATABASE_URL;

app.use(
  cors({
    origin: process.env.ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/messages", messagesRoutes);

app.use("/api/messages", messagesRoutes);
app.use("/api/channel",channelRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
setupSocket(server);

mongoose
  .connect(databaseURL)
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
