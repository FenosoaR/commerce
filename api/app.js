//yarn add express body-parser cors passport passport-jwt bcryptjs jsonwebtoken sequelize mysql2
// yarn add --dev sequelize-cli nodemon

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./models");
const fileUpload = require("express-fileupload");
const passport = require("passport");

const AdminResource = require("./resources/AdminResource");
const ProductResource = require("./resources/ProductResource");
const HomeResource = require("./resources/HomeResource");
const SecurityResource = require("./resources/SecurityResource");
const { User } = require("./models");

const app = express();
const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET, POST,PATCH,DELETE"],
    credentials: true,
  },
});
app.use(fileUpload());
app.use(cors()); //maka sy mandefa requete am domaine hafa(gerer nom de domaine ahafahana mapiasa anilay api)

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ extended: false }));

app.use("/api/home", HomeResource);
app.use("/api/admin", AdminResource);
app.use("/api/product", ProductResource);
app.use("/api/auth", SecurityResource);

io.on("connection", (socket) => {
  console.log("Un user est connecté");

  socket.on("room", (roomName) => {
    socket.join(roomName);
    console.log(socket.rooms);
  });

  socket.on("new_commande", async (tabPanier) => {
    for (let index = 0; index < tabPanier.length; index++) {
      const admin = await User.findOne({ where: { type: "Admin" } });
      const client = await User.findOne({
        where: { id: tabPanier[index].UserId },
      });

      let adminId = admin.id.toString();

      socket.to(adminId).emit("new_commande", client);
    }

    // const admin =  await User.findOne({where : {type : 'Admin'}})
    // const client =  await User.findOne({where : {id : data.UserId}})

    // let adminId = admin.id.toString()

    // socket.to(adminId).emit('new_commande' , client)
  });
});

db.sequelize.sync({ force: false }).then(() => {
  server.listen(9000, () => {
    console.log("http://localhost:9000");
  });
});
