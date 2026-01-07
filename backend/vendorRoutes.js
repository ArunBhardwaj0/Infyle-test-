const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");


const Vendor = require("./models/Vendor"); // ✅ CORRECT

router.get("/test", (req, res) => {
  res.send("Vendor route working");
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "Missing fields" });
  }

  const exist = await Vendor.findOne({ email });
  if (exist) return res.status(400).json({ msg: "User exists" });

  const hash = await bcrypt.hash(password, 10);
  await Vendor.create({ name, email, password: hash });

  res.json({ msg: "Signup success" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Vendor.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid user" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: "Invalid password" });

  const token = jwt.sign({ id: user._id }, "secret");

  res.json({ token });
});

module.exports = router;
