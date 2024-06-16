const express = require("express");

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const booksRoute = require("./routes/books/index.js");
const { default: mongoose } = require("mongoose");
app.use(cors());
app.use(bodyParser.json());
app.use("/books", booksRoute);

mongoose.connect('mongodb+srv://golimrio14:dE9xchjMWFRnBBbK@book-cluster.fbcbry2.mongodb.net/?retryWrites=true&w=majority&appName=book-cluster').then(()=>{
    console.log('connected shit')
}).catch(e=>{
    console.log(e)
})
app.listen(4000);
