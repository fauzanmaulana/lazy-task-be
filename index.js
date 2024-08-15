require("dotenv").config();

const routeApi = require("./routes/api.js");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")
const express = require("express");

const app = express();
const port = process.env.APP_PORT || 1338;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/storage', express.static(path.join(__dirname, '/storage')));
app.use(cors());

// Routes
app.use("/api", routeApi);

app.listen(port, () => console.log(`Backend started on port ${port}`));

module.exports = app;
