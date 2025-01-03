const express = require("express");
const path = require("path");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const booksRoute = require("./routes/books/index.js");
const DTRRoute = require("./routes/DTR/index.js");
const userRoute = require("./routes/user/index.js");
const { default: mongoose } = require("mongoose");
const server = require("http").createServer(app);
const WebSocket = require("ws");
const gameHallData = path.join(__dirname, "./models/H5");
const serveIndex = require("serve-index");

const wss = new WebSocket.Server({ server: server });
wss.on("connection", function connection(ws) {
  console.log("A new Client Connnected");
  ws.send("Welcome Shithead");

  ws.on("message", function incoming(msg) {
    console.log("received: %s", msg);
    ws.send("Got your Shit!");
  });
});
app.use(cors());
app.use(bodyParser.json());
app.use("/books", booksRoute);
app.use("/DTR", DTRRoute);
app.use("/user", userRoute);
app.use(
  "/gameHallData",
  express.static(gameHallData),
  serveIndex(gameHallData, { icons: true })
);

mongoose
  .connect(
    "mongodb+srv://golimrio14:dE9xchjMWFRnBBbK@book-cluster.fbcbry2.mongodb.net/?retryWrites=true&w=majority&appName=book-cluster"
  )
  .then(() => {
    console.log("connected shit");
  })
  .catch((e) => {
    console.log(e);
  });
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
