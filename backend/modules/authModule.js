const db = require("../utils/database");

const AuthenticateUser = class {
  constructor(firstName, lastName, email, password, userType) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.userType = userType;
  }

  async saveUser() {
    const [result] = await db.execute(
      `
      INSERT INTO users(firstName,lastName,email,password,userType)
      VALUES(?,?,?,?,?)
      `,
      [this.firstName, this.lastName, this.email, this.password, this.userType]
    );

    return result;
  }

  static async findUserByEmail(email) {
    const [result] = await db.execute(
      `
      SELECT * FROM users 
      WHERE email = ?
      `,
      [email]
    );

    return result[0];
  }

  static async deleteUserById(userId) {
    await db.execute(
      `
      DELETE FROM users 
      WHERE userId = ?
      `,
      [userId]
    );
  }
};

module.exports = AuthenticateUser;
