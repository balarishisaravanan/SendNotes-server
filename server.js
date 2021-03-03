const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

//Load env
dotenv.config({ path: "./config/config.env" });
// Load routes
const notes = require("./routes/notes");

const app = express();
// Load Dev logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Mount routers
app.use("/api/v1/notes", notes);

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${5000}`
  )
);
