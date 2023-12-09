const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();

// const connectToMongo = async () => {
//     await mongoose.connect('mongodb+srv://dinhqtrieu10:<password>@cluster0.qx9hruk.mongodb.net/?retryWrites=true&w=majority');
//     console.log("Connected to MongoDB");
//   };
  
//   connectToMongo();

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


const router = express.Router();
const route = require('./routes/index.js')


app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set("views", "./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);

route(app);

const PORT = process.env.PORT || 8080
server.listen(PORT, () => {
    console.log(`Server conected to port ${PORT}`);
});



//////////////////////////////////////////////////////////////////////////*************************//////////////////////////////////////////////////////////////////////////
// triger ghi dữ liệu vào SQL
var insert_trigger = false;			// Trigger
var old_insert_trigger = false;		// Trigger old
// Declare an object to store values
var tt_tag = {
    Buong_ngaytt: [],
    Tan_ngaytt: [],
    Thung_9tt: [],
    Thung_13tt: [],
    Thung_18tt: [],
    Buong_ngaykh:[],
    Tan_ngaykh:[],
    Thung_9kh:[],
    Thung_13kh:[],
    Thung_18kh:[],
    Buong_ngaycl:[],
    Tan_ngaycl:[],
    Thung_9cl:[],
    Thung_13cl:[],
    Thung_18cl:[],
    Buong_ngayhs: [],
    Tan_ngayhs:[],
    Thung_9hs:[],
    Thung_13hs:[],
    Thung_18hs:[],
};

// KHỞI TẠO KẾT NỐI PLC
var nodes7 = require('nodes7');
var conn_plc = new nodes7; //PLC1
// Tạo địa chỉ kết nối (slot = 2 nếu là 300/400, slot = 1 nếu là 1200/1500)
conn_plc.initiateConnection({ port: 102, host: '10.14.84.228', rack: 0, slot: 1 }, PLC_connected);

//Bảng tag trong Visual studio code
const tag = require('./public/js/tag.js');
const tags_list = tag.tags_list();


// GỬI DỮ LIỆu TAG CHO PLC
// Tag Name load
var taglodash = require('lodash'); // Chuyển variable sang array
var tag_Listarr = taglodash.keys(tags_list);
// GỬI DỮ LIỆu TAG CHO PLC
function PLC_connected(err) {
    if (typeof (err) !== "undefined") {
        console.log(err); // Hiển thị lỗi nếu không kết nối đƯỢc với PLC
    }
    conn_plc.setTranslationCB(function (tag) { return tags_list[tag]; });  // Đưa giá trị đọc lên từ PLC và mảng
    conn_plc.addItems(tag_Listarr);
}

// Đọc dữ liệu từ PLC và đưa vào array tags
var arr_tag = []; // Tạo một mảng lưu giá trị tag đọc về
var obj_tag = []; // Tạo một mảng lưu giá trị tag đọc về
function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("Lỗi khi đọc dữ liệu tag"); } // Cảnh báo lỗi
    var lodash = require('lodash'); // Chuyển variable sang array
    arr_tag = lodash.map(values, (item) => item);
    console.log("Data from PLC", arr_tag); // Hiển thị giá trị để kiểm tra
    obj_tag = values;
}

// Hàm chức năng scan giá trị
function fn_read_data_scan() {
    conn_plc.readAllItems(valuesReady);
    trigger();
    fn_sql_insert();
    fn_sql_nhap();
    caculate_tt();
    caculate_cl();
    caculate_hs();
    fn_tag();
}

// Time cập nhật mỗi 1s
setInterval(
    () => fn_read_data_scan(),
    1000 // 1s = 1000ms
);

// // ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
// var obj_tag = [];

// // ///////////GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT)///////////
// const { fn_tag } = require('./public/js/fn_tag.js');
// io.on("connection", function (socket) {
//     socket.on("Client-send-data", function (data) {
//         fn_tag(io, obj_tag);
//     });

// });


///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
function fn_tag() {
    ///////////////CHUYỀN 1///////////////
    io.sockets.emit("c1a456_9", obj_tag["c1a456_9"]);
    io.sockets.emit("c1a456_13", obj_tag["c1a456_13"]);
    io.sockets.emit("c1a456_18", obj_tag["c1a456_18"]);
    io.sockets.emit("c1a789_9", obj_tag["c1a789_9"]);
    io.sockets.emit("c1a789_13", obj_tag["c1a789_13"]);
    io.sockets.emit("c1a789_18", obj_tag["c1a789_18"]);
    io.sockets.emit("c1b456_9", obj_tag["c1b456_9"]);
    io.sockets.emit("c1b456_13", obj_tag["c1b456_13"]);
    io.sockets.emit("c1b456_18", obj_tag["c1b456_18"]);
    io.sockets.emit("c1b789_9", obj_tag["c1b789_9"]);
    io.sockets.emit("c1b789_13", obj_tag["c1b789_13"]);
    io.sockets.emit("c1b789_18", obj_tag["c1b789_18"]);
    io.sockets.emit("c1cl_9", obj_tag["c1cl_9"]);
    io.sockets.emit("c1cl_13", obj_tag["c1cl_13"]);
    io.sockets.emit("c1cl_18", obj_tag["c1cl_18"]);
    ///////////////CHUYỀN 2/////////////// 
    io.sockets.emit("c2a456_9", obj_tag["c2a456_9"]);
    io.sockets.emit("c2a456_13", obj_tag["c2a456_13"]);
    io.sockets.emit("c2a456_18", obj_tag["c2a456_18"]);
    io.sockets.emit("c2a789_9", obj_tag["c2a789_9"]);
    io.sockets.emit("c2a789_13", obj_tag["c2a789_13"]);
    io.sockets.emit("c2a789_18", obj_tag["c2a789_18"]);
    io.sockets.emit("c2b456_9", obj_tag["c2b456_9"]);
    io.sockets.emit("c2b456_13", obj_tag["c2b456_13"]);
    io.sockets.emit("c2b456_18", obj_tag["c2b456_18"]);
    io.sockets.emit("c2b789_9", obj_tag["c2b789_9"]);
    io.sockets.emit("c2b789_13", obj_tag["c2b789_13"]);
    io.sockets.emit("c2b789_18", obj_tag["c2b789_18"]);
    io.sockets.emit("c2cl_9", obj_tag["c2cl_9"]);
    io.sockets.emit("c2cl_13", obj_tag["c2cl_13"]);
    io.sockets.emit("c2cl_18", obj_tag["c2cl_18"]);
    ///////////////CHUYỀN 3/////////////// 
    io.sockets.emit("c3a456_9", obj_tag["c3a456_9"]);
    io.sockets.emit("c3a456_13", obj_tag["c3a456_13"]);
    io.sockets.emit("c3a456_18", obj_tag["c3a456_18"]);
    io.sockets.emit("c3a789_9", obj_tag["c3a789_9"]);
    io.sockets.emit("c3a789_13", obj_tag["c3a789_13"]);
    io.sockets.emit("c3a789_18", obj_tag["c3a789_18"]);
    io.sockets.emit("c3b456_9", obj_tag["c3b456_9"]);
    io.sockets.emit("c3b456_13", obj_tag["c3b456_13"]);
    io.sockets.emit("c3b456_18", obj_tag["c3b456_18"]);
    io.sockets.emit("c3b789_9", obj_tag["c3b789_9"]);
    io.sockets.emit("c3b789_13", obj_tag["c3b789_13"]);
    io.sockets.emit("c3b789_18", obj_tag["c3b789_18"]);
    io.sockets.emit("c3cl_9", obj_tag["c3cl_9"]);
    io.sockets.emit("c3cl_13", obj_tag["c3cl_13"]);
    io.sockets.emit("c3cl_18", obj_tag["c3cl_18"]);
    ///////////////CHUYỀN 2/////////////// 
    io.sockets.emit("c4a456_9", obj_tag["c4a456_9"]);
    io.sockets.emit("c4a456_13", obj_tag["c4a456_13"]);
    io.sockets.emit("c4a456_18", obj_tag["c4a456_18"]);
    io.sockets.emit("c4a789_9", obj_tag["c4a789_9"]);
    io.sockets.emit("c4a789_13", obj_tag["c4a789_13"]);
    io.sockets.emit("c4a789_18", obj_tag["c4a789_18"]);
    io.sockets.emit("c4b456_9", obj_tag["c4b456_9"]);
    io.sockets.emit("c4b456_13", obj_tag["c4b456_13"]);
    io.sockets.emit("c4b456_18", obj_tag["c4b456_18"]);
    io.sockets.emit("c4b789_9", obj_tag["c4b789_9"]);
    io.sockets.emit("c4b789_13", obj_tag["c4b789_13"]);
    io.sockets.emit("c4b789_18", obj_tag["c4b789_18"]);
    io.sockets.emit("c4cl_9", obj_tag["c4cl_9"]);
    io.sockets.emit("c4cl_13", obj_tag["c4cl_13"]);
    io.sockets.emit("c4cl_18", obj_tag["c4cl_18"]);
    ///////////////CHUYỀN 2/////////////// 
    io.sockets.emit("c5a456_9", obj_tag["c5a456_9"]);
    io.sockets.emit("c5a456_13", obj_tag["c5a456_13"]);
    io.sockets.emit("c5a456_18", obj_tag["c5a456_18"]);
    io.sockets.emit("c5a789_9", obj_tag["c5a789_9"]);
    io.sockets.emit("c5a789_13", obj_tag["c5a789_13"]);
    io.sockets.emit("c5a789_18", obj_tag["c5a789_18"]);
    io.sockets.emit("c5b456_9", obj_tag["c5b456_9"]);
    io.sockets.emit("c5b456_13", obj_tag["c5b456_13"]);
    io.sockets.emit("c5b456_18", obj_tag["c5b456_18"]);
    io.sockets.emit("c5b789_9", obj_tag["c5b789_9"]);
    io.sockets.emit("c5b789_13", obj_tag["c5b789_13"]);
    io.sockets.emit("c5b789_18", obj_tag["c5b789_18"]);
    io.sockets.emit("c5cl_9", obj_tag["c5cl_9"]);
    io.sockets.emit("c5cl_13", obj_tag["c5cl_13"]);
    io.sockets.emit("c5cl_18", obj_tag["c5cl_18"]);
    ///////////////CHUYỀN 2/////////////// 
    io.sockets.emit("c6a456_9", obj_tag["c6a456_9"]);
    io.sockets.emit("c6a456_13", obj_tag["c6a456_13"]);
    io.sockets.emit("c6a456_18", obj_tag["c6a456_18"]);
    io.sockets.emit("c6a789_9", obj_tag["c6a789_9"]);
    io.sockets.emit("c6a789_13", obj_tag["c6a789_13"]);
    io.sockets.emit("c6a789_18", obj_tag["c6a789_18"]);
    io.sockets.emit("c6b456_9", obj_tag["c6b456_9"]);
    io.sockets.emit("c6b456_13", obj_tag["c6b456_13"]);
    io.sockets.emit("c6b456_18", obj_tag["c6b456_18"]);
    io.sockets.emit("c6b789_9", obj_tag["c6b789_9"]);
    io.sockets.emit("c6b789_13", obj_tag["c6b789_13"]);
    io.sockets.emit("c6b789_18", obj_tag["c6b789_18"]);
    io.sockets.emit("c6cl_9", obj_tag["c6cl_9"]);
    io.sockets.emit("c6cl_13", obj_tag["c6cl_13"]);
    io.sockets.emit("c6cl_18", obj_tag["c6cl_18"]);
    io.sockets.emit("trigger", obj_tag["trigger"]);
    console.log("SQL - Ghi dữ liệu thành công", obj_tag["trigger"]);
}



function caculate_tt() {
    ////////////////////TABLE1/////////////////////
    Buong_ngaytt = obj_tag['c1a456_9'] + obj_tag['c1a789_9'];
    Tan_ngaytt = (obj_tag['c1a456_9'] + obj_tag['c1a789_9'] + obj_tag['c1b456_9'] + obj_tag['c1b789_9'] + obj_tag['c1cl_9']) * 9 +
                     (obj_tag['c1a456_13'] + obj_tag['c1a789_13'] + obj_tag['c1b456_13'] + obj_tag['c1b789_13'] + obj_tag['c1cl_13']) * 13 +
                     (obj_tag['c1a456_18'] + obj_tag['c1a789_18'] + obj_tag['c1b456_18'] + obj_tag['c1b789_18'] + obj_tag['c1cl_18']) * 18 +
    
                     (obj_tag['c2a456_9'] + obj_tag['c2a789_9'] + obj_tag['c2b456_9'] + obj_tag['c2b789_9'] + obj_tag['c2cl_9']) * 9 +
                     (obj_tag['c2a456_13'] + obj_tag['c2a789_13'] + obj_tag['c2b456_13'] + obj_tag['c2b789_13'] + obj_tag['c2cl_13']) * 13 +
                     (obj_tag['c2a456_18'] + obj_tag['c2a789_18'] + obj_tag['c2b456_18'] + obj_tag['c2b789_18'] + obj_tag['c2cl_18']) * 18 +
    
                     (obj_tag['c3a456_9'] + obj_tag['c3a789_9'] + obj_tag['c3b456_9'] + obj_tag['c3b789_9'] + obj_tag['c3cl_9']) * 9 +
                     (obj_tag['c3a456_13'] + obj_tag['c3a789_13'] + obj_tag['c3b456_13'] + obj_tag['c3b789_13'] + obj_tag['c3cl_13']) * 13 +
                     (obj_tag['c3a456_18'] + obj_tag['c3a789_18'] + obj_tag['c3b456_18'] + obj_tag['c3b789_18'] + obj_tag['c3cl_18']) * 18 +
    
                     (obj_tag['c4a456_9'] + obj_tag['c4a789_9'] + obj_tag['c4b456_9'] + obj_tag['c4b789_9'] + obj_tag['c4cl_9']) * 9 +
                     (obj_tag['c4a456_13'] + obj_tag['c4a789_13'] + obj_tag['c4b456_13'] + obj_tag['c4b789_13'] + obj_tag['c4cl_13']) * 13 +
                     (obj_tag['c4a456_18'] + obj_tag['c4a789_18'] + obj_tag['c4b456_18'] + obj_tag['c4b789_18'] + obj_tag['c4cl_18']) * 18 +
    
                     (obj_tag['c5a456_9'] + obj_tag['c5a789_9'] + obj_tag['c5b456_9'] + obj_tag['c5b789_9'] + obj_tag['c5cl_9']) * 9 +
                     (obj_tag['c5a456_13'] + obj_tag['c5a789_13'] + obj_tag['c5b456_13'] + obj_tag['c5b789_13'] + obj_tag['c5cl_13']) * 13 +
                     (obj_tag['c5a456_18'] + obj_tag['c5a789_18'] + obj_tag['c5b456_18'] + obj_tag['c5b789_18'] + obj_tag['c5cl_18']) * 18 +
    
                     (obj_tag['c6a456_9'] + obj_tag['c6a789_9'] + obj_tag['c6b456_9'] + obj_tag['c6b789_9'] + obj_tag['c6cl_9']) * 9 +
                     (obj_tag['c6a456_13'] + obj_tag['c6a789_13'] + obj_tag['c6b456_13'] + obj_tag['c6b789_13'] + obj_tag['c6cl_13']) * 13 +
                     (obj_tag['c6a456_18'] + obj_tag['c6a789_18'] + obj_tag['c6b456_18'] + obj_tag['c6b789_18'] + obj_tag['c6cl_18']) * 18 ;

    Thung_9tt =  (obj_tag['c1a456_9'] + obj_tag['c1a789_9'] + obj_tag['c1b456_9'] + obj_tag['c1b789_9'] + obj_tag['c1cl_9'])  +
                     (obj_tag['c2a456_9'] + obj_tag['c2a789_9'] + obj_tag['c2b456_9'] + obj_tag['c2b789_9'] + obj_tag['c2cl_9']) +
                     (obj_tag['c3a456_9'] + obj_tag['c3a789_9'] + obj_tag['c3b456_9'] + obj_tag['c3b789_9'] + obj_tag['c3cl_9']) +
                     (obj_tag['c4a456_9'] + obj_tag['c4a789_9'] + obj_tag['c4b456_9'] + obj_tag['c4b789_9'] + obj_tag['c4cl_9']) +
                     (obj_tag['c5a456_9'] + obj_tag['c5a789_9'] + obj_tag['c5b456_9'] + obj_tag['c5b789_9'] + obj_tag['c5cl_9']) +
                     (obj_tag['c6a456_9'] + obj_tag['c6a789_9'] + obj_tag['c6b456_9'] + obj_tag['c6b789_9'] + obj_tag['c6cl_9']) ;

    Thung_13tt = (obj_tag['c1a456_13'] + obj_tag['c1a789_13'] + obj_tag['c1b456_13'] + obj_tag['c1b789_13'] + obj_tag['c1cl_13'])  +
                     (obj_tag['c2a456_13'] + obj_tag['c2a789_13'] + obj_tag['c2b456_13'] + obj_tag['c2b789_13'] + obj_tag['c2cl_13']) +
                     (obj_tag['c3a456_13'] + obj_tag['c3a789_13'] + obj_tag['c3b456_13'] + obj_tag['c3b789_13'] + obj_tag['c3cl_13']) +
                     (obj_tag['c4a456_13'] + obj_tag['c4a789_13'] + obj_tag['c4b456_13'] + obj_tag['c4b789_13'] + obj_tag['c4cl_13']) +
                     (obj_tag['c5a456_13'] + obj_tag['c5a789_13'] + obj_tag['c5b456_13'] + obj_tag['c5b789_13'] + obj_tag['c5cl_13']) +
                     (obj_tag['c6a456_13'] + obj_tag['c6a789_13'] + obj_tag['c6b456_13'] + obj_tag['c6b789_13'] + obj_tag['c6cl_13']) ;
                     
    Thung_18tt = (obj_tag['c1a456_18'] + obj_tag['c1a789_18'] + obj_tag['c1b456_18'] + obj_tag['c1b789_18'] + obj_tag['c1cl_18']) +
                     (obj_tag['c2a456_18'] + obj_tag['c2a789_18'] + obj_tag['c2b456_18'] + obj_tag['c2b789_18'] + obj_tag['c2cl_18']) +
                     (obj_tag['c3a456_18'] + obj_tag['c3a789_18'] + obj_tag['c3b456_18'] + obj_tag['c3b789_18'] + obj_tag['c3cl_18']) +
                     (obj_tag['c4a456_18'] + obj_tag['c4a789_18'] + obj_tag['c4b456_18'] + obj_tag['c4b789_18'] + obj_tag['c4cl_18']) +
                     (obj_tag['c5a456_18'] + obj_tag['c5a789_18'] + obj_tag['c5b456_18'] + obj_tag['c5b789_18'] + obj_tag['c5cl_18']) +
                     (obj_tag['c6a456_18'] + obj_tag['c6a789_18'] + obj_tag['c6b456_18'] + obj_tag['c6b789_18'] + obj_tag['c6cl_18']) ;

                       
        tt_tag["Buong_ngaytt"] = Buong_ngaytt;
        tt_tag["Tan_ngaytt"] = Tan_ngaytt;
        tt_tag["Thung_9tt"] = Thung_9tt;
        tt_tag["Thung_13tt"] = Thung_13tt;
        tt_tag["Thung_18tt"] = Thung_18tt;
        console.log('Data thuc te',Buong_ngaytt,Tan_ngaytt,Thung_9tt,Thung_13tt,Thung_18tt)


        io.sockets.emit("Buong_ngaytt", tt_tag["Buong_ngaytt"]);
        io.sockets.emit("Tan_ngaytt", tt_tag["Tan_ngaytt"]);
        io.sockets.emit("Thung_9tt", tt_tag["Thung_9tt"]);
        io.sockets.emit("Thung_13tt", tt_tag["Thung_13tt"]);
        io.sockets.emit("Thung_18tt", tt_tag["Thung_18tt"]);


    ////////////////////TABLE2/////////////////////
}

// io.on("connection", function(socket){
//     socket.on("Client-send-data", function(data){
//         io.sockets.emit("Buong_ngaytt", tt_tag["Buong_ngaytt"]);
//         io.sockets.emit("Tan_ngaytt", tt_tag["Tan_ngaytt"]);
//         io.sockets.emit("Thung_9tt", tt_tag["Thung_9tt"]);
//         io.sockets.emit("Thung_13tt", tt_tag["Thung_13tt"]);
//         io.sockets.emit("Thung_18tt", tt_tag["Thung_18tt"]);
          
// });});




// /////////// GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT) ///////////////
io.on("connection", function (socket) {
    socket.on("Client-send-data", function (data) {
        caculate_tt();
        caculate_cl();
    });
});

// HÀM GHI DỮ LIỆU XUỐNG PLC
function valuesWritten(anythingBad) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
}

   

io.on("connection", function(socket) {
    socket.on("cmd_Main_Edit_Data", function(data){
        Buong_ngaykh = data[0];
        Tan_ngaykh = data[1];
        Thung_9kh = data[2];
        Thung_13kh = data[3];
        Thung_18kh = data[4];


        tt_tag["Buong_ngaykh"] = Buong_ngaykh;
        tt_tag["Tan_ngaykh"] = Tan_ngaykh;
        tt_tag["Thung_9kh"] = Thung_9kh;
        tt_tag["Thung_13kh"] = Thung_13kh;
        tt_tag["Thung_18kh"] = Thung_18kh;
        // console.log('Gia tri ke hoach',Buong_ngaykh,Tan_ngaykh,Thung_9kh,Thung_13kh,Thung_18kh)
    });
});


io.on("connection", function(socket){
    socket.on("Client-send-data", function(data){
        io.sockets.emit("Buong_ngaykh", tt_tag["Buong_ngaykh"]);
        io.sockets.emit("Tan_ngaykh", tt_tag["Tan_ngaykh"]);
        io.sockets.emit("Thung_9kh", tt_tag["Thung_9kh"]);
        io.sockets.emit("Thung_13kh", tt_tag["Thung_13kh"]);
        io.sockets.emit("Thung_18kh", tt_tag["Thung_18kh"]);
        console.log('Data ke hoach',Buong_ngaykh,Tan_ngaykh,Thung_9kh,Thung_13kh,Thung_18kh)
          
});});

function caculate_cl(){


    Buong_ngaycl = Math.abs(tt_tag["Buong_ngaykh"] - tt_tag["Buong_ngaytt"]);
    Tan_ngaycl = Math.abs(tt_tag["Tan_ngaykh"] - tt_tag["Tan_ngaytt"]);
    Thung_9cl = Math.abs(tt_tag["Thung_9kh"] - tt_tag["Thung_9tt"]);
    Thung_13cl = Math.abs(tt_tag["Thung_13kh"] - tt_tag["Thung_13tt"]);
    Thung_18cl = Math.abs(tt_tag["Thung_18kh"] - tt_tag["Thung_18tt"]);
    

    tt_tag["Buong_ngaycl"] = Buong_ngaycl;
    tt_tag["Tan_ngaycl"] = Tan_ngaycl;
    tt_tag["Thung_9cl"] = Thung_9cl;
    tt_tag["Thung_13cl"] = Thung_13cl;
    tt_tag["Thung_18cl"] = Thung_18cl;
    console.log('Data chenh lech',Buong_ngaycl,Tan_ngaycl,Thung_9cl,Thung_13cl,Thung_18cl)


    io.sockets.emit("Buong_ngaycl", tt_tag["Buong_ngaycl"]);
    io.sockets.emit("Tan_ngaycl", tt_tag["Tan_ngaycl"]);
    io.sockets.emit("Thung_9cl", tt_tag["Thung_9cl"]);
    io.sockets.emit("Thung_13cl", tt_tag["Thung_13cl"]);
    io.sockets.emit("Thung_18cl", tt_tag["Thung_18cl"]);
}

function caculate_hs(){
    Buong_ngayhs = ((tt_tag["Buong_ngaytt"] / tt_tag["Buong_ngaykh"]) * 100).toFixed(2);
    Tan_ngayhs = ((tt_tag["Tan_ngaytt"] / tt_tag["Tan_ngaykh"]) * 100).toFixed(2);
    Thung_9hs = ((tt_tag["Thung_9tt"] / tt_tag["Thung_9kh"]) * 100).toFixed(2);
    Thung_13hs = ((tt_tag["Thung_13tt"] / tt_tag["Thung_13kh"]) * 100).toFixed(2);
    Thung_18hs = ((tt_tag["Thung_18tt"] / tt_tag["Thung_18kh"]) * 100).toFixed(2);

    tt_tag["Buong_ngayhs"] = Buong_ngayhs;
    tt_tag["Tan_ngayhs"] = Tan_ngayhs;
    tt_tag["Thung_9hs"] = Thung_9hs;
    tt_tag["Thung_13hs"] = Thung_13hs;
    tt_tag["Thung_18hs"] = Thung_18hs;
    console.log('Data hieu suat', Buong_ngayhs,Tan_ngayhs,Thung_9hs,Thung_13hs,Thung_18hs);

    io.sockets.emit("Buong_ngayhs", tt_tag["Buong_ngayhs"]);
    io.sockets.emit("Tan_ngayhs", tt_tag["Tan_ngayhs"]);
    io.sockets.emit("Thung_9hs", tt_tag["Thung_9hs"]);
    io.sockets.emit("Thung_13hs", tt_tag["Thung_13hs"]);
    io.sockets.emit("Thung_18hs", tt_tag["Thung_18hs"]);

}


// // MÀN HÌNH CHÍNH
// io.on("connection", function(socket)
// {
//     // Ghi dữ liệu từ IO field
//     socket.on("cmd_Main_Edit_Data", function(data){
//         tt_tag.writeItems([
//                             'Buong_ngaykh', 'Tan_ngaykh', 'Thung_9kh', 'Thung_13kh', 'Thung_18kh'],
//                             [data[0],data[1],data[2],data[3],data[4]
//                         ], valuesWritten);
//         });
// });


var triggger = true; // Chú ý đến việc sửa chính tả từ "triggger" thành "trigger"
function trigger() {
    setInterval(function () {
        triggger = !triggger; // Chuyển đổi giá trị giữa true và false
    }, 30000); // Mỗi giây
    obj_tag["triggger"] = triggger;
    io.sockets.emit("triggger", obj_tag["triggger"]);
}

// Khởi tạo SQL
var mysql = require('mysql');

var sqlcon = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  database: "sql_banana",
  dateStrings:true // Hiển thị không có T và Z
});

var old_buong_ngaykh;
var old_tan_ngaykh;
var old_thung9kh;
var old_thung13kh;
var old_thung18kh;

function fn_sql_nhap() {
    var sqltable_Name = "nhap_data";
    // Lấy thời gian hiện tại
    var tzoffset = (new Date()).getTimezoneOffset() * 60000; // Vùng Việt Nam (GMT7+)
    var temp_datenow = new Date();
    var timeNow = (new Date(temp_datenow - tzoffset)).toISOString().slice(0, -1).replace("T", " ");-0
    var timeNow_toSQL = "'" + timeNow + "',";

    // Dữ liệu đọc lên từ các tag
    Buong_ngaykh = "'" + tt_tag["Buong_ngaykh"] + "',";
    Tan_ngaykh = "'" + tt_tag["Tan_ngaykh"] + "',";
    Thung_9kh = "'" + tt_tag["Thung_9kh"] + "',";
    Thung_13kh = "'" + tt_tag["Thung_13kh"] + "',";
    Thung_18kh = "'" + tt_tag["Thung_18kh"] + "'";
    if (Buong_ngaykh !== old_buong_ngaykh || Tan_ngaykh !== old_tan_ngaykh || Thung_9kh !== old_thung9kh || Thung_13kh !== old_thung13kh || Thung_18kh !== old_thung18kh) {
        // Thêm cảnh báo vào SQL
        var str1 = "INSERT INTO " + sqltable_Name + " (date_time, Buong_ngaykh, Tan_ngaykh, Thung_9kh,Thung_13kh,Thung_18kh) VALUES (";
        var str2 = timeNow_toSQL
            + Buong_ngaykh
            + Tan_ngaykh
            + Thung_9kh
            + Thung_13kh
            + Thung_18kh
            ;
        var str = str1 + str2 + ");";
        // Ghi dữ liệu cảnh báo vào SQL
        sqlcon.query(str, function (err, result) {
            if (err) {
                console.log(err);
            } else {}
        });
        old_buong_ngaykh = Buong_ngaykh;
        old_tan_ngaykh = Tan_ngaykh;
        old_thung9kh = Thung_9kh;
        old_thung13kh = Thung_13kh;
        old_thung18kh = Thung_18kh;
    }
}


function fn_sql_insert(){

    insert_trigger = obj_tag["triggger"];		// Read trigger from PLC
    var sqltable_Name = "server_data";
    // Lấy thời gian hiện tại
	var tzoffset = (new Date()).getTimezoneOffset() * 60000; //Vùng Việt Nam (GMT7+)
	var temp_datenow = new Date();
	var timeNow = (new Date(temp_datenow - tzoffset)).toISOString().slice(0, -1).replace("T"," ");
	var timeNow_toSQL = "'" + timeNow + "',";

    // Dữ liệu đọc lên từ các tag
    Buong_ngaytt = "'" + tt_tag["Buong_ngaytt"] + "',";
    Tan_ngaytt = "'" + tt_tag["Tan_ngaytt"] + "',";
    Thung_9tt = "'" + tt_tag["Thung_9tt"] + "',";
    Thung_13tt = "'" + tt_tag["Thung_13tt"] + "',";
    Thung_18tt = "'" + tt_tag["Thung_18tt"] + "'";

// Ghi dữ liệu vào SQL
if (insert_trigger && !old_insert_trigger && !isNaN(insert_trigger))
{
    var sql_write_str11 = "INSERT INTO " + sqltable_Name + " (date_time, Buong_ngaytt, Tan_ngaytt, Thung_9tt, Thung_13tt, Thung_18tt) VALUES (";
    var sql_write_str12 = timeNow_toSQL
                        + Buong_ngaytt
                        + Tan_ngaytt
                        + Thung_9tt
                        + Thung_13tt
                        + Thung_18tt
                        ;
    var sql_write_str1 = sql_write_str11 + sql_write_str12 + ");";
    // Thực hiện ghi dữ liệu vào SQL
    sqlcon.query(sql_write_str1, function (err, result) {
        if (err) {
            console.log(err);
         } else {
            console.log("SQL - Ghi dữ liệu thành công");
          } 
        });
}
old_insert_trigger = insert_trigger;
}


var test = require('./public/js/test.js')
var ketqua = test(8,9)
console.log('ket qua', ketqua)
