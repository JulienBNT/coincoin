const express = require("express");

const {
  CreateProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById
} = require("../Controllers/productController");
const authMiddleware = require("../Middlewares/authMiddleware");
const router = express.Router();

router.post("/create", authMiddleware, CreateProduct);
router.put("/update/:id", authMiddleware, updateProduct);
router.delete("/delete", authMiddleware, deleteProduct);
router.get("/all", getProducts);
router.get("/:id", getProductById);

module.exports = router;