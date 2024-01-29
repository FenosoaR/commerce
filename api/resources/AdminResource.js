const express = require("express");
const {
  addCategory,
  getAllCategory,
  getOneCategory,
  removeCategory,
  updateCategory,
  addProduct,
  getProductByCategory,
  adminHome,
  removeProduct,
  getOneProduct,
  updateProduct,
  commande,
  clients,
  addSousCategory,
} = require("../controllers/AdminController");

const router = express.Router();

router.get("/", adminHome);
router.post("/addCategory", addCategory);
router.get("/allCategory", getAllCategory);
router.get("/oneCategory/:id", getOneCategory);
router.delete("/removeCategory/:id", removeCategory);
router.patch("/updateCategory/:id", updateCategory);

router.post('/addSousCategory' , addSousCategory)

router.post("/addProduct", addProduct);
router.delete("/removeProduct/:id", removeProduct);
router.get("/oneProduct/:id", getOneProduct);
router.patch("/updateProduct/:SousCategoryId/:id", updateProduct);
router.get("/productByCategory/:SousCategoryId", getProductByCategory);
router.get("/commande", commande);
router.get("/clients" , clients)

module.exports = router;
