const { Category, Product , SousCategory } = require("../models");

const homepage = async (req, res) => {
  try {
    const categories = await Category.findAll({include : SousCategory});
    const products = await Product.findAll();
    const souscategory =  await SousCategory.findAll({include : Category})

    return res.status(200).json({ message: "Homepage", products, categories , souscategory});
  } catch (error) {
    return res.status(500).json(error);
  }
};

const productBySousCategory = async(req,res)=> {
  try {

    const products =  await Product.findAll({where : {SousCategoryId : req.params.SousCategoryId}})

    return res.status(200).json({message : 'Product by Sous Category' , products})
    
  } catch (error) {
    console.log(error)

    return res.status(500).json(error)
  }
}

const sousCategory = async(req, res) => {

  try {
    const sousCategories = await SousCategory.findAll({where : {CategoryId : req.params.CategoryId}})

    return res.status(200).json({message : 'Sous Category' , sousCategories})
  } catch (error) {
    console.log(error)

    return res.status(500).json(error)
  }
}

module.exports = { homepage, productBySousCategory , sousCategory};
