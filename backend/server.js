require("dotenv").config();
require("./config/passport");

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// 🔥 ROUTE REGISTER
app.use("/api/vendor", require("./vendorRoutes.js"));
app.use("/api/vendor", require("./routes/vendorAuthRoutes"));
app.use("/api/product", require("./routes/productRoutes"));


// TEST ROOT
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
