const db = require("../utils/database");

const FavHome = class {
  constructor(favHouseId, userId) {
    this.favHouseId = favHouseId;
    this.userId = userId;
  }

  addFavHome() {
    return db.execute(
      `
      INSERT IGNORE INTO fav_homes(favHomeId,userId)
      VALUEs(?,?)
      `,
      [this.favHouseId, this.userId]
    );
  }

  static async fetchFavHomes(userId) {
    try {
      const [result] = await db.execute(
        `
        SELECT 
          houses.houseId,
          houses.houseName,
          houses.houseArea,
          houses.houseRent,
          houses.houseOwner,
          home_images.homeId,
          fav_homes.favHomeId
        FROM fav_homes
        JOIN houses 
          ON fav_homes.favHomeId = houses.houseId
        LEFT JOIN home_images
          ON houses.houseId = home_images.houseId
        WHERE fav_homes.userId = ? 
        ORDER BY houses.houseId DESC;
        `,
        [userId]
      );
      const favHomes = [];
      for (const row of result) {
        let home = favHomes.find((item) => item.houseId == row.houseId);

        if (!home) {
          home = {
            houseId: row.houseId,
            houseName: row.houseName,
            houseArea: row.houseArea,
            houseRent: row.houseRent,
            houseOwner: row.houseOwner,
            images: [],
          };

          favHomes.push(home);
        }

        if (row.homeId) {
          home.images.push({
            imageId: row.homeId,
          });
        }
      }

      return favHomes;
    } catch (error) {
      console.log("err", error);
    }
  }

  static async deleteUserFavHome(favHomeId) {
    try {
      const [result] = await db.execute(
        `
        DELETE FROM fav_homes
        WHERE favHomeId = ?
        `,
        [favHomeId]
      );

      return result;
    } catch (error) {
      console.log("err", error);
    }
  }
};

module.exports = FavHome;
