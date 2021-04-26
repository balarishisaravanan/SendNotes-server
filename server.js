const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

//Load env
dotenv.config({ path: "./config/config.env" });

//Connect to database
connectDB();

// Load routes
const notes = require("./routes/notes");
const auth = require("./routes/auth");

const app = express();

//Body Parser
app.use(express.json());

//Cookie Parser
app.use(cookieParser());

// Load Dev logger middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//Mount routers
app.use("/api/v1/notes", notes);
app.use(errorHandler);
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 5000;
const server = app.listen(
  PORT,
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${5000}`
  )
);

//Handle Unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
});
