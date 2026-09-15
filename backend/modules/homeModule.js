const db = require("../utils/database");

const Home = class {
  constructor(houseName, houseArea, houseRent, houseOwner, houseId, userId) {
    this.houseName = houseName;
    this.houseArea = houseArea;
    this.houseRent = houseRent;
    this.houseOwner = houseOwner;
    this.houseId = houseId;
    this.userId = userId;
  }

  async saveHome() {
    try {
      if (this.houseId) {
        const [result] = await db.execute(
          `
          UPDATE houses
          SET 
            houseName = ?,
            houseArea = ?,
            houseRent = ?,
            houseOwner = ?,
            userId = ?
          WHERE houseId = ? 
        `,
          [
            this.houseName,
            this.houseArea,
            this.houseRent,
            this.houseOwner,
            this.userId,
            this.houseId,
          ]
        );
        return result.insertId;
      }

      const [result] = await db.execute(
        `
      INSERT INTO houses(houseName, houseArea, houseRent, houseOwner,userId)
      VALUES(?,?,?,?,?)
      `,
        [
          this.houseName,
          this.houseArea,
          this.houseRent,
          this.houseOwner,
          this.userId,
        ]
      );
      return result.insertId;
    } catch (err) {
      console.log("err", err);
    }
  }

  static async saveImages(file, houseId) {
    try {
      const [result] = await db.execute(
        `
        INSERT INTO home_images(houseId, houseImage,houseImageType)
        VALUES(?,?,?)
        `,
        [houseId, file.buffer, file.mimetype]
      );

      return result;
    } catch (error) {
      console.log(error);
    }
  }

  static async getImageById(imageId) {
    const [result] = await db.execute(
      `
      SELECT houseImage, houseImageType
      FROM home_images
      WHERE homeId = ?
      `,
      [imageId]
    );

    return result[0];
  }

  static async allHostHomes(userId) {
    try {
      const [result] = await db.execute(
        `
        SELECT houses.houseId, houses.houseName, houses.houseArea, houses.houseRent, houses.houseOwner, houses.userId, home_images.homeId
        FROM houses
        LEFT JOIN home_images
          ON houses.houseId = home_images.houseId
        WHERE houses.userId = ?
        ORDER BY houses.houseId DESC
        `,
        [userId]
      );
      const homes = [];
      for (const row of result) {
        let home = homes.find((item) => item.houseId == row.houseId);

        if (!home) {
          home = {
            houseId: row.houseId,
            houseName: row.houseName,
            houseArea: row.houseArea,
            houseRent: row.houseRent,
            houseOwner: row.houseOwner,
            userId: row.userId,
            images: [],
          };

          homes.push(home);
        }
        if (row.homeId) {
          home.images.push({
            imageId: row.homeId,
          });
        }
      }
      return homes;
    } catch (error) {
      console.log("er", error);
    }
  }

  static async allUserHomes() {
    try {
      const [result] = await db.execute(
        `
        SELECT houses.houseId, houses.houseName, houses.houseArea, houses.houseRent, houses.houseOwner, houses.userId, home_images.homeId
        FROM houses
        LEFT JOIN home_images
          ON houses.houseId = home_images.houseId
        ORDER BY houses.houseId DESC
        `
      );
      const homes = [];
      for (const row of result) {
        let home = homes.find((item) => item.houseId == row.houseId);

        if (!home) {
          home = {
            houseId: row.houseId,
            houseName: row.houseName,
            houseArea: row.houseArea,
            houseRent: row.houseRent,
            houseOwner: row.houseOwner,
            userId: row.userId,
            images: [],
          };

          homes.push(home);
        }
        if (row.homeId) {
          home.images.push({
            imageId: row.homeId,
          });
        }
      }
      return homes;
    } catch (error) {
      console.log("er", error);
    }
  }

  static async findHomeById(detailHomeId) {
    try {
      const [result] = await db.execute(
        `
          SELECT
            houses.houseId,
            houses.houseName,
            houses.houseArea,
            houses.houseRent,
            houses.houseOwner,
            home_images.homeId
          FROM houses
          LEFT JOIN home_images
            ON houses.houseId = home_images.houseId
          WHERE houses.houseId = ?
        `,
        [detailHomeId]
      );

      const homes = [];

      for (const row of result) {
        let home = homes.find((item) => item.houseId == row.houseId);

        if (!home) {
          home = {
            houseId: row.houseId,
            houseName: row.houseName,
            houseArea: row.houseArea,
            houseRent: row.houseRent,
            houseOwner: row.houseOwner,
            images: [],
          };

          homes.push(home);
        }

        if (row.homeId) {
          home.images.push({
            imageId: row.homeId,
          });
        }
      }

      return homes;
    } catch (error) {
      console.log("er", error);
    }
  }

  static async deleteImages(houseId) {
    await db.execute(
      `
      DELETE FROM home_images
      WHERE houseId = ?
      `,
      [houseId]
    );
  }

  static async deleteHome(houseId) {
    try {
      await db.execute(
        `
        DELETE FROM home_images 
        WHERE houseId = ?
        `,
        [houseId]
      );

      const [result] = await db.execute(
        `
        DELETE FROM houses 
        WHERE houseId = ?
        `,
        [houseId]
      );
      return result;
    } catch (error) {
      console.log("er", error);
    }
  }
};

module.exports = Home;
