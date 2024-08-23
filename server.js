const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const colors = require("colors");
const dotenv = require("dotenv");
const connectDB = require("./config/DB");

//env config
dotenv.config();

//router import
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//mongoDb connection
connectDB();

//rest object
const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//routes

// app.get("/", (req, res) => {
//   res.status(200).send({
//     message: "Node server",
//   });
// });

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

//Port
const PORT = process.env.PORT || 8080;

//listen
app.listen(PORT, () => {
  console.log(
    `Server running on ${process.env.DEV_MODE} port ${PORT}`.bgCyan.white
  );
});
