const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
// mongoclient
// const mongodb = require("mongodb").MongoClient;
const productRoutes = require("./routes/products");
const authRoutes = require("./routes/auth");

const app = express();

app.use(bodyParser.json());
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/products", productRoutes);
app.use("/", authRoutes);
// connect to devConnector cluster with shop db
// mongodb
//   .connect(
//     "mongodb+srv://webdev-mongodb:webdev-mongodb@devconnector.ahxye.mongodb.net/shop?retryWrites=true"
//   )
//   .then((client) => {
//     console.log("Connected");
//     client.close();
//   })
//   .catch((err) => {
//     console.log("err", err);
//   });
app.listen(3100);
