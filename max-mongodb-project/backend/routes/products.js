const Router = require("express").Router;

const router = Router();
const mongodb = require("mongodb");

const db = require("../db");
// const MongoClient = mongodb.MongoClient;
// for decimal conversion
const Decimal128 = mongodb.Decimal128;
const ObjectId = mongodb.ObjectId;

// const products = [
//   {
//     _id: "fasdlk1j",
//     name: "Stylish Backpack",
//     description:
//       "A stylish backpack for the modern women or men. It easily fits all your stuff.",
//     price: 79.99,
//     image: "http://localhost:3100/images/product-backpack.jpg",
//   },
//   {
//     _id: "asdgfs1",
//     name: "Lovely Earrings",
//     description:
//       "How could a man resist these lovely earrings? Right - he couldn't.",
//     price: 129.59,
//     image: "http://localhost:3100/images/product-earrings.jpg",
//   },
//   {
//     _id: "askjll13",
//     name: "Working MacBook",
//     description:
//       "Yes, you got that right - this MacBook has the old, working keyboard. Time to get it!",
//     price: 1799,
//     image: "http://localhost:3100/images/product-macbook.jpg",
//   },
//   {
//     _id: "sfhjk1lj21",
//     name: "Red Purse",
//     description: "A red purse. What is special about? It is red!",
//     price: 159.89,
//     image: "http://localhost:3100/images/product-purse.jpg",
//   },
//   {
//     _id: "lkljlkk11",
//     name: "A T-Shirt",
//     description:
//       "Never be naked again! This T-Shirt can soon be yours. If you find that buy button.",
//     price: 39.99,
//     image: "http://localhost:3100/images/product-shirt.jpg",
//   },
//   {
//     _id: "sajlfjal11",
//     name: "Cheap Watch",
//     description: "It actually is not cheap. But a watch!",
//     price: 299.99,
//     image: "http://localhost:3100/images/product-watch.jpg",
//   },
// ];

// Get list of products products
router.get("/", (req, res, next) => {
  const products = [];
  // Mongo client for db connection
  db.getDb()
    .collection("products")
    // find returns cursor which we need to loop over
    .find()
    .forEach((productDoc) => {
      // console.log("productDoc", productDoc);
      productDoc.price = productDoc.price.toString();
      products.push(productDoc);
    })
    .then((result) => {
      console.log("result", result);
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log("insertOne err", err);
      res.status(500).json({ message: "An error occured" });
    });
});

// Get single product
router.get("/:id", (req, res, next) => {
  db.getDb()
    .collection("products")
    .findOne({ _id: new ObjectId(req.params.id) })
    .then((productDoc) => {
      productDoc.price = productDoc.price.toString();
      res.status(200).json(productDoc);
    })
    .catch((err) => {
      console.log("err", err);
      res.status(500).json({ message: "An error occurred." });
    });
  //find product in dummy data
  // const product = products.find((p) => p._id === req.params.id);
  // res.json(product);
});

// Add new product
// Requires logged in user
router.post("", (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    description: req.body.description,
    // price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    price: Decimal128.fromString(req.body.price.toString()), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  };
  console.log(newProduct);
  // Mongo client for db connection
  db.getDb()
    .collection("products")
    .insertOne(newProduct)
    .then((result) => {
      console.log("result", result);
      res
        .status(201)
        .json({ message: "Product added", productId: result.insertedId });
    })
    .catch((err) => {
      console.log("insertOne err", err);
      res.status(500).json({ message: "An error occured" });
    });
});

// Edit existing product
// Requires logged in user
router.patch("/:id", (req, res, next) => {
  const updatedProduct = {
    name: req.body.name,
    description: req.body.description,
    price: parseFloat(req.body.price), // store this as 128bit decimal in MongoDB
    image: req.body.image,
  };
  console.log(updatedProduct);
  res.status(200).json({ message: "Product updated", productId: "DUMMY" });
});

// Delete a product
// Requires logged in user
router.delete("/:id", (req, res, next) => {
  res.status(200).json({ message: "Product deleted" });
});

module.exports = router;
