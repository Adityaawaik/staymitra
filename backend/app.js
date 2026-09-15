const express = require("express");

const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

const session = require("express-session");
const MySqlStore = require("express-mysql-session")(session);
const hostRoute = require("./routes/hostRoute");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");

const sessionStore = new MySqlStore({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  port: process.env.DB_PORT,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.set("trust proxy", 1);

app.use(
  session({
    secret: process.env.SESSION_SECRECT,
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(authRoute);
app.use(userRoute);
app.use(hostRoute);

const PORT = 3000;
app.listen(PORT, console.log("server started"));
