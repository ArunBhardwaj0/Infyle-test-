const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  const product = await Product.create({
    ...req.body,
    vendorId: req.vendor.id
  });
  res.json(product);
};

exports.vendorProducts = async (req, res) => {
  const products = await Product.find({ vendorId: req.params.vendorId });
  res.json(products);
};

exports.pendingProducts = async (req, res) => {
  const products = await Product.find({ status: "pending" });
  res.json(products);
};

exports.approveProduct = async (req, res) => {
  const product = await Product.findById(req.params.productId);
  product.status = "approved";
  await product.save();
  res.json(product);
};
