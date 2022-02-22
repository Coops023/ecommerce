require("dotenv/config");
require("../db/index");

const Product = require("../models/Product.model");
const productData = require("../data/data.json");

const importProductData = async () => {
  // console.log(mongoose.connections[0].name)
  try {
    await Product.deleteMany({});
    await Product.insertMany(productData);
    console.log("Data seeded");
    process.exit();
  } catch (err) {
    console.log("Line 17 error seeder.js", err);
  }
};

importProductData();
