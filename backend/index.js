const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");
const cors = require("cors");

const app = express();
dotenv.config();

// DB & server init
const port = process.env.PORT || 5000;
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Connected to DB");
    console.log(`Listening on port: ${port}`);
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });

// middleware
app.use("/", express.static(path.join(__dirname, "views")));
app.use(bodyParser.json());
app.use(
  cors({
    origin:
      "https://64564908338faa0cec52905a--bespoke-figolla-f52792.netlify.app",
  })
);

//routes
app.use("/api", apiRoutes);
app.use((req, res) => {
  res.status(404).send("not found 404");
});
