const path = require("path");
const express = require("express");
const session = require("express-session");

const routes = require("./controllers");
const sequelize = require("./config/connection");

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
}
//////////////////////////////////////////////////////////////////////////////