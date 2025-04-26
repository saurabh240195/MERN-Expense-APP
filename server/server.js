const express = require("express");
const morgan = require("morgan");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const path = require("path");

// config dot env file
dotenv.config();

// database connect
connectDB();

// rest object
const app = express();

// middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

// routes
// app.get('/', (req, res) => {
//     res.send("<h1>Hello Server</h1>");
// })

app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

// code for live
// static files
app.use(express.static(path.join(__dirname, './client/build'))); 

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname,'./client/build/index.html'))
})

// end code for live

// PORT
const PORT = 8080 || process.env.PORT;

// listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
