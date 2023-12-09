const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRoute = require('./routes/auth')

dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.use(cors()); //tránh lỗi
app.use(cookieParser()); //tạo cookie và gắn cookie
app.use(express.json()); //phản hồi ở dạng json



app.use("/v1/auth", authRoute)


const router = express.Router();
const route = require('./routes/index.js')


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set("views", "./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);


//ROUTES
route(app);

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Server conected to port ${PORT}`);
});



//authentication (so sánh dữ liệu nhập với database)

//authorization




