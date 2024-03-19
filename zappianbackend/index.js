const express = require("express");
const path = require("path");
require("dotenv").config();
const bodyParser = require('body-parser');
const app = express();
const routes = require("./Routes/userRoutes");
const connectDB = require("./Model/db");

const cors = require('cors');

app.use(cors());

connectDB()

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use("/", routes);

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
