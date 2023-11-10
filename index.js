var express = require('express');
var app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');
app.set("views", "./views")
var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(8080)

app.get('/', function (req, res) {
    res.render('home');
})

app.get('/table_1', function (req, res) {
    res.render('table_1');
})

app.get('/table_2', function (req, res) {
    res.render('table_2');
})

app.get('/data', function (req, res) {
    res.render('data');
})

app.get('/setting', function (req, res) {
    res.render('setting');
})







//////////////////////////////////////////////////////////////////////////*************************//////////////////////////////////////////////////////////////////////////

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
    console.log("Data S1", arr_tag); // Hiển thị giá trị để kiểm tra
    obj_tag = values;
}

// Hàm chức năng scan giá trị
function fn_read_data_scan() {
    conn_plc.readAllItems(valuesReady);

}

// Time cập nhật mỗi 1s
setInterval(
    () => fn_read_data_scan(),
    1000 // 1s = 1000ms
);

// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
var obj_tag = [];

// ///////////GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT)///////////
const { fn_tag } = require('./public/js/fn_tag.js');
io.on("connection", function (socket) {
    socket.on("Client-send-data", function (data) {
        fn_tag(io, obj_tag);
    });

});


// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
// function fn_tag() {
//     ///////////////CHUYỀN 1///////////////
//     io.sockets.emit("c1a456_9", obj_tag["c1a456_9"]);
//     io.sockets.emit("c1a456_13", obj_tag["c1a456_13"]);
//     io.sockets.emit("c1a456_18", obj_tag["c1a456_18"]);
//     io.sockets.emit("c1a789_9", obj_tag["c1a789_9"]);
//     io.sockets.emit("c1a789_13", obj_tag["c1a789_13"]);
//     io.sockets.emit("c1a789_18", obj_tag["c1a789_18"]);
//     io.sockets.emit("c1b456_9", obj_tag["c1b456_9"]);
//     io.sockets.emit("c1b456_13", obj_tag["c1b456_13"]);
//     io.sockets.emit("c1b456_18", obj_tag["c1b456_18"]);
//     io.sockets.emit("c1b789_9", obj_tag["c1b789_9"]);
//     io.sockets.emit("c1b789_13", obj_tag["c1b789_13"]);
//     io.sockets.emit("c1b789_18", obj_tag["c1b789_18"]);
//     io.sockets.emit("c1cl_9", obj_tag["c1cl_9"]);
//     io.sockets.emit("c1cl_13", obj_tag["c1cl_13"]);
//     io.sockets.emit("c1cl_18", obj_tag["c1cl_18"]);
//     ///////////////CHUYỀN 2/////////////// 
//     io.sockets.emit("c2a456_9", obj_tag["c2a456_9"]);
//     io.sockets.emit("c2a456_13", obj_tag["c2a456_13"]);
//     io.sockets.emit("c2a456_18", obj_tag["c2a456_18"]);
//     io.sockets.emit("c2a789_9", obj_tag["c2a789_9"]);
//     io.sockets.emit("c2a789_13", obj_tag["c2a789_13"]);
//     io.sockets.emit("c2a789_18", obj_tag["c2a789_18"]);
//     io.sockets.emit("c2b456_9", obj_tag["c2b456_9"]);
//     io.sockets.emit("c2b456_13", obj_tag["c2b456_13"]);
//     io.sockets.emit("c2b456_18", obj_tag["c2b456_18"]);
//     io.sockets.emit("c2b789_9", obj_tag["c2b789_9"]);
//     io.sockets.emit("c2b789_13", obj_tag["c2b789_13"]);
//     io.sockets.emit("c2b789_18", obj_tag["c2b789_18"]);
//     io.sockets.emit("c2cl_9", obj_tag["c2cl_9"]);
//     io.sockets.emit("c2cl_13", obj_tag["c2cl_13"]);
//     io.sockets.emit("c2cl_18", obj_tag["c2cl_18"]);
//     ///////////////CHUYỀN 3/////////////// 
//     io.sockets.emit("c3a456_9", obj_tag["c3a456_9"]);
//     io.sockets.emit("c3a456_13", obj_tag["c3a456_13"]);
//     io.sockets.emit("c3a456_18", obj_tag["c3a456_18"]);
//     io.sockets.emit("c3a789_9", obj_tag["c3a789_9"]);
//     io.sockets.emit("c3a789_13", obj_tag["c3a789_13"]);
//     io.sockets.emit("c3a789_18", obj_tag["c3a789_18"]);
//     io.sockets.emit("c3b456_9", obj_tag["c3b456_9"]);
//     io.sockets.emit("c3b456_13", obj_tag["c3b456_13"]);
//     io.sockets.emit("c3b456_18", obj_tag["c3b456_18"]);
//     io.sockets.emit("c3b789_9", obj_tag["c3b789_9"]);
//     io.sockets.emit("c3b789_13", obj_tag["c3b789_13"]);
//     io.sockets.emit("c3b789_18", obj_tag["c3b789_18"]);
//     io.sockets.emit("c3cl_9", obj_tag["c3cl_9"]);
//     io.sockets.emit("c3cl_13", obj_tag["c3cl_13"]);
//     io.sockets.emit("c3cl_18", obj_tag["c3cl_18"]);
//     ///////////////CHUYỀN 2/////////////// 
//     io.sockets.emit("c4a456_9", obj_tag["c4a456_9"]);
//     io.sockets.emit("c4a456_13", obj_tag["c4a456_13"]);
//     io.sockets.emit("c4a456_18", obj_tag["c4a456_18"]);
//     io.sockets.emit("c4a789_9", obj_tag["c4a789_9"]);
//     io.sockets.emit("c4a789_13", obj_tag["c4a789_13"]);
//     io.sockets.emit("c4a789_18", obj_tag["c4a789_18"]);
//     io.sockets.emit("c4b456_9", obj_tag["c4b456_9"]);
//     io.sockets.emit("c4b456_13", obj_tag["c4b456_13"]);
//     io.sockets.emit("c4b456_18", obj_tag["c4b456_18"]);
//     io.sockets.emit("c4b789_9", obj_tag["c4b789_9"]);
//     io.sockets.emit("c4b789_13", obj_tag["c4b789_13"]);
//     io.sockets.emit("c4b789_18", obj_tag["c4b789_18"]);
//     io.sockets.emit("c4cl_9", obj_tag["c4cl_9"]);
//     io.sockets.emit("c4cl_13", obj_tag["c4cl_13"]);
//     io.sockets.emit("c4cl_18", obj_tag["c4cl_18"]);
//     ///////////////CHUYỀN 2/////////////// 
//     io.sockets.emit("c5a456_9", obj_tag["c5a456_9"]);
//     io.sockets.emit("c5a456_13", obj_tag["c5a456_13"]);
//     io.sockets.emit("c5a456_18", obj_tag["c5a456_18"]);
//     io.sockets.emit("c5a789_9", obj_tag["c5a789_9"]);
//     io.sockets.emit("c5a789_13", obj_tag["c5a789_13"]);
//     io.sockets.emit("c5a789_18", obj_tag["c5a789_18"]);
//     io.sockets.emit("c5b456_9", obj_tag["c5b456_9"]);
//     io.sockets.emit("c5b456_13", obj_tag["c5b456_13"]);
//     io.sockets.emit("c5b456_18", obj_tag["c5b456_18"]);
//     io.sockets.emit("c5b789_9", obj_tag["c5b789_9"]);
//     io.sockets.emit("c5b789_13", obj_tag["c5b789_13"]);
//     io.sockets.emit("c5b789_18", obj_tag["c5b789_18"]);
//     io.sockets.emit("c5cl_9", obj_tag["c5cl_9"]);
//     io.sockets.emit("c5cl_13", obj_tag["c5cl_13"]);
//     io.sockets.emit("c5cl_18", obj_tag["c5cl_18"]);
//     ///////////////CHUYỀN 2/////////////// 
//     io.sockets.emit("c6a456_9", obj_tag["c6a456_9"]);
//     io.sockets.emit("c6a456_13", obj_tag["c6a456_13"]);
//     io.sockets.emit("c6a456_18", obj_tag["c6a456_18"]);
//     io.sockets.emit("c6a789_9", obj_tag["c6a789_9"]);
//     io.sockets.emit("c6a789_13", obj_tag["c6a789_13"]);
//     io.sockets.emit("c6a789_18", obj_tag["c6a789_18"]);
//     io.sockets.emit("c6b456_9", obj_tag["c6b456_9"]);
//     io.sockets.emit("c6b456_13", obj_tag["c6b456_13"]);
//     io.sockets.emit("c6b456_18", obj_tag["c6b456_18"]);
//     io.sockets.emit("c6b789_9", obj_tag["c6b789_9"]);
//     io.sockets.emit("c6b789_13", obj_tag["c6b789_13"]);
//     io.sockets.emit("c6b789_18", obj_tag["c6b789_18"]);
//     io.sockets.emit("c6cl_9", obj_tag["c6cl_9"]);
//     io.sockets.emit("c6cl_13", obj_tag["c6cl_13"]);
//     io.sockets.emit("c6cl_18", obj_tag["c6cl_18"]);
    
// }

var Buong_ngaykh;
var Tan_ngaykh;
var Thung_9kh;
var Thung_13kh;
var Thung_18kh;

function tinhtoan() {


    
    var Buong_ngaytt = 9999999;
    var Tan_ngaytt = (obj_tag['c1a456_9'] + obj_tag['c1a789_9'] + obj_tag['c1b456_9'] + obj_tag['c1b789_9'] + obj_tag['c1cl_9']) * 9 +
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
    var Thung_9tt = (obj_tag['c1a456_9'] + obj_tag['c1a789_9'] + obj_tag['c1b456_9'] + obj_tag['c1b789_9'] + obj_tag['c1cl_9']) +
                      (obj_tag['c2a456_9'] + obj_tag['c2a789_9'] + obj_tag['c2b456_9'] + obj_tag['c2b789_9'] + obj_tag['c2cl_9']) +
                      (obj_tag['c3a456_9'] + obj_tag['c3a789_9'] + obj_tag['c3b456_9'] + obj_tag['c3b789_9'] + obj_tag['c3cl_9']) +
                      (obj_tag['c4a456_9'] + obj_tag['c4a789_9'] + obj_tag['c4b456_9'] + obj_tag['c4b789_9'] + obj_tag['c4cl_9']) +
                      (obj_tag['c5a456_9'] + obj_tag['c5a789_9'] + obj_tag['c5b456_9'] + obj_tag['c5b789_9'] + obj_tag['c5cl_9']) +
                      (obj_tag['c6a456_9'] + obj_tag['c6a789_9'] + obj_tag['c6b456_9'] + obj_tag['c6b789_9'] + obj_tag['c6cl_9']) ;
    var Thung_13tt = (obj_tag['c1a456_13'] + obj_tag['c1a789_13'] + obj_tag['c1b456_13'] + obj_tag['c1b789_13'] + obj_tag['c1cl_13']) +
                       (obj_tag['c2a456_13'] + obj_tag['c2a789_13'] + obj_tag['c2b456_13'] + obj_tag['c2b789_13'] + obj_tag['c2cl_13']) +
                       (obj_tag['c3a456_13'] + obj_tag['c3a789_13'] + obj_tag['c3b456_13'] + obj_tag['c3b789_13'] + obj_tag['c3cl_13']) +
                       (obj_tag['c4a456_13'] + obj_tag['c4a789_13'] + obj_tag['c4b456_13'] + obj_tag['c4b789_13'] + obj_tag['c4cl_13']) +
                       (obj_tag['c5a456_13'] + obj_tag['c5a789_13'] + obj_tag['c5b456_13'] + obj_tag['c5b789_13'] + obj_tag['c5cl_13']) +
                       (obj_tag['c6a456_13'] + obj_tag['c6a789_13'] + obj_tag['c6b456_13'] + obj_tag['c6b789_13'] + obj_tag['c6cl_13']) ;
    var Thung_18tt = (obj_tag['c1a456_18'] + obj_tag['c1a789_18'] + obj_tag['c1b456_18'] + obj_tag['c1b789_18'] + obj_tag['c1cl_18']) +
                       (obj_tag['c2a456_18'] + obj_tag['c2a789_18'] + obj_tag['c2b456_18'] + obj_tag['c2b789_18'] + obj_tag['c2cl_18']) +
                       (obj_tag['c3a456_18'] + obj_tag['c3a789_18'] + obj_tag['c3b456_18'] + obj_tag['c3b789_18'] + obj_tag['c3cl_18']) +
                       (obj_tag['c4a456_18'] + obj_tag['c4a789_18'] + obj_tag['c4b456_18'] + obj_tag['c4b789_18'] + obj_tag['c4cl_18']) +
                       (obj_tag['c5a456_18'] + obj_tag['c5a789_18'] + obj_tag['c5b456_18'] + obj_tag['c5b789_18'] + obj_tag['c5cl_18']) +
                       (obj_tag['c6a456_18'] + obj_tag['c6a789_18'] + obj_tag['c6b456_18'] + obj_tag['c6b789_18'] + obj_tag['c6cl_18']) ;
    
    var Buong_ngaycl = Buong_ngaykh - Buong_ngaytt;
                       

    obj_tag["Buong_ngaytt"] = Buong_ngaytt;
    obj_tag["Tan_ngaytt"] = Tan_ngaytt;
    obj_tag["Thung_9tt"] = Thung_9tt;
    obj_tag["Thung_13tt"] = Thung_13tt;
    obj_tag["Thung_18tt"] = Thung_18tt;

    io.sockets.emit("Buong_ngaytt", obj_tag["Buong_ngaytt"]);
    io.sockets.emit("Tan_ngaytt", obj_tag["Tan_ngaytt"]);
    io.sockets.emit("Thung_9tt", obj_tag["Thung_9tt"]);
    io.sockets.emit("Thung_13tt", obj_tag["Thung_13tt"]);
    io.sockets.emit("Thung_18tt", obj_tag["Thung_18tt"]);

}
// /////////// GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT) ///////////////
io.on("connection", function (socket) {
    socket.on("Client-send-data", function (data) {
        tinhtoan();
    });
});

// HÀM GHI DỮ LIỆU XUỐNG PLC
function valuesWritten(anythingBad) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
}




