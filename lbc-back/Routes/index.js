const express = require("express");
const userRoute = require("./userRoute");
const productRoute = require("./productRoute");

const router = express.Router();

// Utilisation des sous-routes
router.use("/users", userRoute);
router.use("/products", productRoute);

module.exports = router;
