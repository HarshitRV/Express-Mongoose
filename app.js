const express = require("express");
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const path = require("path");
const { findById, findByIdAndDelete } = require("./models/product");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const Product = require("./models/product");

const categories = ['fruit', 'vegetable', 'dairy'];

mongoose
  .connect("mongodb://localhost:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connection established");
  })
  .catch((err) => {
    console.log(err);
  });

app.route("/").get((req, res) => {
  res.render("home");
});

app.route("/products").get(async (req, res) => {
  console.log(req.query);
  const products = await Product.find(req.query);
  res.render("product/index", { products });
});

app
  .route("/products/new")
  .get((req, res) => {
    res.render("product/new");
  })
  .post(async (req, res) => {
    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    console.log(savedProduct);
    res.redirect("/products");
  });

app.route("/products/:id")
    .get(async (req, res) => {
        const product = await Product.findById(req.params.id);
        res.render("product/details", { product });
    })
    .put(async (req, res)=>{
        const updatedData = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        console.log(`Updated Object: ${updatedData}`);
        res.redirect(`/products/${req.params.id}`)
    })
    .delete(async (req, res)=>{
        const data = await Product.findByIdAndDelete(req.params.id);
        console.log(`Delted object: ${data}`);
        res.redirect('/products');
    });

app.route("/products/:id/edit")
    .get(async (req, res) => {
        const product = await Product.findById(req.params.id);
        res.render('product/edit', { product, categories });
    })
    .post(async (req, res)=>{
        console.log(req.params);
        await Product.findByIdAndUpdate(req.params.id, )
        res.redirect('/products');
    })

app.listen(3000, () => {
  console.log("Serving on port 3000");
});
