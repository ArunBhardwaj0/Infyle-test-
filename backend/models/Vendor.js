const mongoose = require("mongoose");

const vendorSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true },
    password: String,
    googleId: String,
    role: { type: String, default: "vendor" },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Vendor ||
  mongoose.model("Vendor", vendorSchema);
