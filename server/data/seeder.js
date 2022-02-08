require("dotenv/config");
require("../db/index");

const Product = require("../models/Product.model");
const wineData = require("../data/data.json");

const importProductData = async () => {
  // console.log(mongoose.connections[0].name)
  try {
    await Product.insertMany(wineData);
    console.log("Data seeded");
    process.exit();
  } catch (err) {
    console.log("Line 17 error", err);
  }
};

importProductData();
