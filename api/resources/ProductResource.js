const express = require("express");
const {
  getAllProduct,
  singleProduct,
  search,
  addCommande,
} = require("../controllers/ProductController");
const router = express.Router();
const passport = require("passport");
require("../config/passport");

router.get("/allProduct", getAllProduct);
router.get("/singleProduct/:id", singleProduct);
router.post(
  "/addCommande/:id",
  passport.authenticate("jwt", { session: false }),
  addCommande
);
router.get("/search", search);
module.exports = router;
