const express = require("express");
const { check } = require("express-validator/check");

const router = express.Router();

const authController = require("../controllers/auth");

router.get("/login", authController.getLogin);

router.post("/login", authController.postLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please entere a valid email.")
      .custom((value, { req }) => {
        if (value === "test@test.com") {
          throw new Error("This email address is forbidden.");
        }
        return true;
      }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 character."
    )
      .isLength({ min: 5 })
      .isAlphanumeric()
  ],

  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

module.exports = router;
