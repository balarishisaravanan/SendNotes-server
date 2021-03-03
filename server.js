const express = require("express");
const dotenv = require("dotenv");
const logger = require("./middleware/logger");
//load env
dotenv.config({ path: "./config/config.env" });
// load routes
const notes = require("./routes/notes");

const app = express();

//mount routers
app.use(logger);
app.use("/api/v1/notes", notes);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${5000}`
  )
);
