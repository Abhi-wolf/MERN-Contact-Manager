const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config({
  path: "./config.env",
});
const errorHandler = require("./middleware/errorHandler");
const mongoose = require("mongoose");
const connectDb = require("./config/dbConnection");

connectDb();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`listening to server on port : ${port}`);
});
