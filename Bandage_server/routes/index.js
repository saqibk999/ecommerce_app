const express = require("express");
const app = express();
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const orderDetailsRoutes = require("./orderDetailsRoutes");
const userRoutes = require("./userRoutes");

app.use("/auth", authRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderDetailsRoutes);
app.use("/user", userRoutes);

module.exports = app;
