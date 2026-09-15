const express = require("express");
const authRoute = express.Router();
const authController = require("../controllers/authController");

authRoute.post("/signIn", authController.postSignIn);

authRoute.post("/logIn", authController.postLogIn);

authRoute.get("/auth/me", authController.getCurrentUser);

authRoute.post("/logOut", authController.postLogOut);

authRoute.post("/profile/:userId", authController.postDeleteAccount);

module.exports = authRoute;
