const Vendor = require("../models/Vendor");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const vendor = await Vendor.create({ name, email, password: hashed, phone });
  res.json(vendor);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const vendor = await Vendor.findOne({ email });
  if (!vendor) return res.status(400).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, vendor.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET);
  res.json({ token, vendor });
};
