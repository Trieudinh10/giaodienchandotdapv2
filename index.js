const express = require('express');
const dotenv = require('dotenv');
const path = require('path')
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const indexRoutes = require('./routes/index.js');
const userRoutes = require('./routes/user.js');

//.ENV
dotenv.config();

const app = express();
app.use(express.static("public"));
// const router = express.Router();
// const route = require('./routes/index.js');

app.use(cors()); //tránh lỗi
app.use(express.static("public"));
app.use(express.json()); //phản hồi ở dạng json
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set("views", "./views");
app.set('views', path.resolve(__dirname, 'views'))

var server = require("http").Server(app);

//DATABASE AUTHENTICATED
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//CONECT SERVER
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server connected to port ${PORT}`);
});

// ROUTES
app.use(indexRoutes);
app.use(authRoutes);
app.use('/user', userRoutes);