'use strict';

const express = require('express');
const app = express();
require("dotenv").config();

//config body-parser to post data
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(cors())
app.use(bodyParser.urlencoded({ limit: '50mb', extended:true }))
app.use(bodyParser.json({ limit: '50mb' }))
app.use(cors())

// Connect to MongoDB
const mongoose = require('mongoose');
const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true })
const connection = mongoose.connection
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")
})

const dbRouter = require('./src/routes/db');
app.use('/api', dbRouter);

const path = require('path')
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname,  "build", "index.html"));
    });
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Charlie is running on port ${PORT}`);
})