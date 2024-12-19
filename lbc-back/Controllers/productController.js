const Product = require("../Models/productModel");
const jwt = require('jsonwebtoken');
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const CreateProduct = async (req, res) => {
    try {
      if (!req.body.name || !req.body.category || !req.body.description || !req.body.price) {
        return res.status(400).send("Merci de remplir les champs du produit");
      }
  
      const token = req.headers.authorization.split(" ")[1];  
      const decoded = jwt.verify(token, process.env.JWT_SECRET); 
      const userId = decoded.id;  
  
      const product = new Product({
        name: req.body.name,
        category: req.body.category,
        description: req.body.description,
        price: req.body.price,
        user: userId,
      });
      await product.save();
  
      res.status(201).send(product);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
  
const updateProduct = async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).select("-password");
      if (!product) {
        return res.status(404).send({ error: "Produit introuvable" });
      }
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
  const deleteProduct = async (req, res) => {
    try {
      const { id } = req.body; 
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).send({ error: "Produit introuvable" });
      }
      res.status(200).send({ message: "Produit supprimé" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
};
  
const getProducts = async (req, res) => {
    try {
      const filter = {};
  
      if (req.query.name) {
        filter.name = { $regex: req.query.name, $options: "i" };
      }

      const products = await Product.find(filter)
        .populate('user', 'name')
        .exec();
  
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  const getProductById = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('user', 'name');
      if (!product) {
        return res.status(404).send({ message: "Produit non trouvé" });
      }
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };
  
module.exports = { CreateProduct, updateProduct, deleteProduct, getProducts, getProductById };