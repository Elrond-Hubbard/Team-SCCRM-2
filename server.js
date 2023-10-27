const { Vonage } = require("@vonage/server-sdk");
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const express = require("express");
const session = require("express-session");

const routes = require("./controllers");
const sequelize = require("./config/connection");
const { send } = require("process");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge: 86400000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

const server = require("http").createServer(app);

sequelize.sync().then(() => {
  server.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});

/////////////////////////////////////////////////////////////////////////////
// WEBSOCKET //
/////////////////////////////////////////////////////////////////////////////
const io = require("socket.io")(server);
let socketsConnected = new Set();

// server listens for new connection events and executes a function
io.on("connection", onConnected);

// onConnected handles
function onConnected(socket) {
  //q: what line should the onConnected
  console.log(`User ${socket.id} connected to socket.`);
  socketsConnected.add(socket.id);

  // event is emitted from server to all connected clients
  io.emit("login", socketsConnected.size);

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected.`);
    socketsConnected.delete(socket.id);
    io.emit("logout", socketsConnected.size);
  });

  // When vitals are recieved, they are broadcast to other clients
  socket.on("BPM", (data) => {
    socket.broadcast.emit("BPM", data);
  });

  // When autoseed is triggered, broadcast event
  socket.on("autoseed", (data) => {
    console.log(data);
    socket.broadcast.emit("autoseed", data);
  });

  // HR ALERT
  socket.on("HRALERT", (data) => {
    sendTextAlert("Patient's heart rate is abnormal. Please check on them!");
  });

  // RR ALERT
  socket.on("RRALERT", (data) => {
    sendTextAlert(
      "Patient's respiratory rate is abnormal. Please check on them!"
    );
  });

  // HIGH BP ALERT
  socket.on("HIGHBPALERT", (data) => {
    sendTextAlert(
      "Patient's blood pressure is abnormally HIGH. Please check on them!"
    );
  });

  // LOW BP ALERT
  socket.on("LOWBPALERT", (data) => {
    sendTextAlert(
      "Patient's blood pressure is abnormally LOW. Please check on them!"
    );
  });

  // TEMP ALERT
  socket.on("TEMPALERT", (data) => {
    sendTextAlert(
      "Patient's body temperature is abnormal. Please check on them!"
    );
  });

  // O2 ALERT
  socket.on("O2ALERT", (data) => {
    sendTextAlert("Patient's oxygen level is abnormal. Please check on them!");
  });
}

// TEXT ALERT NOTIFICATIONS //
const vonage = new Vonage({
  apiKey: process.env.apiKEY,
  apiSecret: process.env.apiSECRET,
});

const from = "13525040359";
const to = process.env.PHONE_NUMBER;
const text = "";

function sendTextAlert(message) {
  const SCCRMALERT = from;

  fetch("https://rest.nexmo.com/sms/json", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Basic " + Buffer.from("f7192272:gND758JNRn6JFNJo").toString("base64"),
    },
    body: JSON.stringify({
      from: SCCRMALERT,
      to: process.env.PHONE_NUMBER,
      text: message,
    }),
  }).then((res) => {
    console.log(res);
  });
}
