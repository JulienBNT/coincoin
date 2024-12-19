const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(cors({ origin: "*" }));
const PORT = 8080;

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/lbc", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const routes = require("./Routes/index");
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
