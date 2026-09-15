const express = require("express");
const hostRoute = express.Router();
const hostController = require("../controllers/hostController");
const upload = require("../middleware/multer");

hostRoute.post(
  "/host/add-home",
  upload.array("houseImage", 4),
  hostController.postHostAddHome
);

hostRoute.get("/host/homes", hostController.getHostHomes);

hostRoute.get("/host/home-image/:imageId", hostController.getHomeImage);

hostRoute.get("/host/edit-home/:houseId", hostController.getHostEditHome);

hostRoute.post(
  "/host/edit-home",
  upload.array("houseImage", 4),
  hostController.postHostEditHome
);

hostRoute.post("/host/delete-home/:houseId", hostController.postHostDeleteHome);

hostRoute.get("/user/homes", hostController.getUserHomes);

module.exports = hostRoute;
