const express = require("express");
const userRoute = express.Router();
const userController = require("../controllers/userController");

module.exports = userRoute;

userRoute.get("/user/fav-homes", userController.getUserFavHomes);

userRoute.post("/user/fav-homes", userController.postUserFavHomes);

userRoute.post(
  "/user/fav-home/delete/:houseId",
  userController.postRemoveFavHome
);

userRoute.get("/user/home-detail/:houseId", userController.getHomeDetail);
