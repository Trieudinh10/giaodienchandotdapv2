const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const {requireAuth, checkUser} = require('./middleware/authMiddleware');


dotenv.config();
const app = express();

app.use(express.static("public"));
app.use(express.json()); //phản hồi ở dạng json
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set("views", "./views");
var server = require("http").Server(app);

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

const PORT = process.env.PORT
server.listen(PORT, () => {
    console.log(`Server conected to port ${PORT}`);
});

// routes
app.get('*', checkUser);
app.get('/', (req, res) => res.render('home'));
app.get('/table_1', requireAuth, (req, res) => res.render('table_1'));
app.get('/chart', requireAuth, (req, res) => res.render('chart'));
app.get('/setting', requireAuth, (req, res) => res.render('setting'));
app.get('/table_2', requireAuth, (req, res) => res.render('table_2'));
app.get('/data', requireAuth, (req, res) => res.render('data'));
app.use(authRoutes);




