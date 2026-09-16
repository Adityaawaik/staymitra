const Home = require("../modules/homeModule");

exports.postHostAddHome = async (req, res, next) => {
  try {
    const { houseName, houseArea, houseRent, houseOwner } = req.body;

    const userId = req.session.user.userId;

    const newHome = new Home(
      houseName,
      houseArea,
      houseRent,
      houseOwner,
      null,
      userId
    );

    const houseId = await newHome.saveHome();

    const houseImages = req.files || [];

    await Promise.all(
      houseImages.map((image) => Home.saveImages(image, houseId))
    );

    res.status(201).json({
      message: "House added successfully",
      houseId,
    });
  } catch (error) {
    console.log("err", error);
  }
};

exports.getHostHomes = async (req, res, next) => {
  try {
    const userId = req.session.user.userId;
    const home = await Home.allHostHomes(userId);

    res.status(200).json(home);
  } catch (error) {}
};

exports.getHomeImage = async (req, res, next) => {
  try {
    const imageId = req.params.imageId;

    const image = await Home.getImageById(imageId);

    if (!image) {
      return res.status(404).send("Image not found");
    }

    res.set("Content-Type", image.houseImageType);
    res.send(image.houseImage);
  } catch (error) {
    console.log(error);
    res.status(500).send("Unable to load image");
  }
};

exports.getHostEditHome = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    const [editHouse] = await Home.findHomeById(houseId);
    return res.status(200).json(editHouse);
  } catch (error) {
    console.log("err", error);
  }
};

exports.postHostEditHome = async (req, res, next) => {
  try {
    const userId = req.session.user.userId;
    const { houseName, houseArea, houseRent, houseOwner, houseId } = req.body;

    const newHome = new Home(
      houseName,
      houseArea,
      houseRent,
      houseOwner,
      houseId,
      userId
    );

    await newHome.saveHome();

    if (req.files && req.files.length > 0) {
      await Home.deleteImages(houseId);

      await Promise.all(
        req.files.map((image) => Home.saveImages(image, houseId))
      );
    }

    res.status(201).json({
      message: "House added successfully",
      houseId,
    });
  } catch (error) {
    console.log("err", error);
  }
};

exports.postHostDeleteHome = async (req, res, next) => {
  try {
    const { houseId } = req.params;
    await Home.deleteHome(houseId);

    res.status(200).json(houseId);
  } catch (error) {
    console.log("err", error);
  }
};

exports.getUserHomes = async (req, res, next) => {
  try {
    const userHomes = await Home.allUserHomes();

    res.status(200).json(userHomes);
  } catch (error) {
    console.log("err", error);
  }
};
