'use strict';

const express = require('express');
const app = express();
require("dotenv").config();
const http = require('http');
const { Server } = require("socket.io");

//config body-parser to post data
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended:true }))
app.use(bodyParser.json({ limit: '50mb' }))


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    },
});

// Connect to MongoDB
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const WATCHA_API_KEY = process.env.WATCHA_API_KEY;
const userRouter = require('./src/routes/users');
app.use(`/api/users/${WATCHA_API_KEY}`, userRouter);

const watchaRouter = require('./src/routes/watchas');
app.use(`/api/watchas/${WATCHA_API_KEY}`, watchaRouter);

const path = require('path')
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "build", "index.html"));
    });
}

const PORT = process.env.PORT || 4000;

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('new_watcha', (msg) => {
        console.log('watcha: ' + msg);
      });
    socket.on('new_chatmsg', (users, user) => {
        socket.broadcast.emit("recieved_new_chatmsg")
      });
  });

server.listen(PORT, () => {
    console.log(`Charlie is running on port ${PORT}`);
})
