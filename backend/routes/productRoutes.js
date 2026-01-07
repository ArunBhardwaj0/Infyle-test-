const router = require("express").Router();
const Product = require("../models/Product");
const auth = require("../middleware/auth");

// ✅ ADD PRODUCT
router.post("/", auth, async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      image: req.body.image,
      vendor: req.user.id,
      status: "Pending",
    });

    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Product submission failed" });
  }
});

// ✅ GET VENDOR PRODUCTS
router.get("/vendor", auth, async (req, res) => {
  try {
    const products = await Product.find({
      vendor: req.user.id,
    });
    res.json(products);
  } catch {
    res.status(500).json({ msg: "Failed to fetch products" });
  }
});

module.exports = router;
