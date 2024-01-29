const { Category, Product, Commande, User , SousCategory } = require("../models");
const path = require("path");
const { dateDeCommande } = require("../libs/dateCommande");

User.hasOne(Commande);
Commande.belongsTo(User);

Category.hasMany(SousCategory)
SousCategory.belongsTo(Category)

SousCategory.hasMany(Product)
Product.belongsTo(SousCategory)


const adminHome = async (req, res) => {
  try {
    const categories = await Category.findAll({include : SousCategory});
    const products = await Product.findAll({include :  SousCategory});
    const sousCategory = await SousCategory.findAll({include : Category})
    console.log(products)


    return res.status(200).json({ message: "Homepage", products, categories , sousCategory});

  } catch (error) {
    console.log(error)
    return res.status(500).json(error);
  }
};

const addCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({ name });
    return res.status(200).json({ message: "Ajout Categorie avec succès", category });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.findAll();

    return res.status(200).json({ categories });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const getOneCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id } });

    return res.status(200).json({ message: "One Category", category });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const removeCategory = async (req, res) => {

  try {
    await Category.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ message: "Categorie effacé avec succès" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateCategory = async (req, res) => {
  try {
    await Category.update(
      { name: req.body.name },
      {
        where: { id: req.params.id },
      }
    );
    return res.status(200).json({ message: "Categorie modifié" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const addSousCategory = async(req , res)  => {
  try {
      const {CategoryId , name} = req.body

      const newSousCategory = SousCategory.build({
        name,
        CategoryId
      })

      await newSousCategory.save()

      return res.status(200).json({message : 'Ajout sous categorie avec succès'  , newSousCategory})
    
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

const addProduct = async (req, res) => {
  const { SousCategoryId, name, price, desc, color, stock, size } = req.body;

  let files = req.files.files;

  let data = {
    name,
    price,
    desc,
    SousCategoryId,
    color,
    stock,
    size,
    image_1: "",
    image_2: "",
    image_3: "",
  };

  try {
    if (files.length > 3) {
      files = files.filter((value, index) => {
        if (index <= 2) {
          return value;
        }
      });
    }

    files.filter((value, index) => {
      let ext = path.extname(value.name);
      let newImageName = `PRODUCT-${Date.now()}-${index + 1}${ext}`;
      data[`image_${index + 1}`] = newImageName;

      value.mv(`public/product/${newImageName}`, (error) => {
        if (error) console.log(error);
      });
    });
    
    const product = Product.build(data);

    await product.save();

    return res.status(200).json({ message: "Created", product });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateProduct = async (req, res) => {
  try {
    const {SousCategoryId, name, price, desc, color, stock, size } =
      req.body;

    let files = [];

    if (req.files && req.files.files) {
      files = req.files.files;
    }

    if (files) {
      let data = {
        name,
        price,
        desc,
        color,
        size,
        stock,
        SousCategoryId,
        image_1: "",
        image_2: "",
        image_3: "",
      };

      if (files.length > 3) {
        files = files.filter((value, index) => {
          if (index <= 2) {
            return value;
          }
        });
      }

      files.filter((value, index) => {
        let ext = path.extname(value.name);
        let newImageName = `PRODUCT-${Date.now()}-${index + 1}${ext}`;
        data[`image_${index + 1}`] = newImageName;

        value.mv(`public/product/${newImageName}`, (error) => {
          if (error) console.log(error);
        });
      });

      await Product.update(data, {
        where: { id: req.params.id,   SousCategoryId: req.params.SousCategoryId },
      });

      return res.status(200).json({ message: "Updated", data });
    } else {
      let data = {
        name,
        price,
        desc,
        SousCategoryId,
        color,
        size,
        stock,
      };

      await Product.update(data, {
        where: { id: req.params.id,   SousCategoryId: req.params.SousCategoryId },
      });

      return res.status(200).json({ message: "Updated", data });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const removeProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });

    return res.status(200).json({ message: "Product effacé avec succès" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getOneProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });

    return res.status(200).json({ message: "One Product", product });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getProductByCategory = async (req, res) => {
  const SousCategoryId = req.params.SousCategoryId;

  try {
    const products = await Product.findAll({
      where: { SousCategoryId },
    });
    const souscategory = await SousCategory.findOne({ where: { id:SousCategoryId } , include : Category });

    return res
      .status(200)
      .json({ message: "Product by Sous Category", products, souscategory });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const commande = async (req, res) => {
  try {
    const commande = await Commande.findAll({ include: [Product, User] });
    const date = new Date();

    for (item of commande) {
      if (item.date_livraison === date) {
        item = {
          ProductId: item.ProductId,
          UserId: item.UserId,
          quantité: item.quantité,
          addresse_livraison: item.addresse_livraison,
          date_livraison: item.date_livraison,
          statut: "Livré",
        };
      }
      await Commande.update(item, {
        where: { statut: "En cours" },
        include: [Product, User],
      });
    }

    const notif = await Commande.findAll({ include: User });

    return res.status(200).json({ message: "Liste commande", commande, notif });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const clients = async(req, res) => {
    try {

      const clients =  await User.findAll({where : {type : 'Client'}})
      return res.status(200).json({message : 'Clients' , clients})
      
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
}
module.exports = {
  adminHome,
  addCategory,
  getAllCategory,
  getOneCategory,
  removeCategory,
  updateCategory,
  addSousCategory,
  addProduct,
  removeProduct,
  updateProduct,
  getOneProduct,
  getProductByCategory,
  commande,
  clients
};
