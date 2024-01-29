const { Product, Category, Commande } = require("../models");
const { Op } = require("sequelize");

Product.hasOne(Commande);
Commande.belongsTo(Product);

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.status(200).json({ message: "All products", products });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const singleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });

    return res.status(200).json({ message: "Single Product", product });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const addCommande = async (req, res) => {
  try {
    const { taille, quantite, addresse_livraison, date_livraison } = req.body;

    let newCommande = Commande.build({
      taille,
      quantite,
      UserId: req.user.id,
      ProductId: req.params.id,
      addresse_livraison,
      date_livraison,
      statut: "En cours",
    });
    await newCommande.save();

    let product = await Product.findOne({ where: { id: req.params.id } });

    let stock = product.stock - newCommande.quantite;

    product = {
      name: product.name,
      desc: product.desc,
      price: product.price,
      image_1: product.image_1,
      image_2: product.image_2,
      image_3: product.image_3,
      color: product.color,
      stock: stock,
      size: product.size,
      brand: product.brand,
    };

    await Product.update(product, { where: { id: req.params.id } });

    return res.status(200).json({ message: "Created", newCommande });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const search = async (req, res) => {
  try {
    const { search } = req.query;

    const products = await Product.findAll({
      where: { name: { [Op.like]: `%${search}%` } },
    });

    return res.status(200).json({ message: "Result search", products });
  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

module.exports = { getAllProduct, singleProduct, addCommande, search };
