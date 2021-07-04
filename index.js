require("dotenv").config();

//Micro services Routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Publication");

//importing express framework
const express = require("express");

//importing mongoose framework
const mongoose = require("mongoose");

//intialization
const booky = express();

//configuration
booky.use(express.json());

//established database connection
mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    }
).then(() => console.log("Connection established"));

//Intializing Micro Services
booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publications);

booky.listen(3000, () => console.log("Hey, server is running!👏"));

