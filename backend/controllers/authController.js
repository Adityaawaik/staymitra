const { check, validationResult } = require("express-validator");
const AuthenticateUser = require("../modules/authModule");
const bcrypt = require("bcryptjs");

exports.postSignIn = [
  check("firstName")
    .isLength({ min: 3 })
    .withMessage("First Name must be 3 character long")
    .trim()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("First Name includes only alphabets"),

  check("lastName")
    .isLength({ min: 3 })
    .withMessage("Last Name must be 3 character long")
    .trim()
    .matches(/^[A-Za-z\s]+$/)
    .withMessage("Last Name includes only alphabets"),

  check("email")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be 8 character long")
    .matches(/[A-Z]/)
    .withMessage("Password must have 1 uppercase")
    .matches(/[a-z]/)
    .withMessage("Password must have 1 lowercase")
    .matches(/[0-9]/)
    .withMessage("Password must have 1 numeric value")
    .matches(/[!@#$&]/)
    .withMessage("Password must have 1 special character [!@#$&]")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password does not match");
      }

      return true;
    }),

  check("userType").isIn(["Guest", "Host"]).withMessage("Invalid User"),

  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const signInErrMsg = errors.array().map((errMsg) => errMsg.msg);

        return res.status(400).json({
          error: signInErrMsg,
        });
      }

      const { firstName, lastName, email, password, userType } = req.body;

      const existingUser = await AuthenticateUser.findUserByEmail(email);

      if (existingUser) {
        return res.status(409).json({
          error: ["User with this email already exists"],
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 12);

      const user = new AuthenticateUser(
        firstName,
        lastName,
        email,
        encryptedPassword,
        userType
      );

      await user.saveUser();

      return res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error) {
      console.error("Registration error:", error);

      return res.status(500).json({
        error: "Internal server error",
      });
    }
  },
];

exports.postLogIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await AuthenticateUser.findUserByEmail(email);

    if (!userFound) {
      return res.status(404).json({
        error: "User does not exist",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      userFound.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        error: "Password does not match",
      });
    }

    req.session.user = {
      userId: userFound.userId,
      firstName: userFound.firstName,
      lastName: userFound.lastName,
      userType: userFound.userType,
    };

    req.session.save((error) => {
      if (error) {
        console.error("Session save error:", error);

        return res.status(500).json({
          error: "Could not create session",
        });
      }

      return res.status(200).json({
        message: "Login successful",
        user: req.session.user,
      });
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.getCurrentUser = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      user: null,
    });
  }

  return res.status(200).json({
    user: req.session.user,
  });
};

exports.postLogOut = (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Logout error:", error);

      return res.status(500).json({
        error: "Could not logout",
      });
    }

    res.clearCookie("connect.sid");

    return res.status(200).json({
      message: "Logout successful",
    });
  });
};

exports.postDeleteAccount = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    await AuthenticateUser.deleteUserById(userId);

    res.status(200).json(userId);
  } catch (error) {
    console.log("err", error);
  }
};
