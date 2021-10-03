require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const serveStatic = require("serve-static");
const cors = require("cors");
const mongoose = require("mongoose");
const users = require("./routes/api/users");
const games = require("./routes/api/games");
const teams = require("./routes/api/teams");
const rounds = require("./routes/api/rounds");

const isDev = process.env.NODE_ENV !== "production";
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.on("connected", () => console.log("Connected to database!"));

app.use(express.json());
app.use(cors());

app.use("/api/users", users);
app.use("/api/games", games);
app.use("/api/teams", teams);
app.use("/api/rounds", rounds);

if (!isDev) {
  app.use(serveStatic(path.join(__dirname, "public")));
  app.get("*", (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
