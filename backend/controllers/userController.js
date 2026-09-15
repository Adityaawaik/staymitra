const FavHome = require("../modules/favHomeModule");
const Home = require("../modules/homeModule");

exports.getUserFavHomes = async (req, res, next) => {
  try {
    const userId = req.session.user.userId;
    const allFavHomes = await FavHome.fetchFavHomes(userId);

    res.status(200).json(allFavHomes);
  } catch (error) {
    console.log("err", error);
  }
};

exports.postUserFavHomes = async (req, res, next) => {
  try {
    const { houseId } = req.body;
    const userId = req.session.user.userId;
    const newFavHome = new FavHome(houseId, userId);
    await newFavHome.addFavHome();

    res.status(200).json(houseId);
  } catch (error) {
    console.log("err", error);
  }
};

exports.postRemoveFavHome = async (req, res, next) => {
  try {
    const houseId = Number(req.params.houseId);
    await FavHome.deleteUserFavHome(houseId);

    res.status(200).json(houseId);
  } catch (error) {
    console.log("err", error);
  }
};

exports.getHomeDetail = async (req, res, next) => {
  try {
    const houseId = Number(req.params.houseId);
    const homeDetail = await Home.findHomeById(houseId);

    res.status(200).json(homeDetail);
  } catch (error) {
    console.log("err", error);
  }
};
