const express = require("express");
const {
  homepage,
  productBySousCategory,
  sousCategory,
} = require("../controllers/HomeController");

const router = express.Router();

router.get("/", homepage);
router.get("/:SousCategoryId", productBySousCategory);
router.get('/souscategory/:CategoryId' , sousCategory)

module.exports = router;
