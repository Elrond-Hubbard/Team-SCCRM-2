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
  secret: "SCCRMsecret",
  cookie: {
    maxAge: 86400,
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
  console.log(`User ${socket.id} connected to socket.`);
  socketsConnected.add(socket.id);

  // event is emitted from server to all connected clients
  io.emit('login', socketsConnected.size)

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected.`);
    socketsConnected.delete(socket.id);
    io.emit('logout', socketsConnected.size)
  });
  
  // When vitals are recieved, they are broadcast to other clients
  socket.on('vitals', (data) => {
    socket.broadcast.emit('vitals', data)
  })
}
//////////////////////////////////////////////////////////////////////////////


// TEXT NOTIFICATIONS //
const vonage = new Vonage({
  apiKey: process.env.apiKEY,
  apiSecret: process.env.apiSECRET,
});

const from = "13525040359";
const to = process.env.PHONE_NUMBER;
const text = "Hello from Vonage SMS API";

async function sendSMS() {
    await vonage.message.send({to, from, text})
    .then((res) => { console.log('message sent sucessfully'); console.log(res)}) 
    .catch((err) => { console.log('message failed'); console.log(err)});
  }


  function sendAlert() {
    const SCCRMALERT = from;

    fetch('https://rest.nexmo.com/sms/json', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Basic ' + Buffer.from('f7192272:gND758JNRn6JFNJo').toString('base64')
        },
        body: JSON.stringify({
            "from": SCCRMALERT,
            "to": process.env.PHONE_NUMBER,
            "text": "Patient's vitals are critical. Please check on them!" 
        })
    }).then(res => {
        console.log(res);
    })
}

sendAlert();
