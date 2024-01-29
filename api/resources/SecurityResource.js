const express = require("express");
const { register, login } = require("../controllers/SecurityController");
const router = express.Router();
const passport = require("passport");
require("../config/passport");

router.post("/register", register);
router.post("/login", login);
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      req.logout(() => {
        return res.status(200).json({ message: "Deconnecté" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
);

module.exports = router;
