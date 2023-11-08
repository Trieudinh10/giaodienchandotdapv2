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
var arr_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
var obj_tag_value = []; // Tạo một mảng lưu giá trị tag đọc về
function valuesReady(anythingBad, values) {
    if (anythingBad) { console.log("Lỗi khi đọc dữ liệu tag"); } // Cảnh báo lỗi
    var lodash = require('lodash'); // Chuyển variable sang array
    arr_tag_value = lodash.map(values, (item) => item);
    console.log("Data S1", arr_tag_value); // Hiển thị giá trị để kiểm tra
    obj_tag_value = values;
}

// Hàm chức năng scan giá trị
function fn_read_data_scan() {
    conn_plc.readAllItems(valuesReady);
    fn_tag();

}

// Time cập nhật mỗi 1s
setInterval(
    () => fn_read_data_scan(),
    1000 // 1s = 1000ms
);


// ///////////LẬP BẢNG TAG ĐỂ GỬI QUA CLIENT (TRÌNH DUYỆT)///////////
function fn_tag() {
    ///////////////CHUYỀN 1///////////////
    io.sockets.emit("chuyen_1_a456_9kg", obj_tag_value["chuyen_1_a456_9kg"]);
    io.sockets.emit("chuyen_1_a456_13kg", obj_tag_value["chuyen_1_a456_13kg"]);
    io.sockets.emit("chuyen_1_a456_18kg", obj_tag_value["chuyen_1_a456_18kg"]);
    io.sockets.emit("chuyen_1_a789_9kg", obj_tag_value["chuyen_1_a789_9kg"]);
    io.sockets.emit("chuyen_1_a789_13kg", obj_tag_value["chuyen_1_a789_13kg"]);
    io.sockets.emit("chuyen_1_a789_18kg", obj_tag_value["chuyen_1_a789_18kg"]);
    io.sockets.emit("chuyen_1_b456_9kg", obj_tag_value["chuyen_1_b456_9kg"]);
    io.sockets.emit("chuyen_1_b456_13kg", obj_tag_value["chuyen_1_b456_13kg"]);
    io.sockets.emit("chuyen_1_b456_18kg", obj_tag_value["chuyen_1_b456_18kg"]);
    io.sockets.emit("chuyen_1_b789_9kg", obj_tag_value["chuyen_1_b789_9kg"]);
    io.sockets.emit("chuyen_1_b789_13kg", obj_tag_value["chuyen_1_b789_13kg"]);
    io.sockets.emit("chuyen_1_b789_18kg", obj_tag_value["chuyen_1_b789_18kg"]);
    io.sockets.emit("chuyen_1_cl_9kg", obj_tag_value["chuyen_1_cl_9kg"]);
    io.sockets.emit("chuyen_1_cl_13kg", obj_tag_value["chuyen_1_cl_13kg"]);
    io.sockets.emit("chuyen_1_cl_18kg", obj_tag_value["chuyen_1_cl_18kg"]);
    ///////////////CHUYỀN 2/////////////// 
    io.sockets.emit("chuyen_2_a456_9kg", obj_tag_value["chuyen_2_a456_9kg"]);
    io.sockets.emit("chuyen_2_a456_13kg", obj_tag_value["chuyen_2_a456_13kg"]);
    io.sockets.emit("chuyen_2_a456_18kg", obj_tag_value["chuyen_2_a456_18kg"]);
    io.sockets.emit("chuyen_2_a789_9kg", obj_tag_value["chuyen_2_a789_9kg"]);
    io.sockets.emit("chuyen_2_a789_13kg", obj_tag_value["chuyen_2_a789_13kg"]);
    io.sockets.emit("chuyen_2_a789_18kg", obj_tag_value["chuyen_2_a789_18kg"]);
    io.sockets.emit("chuyen_2_b456_9kg", obj_tag_value["chuyen_2_b456_9kg"]);
    io.sockets.emit("chuyen_2_b456_13kg", obj_tag_value["chuyen_2_b456_13kg"]);
    io.sockets.emit("chuyen_2_b456_18kg", obj_tag_value["chuyen_2_b456_18kg"]);
    io.sockets.emit("chuyen_2_b789_9kg", obj_tag_value["chuyen_2_b789_9kg"]);
    io.sockets.emit("chuyen_2_b789_13kg", obj_tag_value["chuyen_2_b789_13kg"]);
    io.sockets.emit("chuyen_2_b789_18kg", obj_tag_value["chuyen_2_b789_18kg"]);
    io.sockets.emit("chuyen_2_cl_9kg", obj_tag_value["chuyen_2_cl_9kg"]);
    io.sockets.emit("chuyen_2_cl_13kg", obj_tag_value["chuyen_2_cl_13kg"]);
    io.sockets.emit("chuyen_2_cl_18kg", obj_tag_value["chuyen_2_cl_18kg"]);
    ///////////////CHUYỀN 3/////////////// 
    io.sockets.emit("chuyen_3_a456_9kg", obj_tag_value["chuyen_3_a456_9kg"]);
    io.sockets.emit("chuyen_3_a456_13kg", obj_tag_value["chuyen_3_a456_13kg"]);
    io.sockets.emit("chuyen_3_a456_18kg", obj_tag_value["chuyen_3_a456_18kg"]);
    io.sockets.emit("chuyen_3_a789_9kg", obj_tag_value["chuyen_3_a789_9kg"]);
    io.sockets.emit("chuyen_3_a789_13kg", obj_tag_value["chuyen_3_a789_13kg"]);
    io.sockets.emit("chuyen_3_a789_18kg", obj_tag_value["chuyen_3_a789_18kg"]);
    io.sockets.emit("chuyen_3_b456_9kg", obj_tag_value["chuyen_3_b456_9kg"]);
    io.sockets.emit("chuyen_3_b456_13kg", obj_tag_value["chuyen_3_b456_13kg"]);
    io.sockets.emit("chuyen_3_b456_18kg", obj_tag_value["chuyen_3_b456_18kg"]);
    io.sockets.emit("chuyen_3_b789_9kg", obj_tag_value["chuyen_3_b789_9kg"]);
    io.sockets.emit("chuyen_3_b789_13kg", obj_tag_value["chuyen_3_b789_13kg"]);
    io.sockets.emit("chuyen_3_b789_18kg", obj_tag_value["chuyen_3_b789_18kg"]);
    io.sockets.emit("chuyen_3_cl_9kg", obj_tag_value["chuyen_3_cl_9kg"]);
    io.sockets.emit("chuyen_3_cl_13kg", obj_tag_value["chuyen_3_cl_13kg"]);
    io.sockets.emit("chuyen_3_cl_18kg", obj_tag_value["chuyen_3_cl_18kg"]);
    ///////////////CHUYỀN 2/////////////// 
    io.sockets.emit("chuyen_4_a456_9kg", obj_tag_value["chuyen_4_a456_9kg"]);
    io.sockets.emit("chuyen_4_a456_13kg", obj_tag_value["chuyen_4_a456_13kg"]);
    io.sockets.emit("chuyen_4_a456_18kg", obj_tag_value["chuyen_4_a456_18kg"]);
    io.sockets.emit("chuyen_4_a789_9kg", obj_tag_value["chuyen_4_a789_9kg"]);
    io.sockets.emit("chuyen_4_a789_13kg", obj_tag_value["chuyen_4_a789_13kg"]);
    io.sockets.emit("chuyen_4_a789_18kg", obj_tag_value["chuyen_4_a789_18kg"]);
    io.sockets.emit("chuyen_4_b456_9kg", obj_tag_value["chuyen_4_b456_9kg"]);
    io.sockets.emit("chuyen_4_b456_13kg", obj_tag_value["chuyen_4_b456_13kg"]);
    io.sockets.emit("chuyen_4_b456_18kg", obj_tag_value["chuyen_4_b456_18kg"]);
    io.sockets.emit("chuyen_4_b789_9kg", obj_tag_value["chuyen_4_b789_9kg"]);
    io.sockets.emit("chuyen_4_b789_13kg", obj_tag_value["chuyen_4_b789_13kg"]);
    io.sockets.emit("chuyen_4_b789_18kg", obj_tag_value["chuyen_4_b789_18kg"]);
    io.sockets.emit("chuyen_4_cl_9kg", obj_tag_value["chuyen_4_cl_9kg"]);
    io.sockets.emit("chuyen_4_cl_13kg", obj_tag_value["chuyen_4_cl_13kg"]);
    io.sockets.emit("chuyen_4_cl_18kg", obj_tag_value["chuyen_4_cl_18kg"]);
    ///////////////CHUYỀN 2/////////////// 
    io.sockets.emit("chuyen_5_a456_9kg", obj_tag_value["chuyen_5_a456_9kg"]);
    io.sockets.emit("chuyen_5_a456_13kg", obj_tag_value["chuyen_5_a456_13kg"]);
    io.sockets.emit("chuyen_5_a456_18kg", obj_tag_value["chuyen_5_a456_18kg"]);
    io.sockets.emit("chuyen_5_a789_9kg", obj_tag_value["chuyen_5_a789_9kg"]);
    io.sockets.emit("chuyen_5_a789_13kg", obj_tag_value["chuyen_5_a789_13kg"]);
    io.sockets.emit("chuyen_5_a789_18kg", obj_tag_value["chuyen_5_a789_18kg"]);
    io.sockets.emit("chuyen_5_b456_9kg", obj_tag_value["chuyen_5_b456_9kg"]);
    io.sockets.emit("chuyen_5_b456_13kg", obj_tag_value["chuyen_5_b456_13kg"]);
    io.sockets.emit("chuyen_5_b456_18kg", obj_tag_value["chuyen_5_b456_18kg"]);
    io.sockets.emit("chuyen_5_b789_9kg", obj_tag_value["chuyen_5_b789_9kg"]);
    io.sockets.emit("chuyen_5_b789_13kg", obj_tag_value["chuyen_5_b789_13kg"]);
    io.sockets.emit("chuyen_5_b789_18kg", obj_tag_value["chuyen_5_b789_18kg"]);
    io.sockets.emit("chuyen_5_cl_9kg", obj_tag_value["chuyen_5_cl_9kg"]);
    io.sockets.emit("chuyen_5_cl_13kg", obj_tag_value["chuyen_5_cl_13kg"]);
    io.sockets.emit("chuyen_5_cl_18kg", obj_tag_value["chuyen_5_cl_18kg"]);
    ///////////////CHUYỀN 2/////////////// 
    io.sockets.emit("chuyen_6_a456_9kg", obj_tag_value["chuyen_6_a456_9kg"]);
    io.sockets.emit("chuyen_6_a456_13kg", obj_tag_value["chuyen_6_a456_13kg"]);
    io.sockets.emit("chuyen_6_a456_18kg", obj_tag_value["chuyen_6_a456_18kg"]);
    io.sockets.emit("chuyen_6_a789_9kg", obj_tag_value["chuyen_6_a789_9kg"]);
    io.sockets.emit("chuyen_6_a789_13kg", obj_tag_value["chuyen_6_a789_13kg"]);
    io.sockets.emit("chuyen_6_a789_18kg", obj_tag_value["chuyen_6_a789_18kg"]);
    io.sockets.emit("chuyen_6_b456_9kg", obj_tag_value["chuyen_6_b456_9kg"]);
    io.sockets.emit("chuyen_6_b456_13kg", obj_tag_value["chuyen_6_b456_13kg"]);
    io.sockets.emit("chuyen_6_b456_18kg", obj_tag_value["chuyen_6_b456_18kg"]);
    io.sockets.emit("chuyen_6_b789_9kg", obj_tag_value["chuyen_6_b789_9kg"]);
    io.sockets.emit("chuyen_6_b789_13kg", obj_tag_value["chuyen_6_b789_13kg"]);
    io.sockets.emit("chuyen_6_b789_18kg", obj_tag_value["chuyen_6_b789_18kg"]);
    io.sockets.emit("chuyen_6_cl_9kg", obj_tag_value["chuyen_6_cl_9kg"]);
    io.sockets.emit("chuyen_6_cl_13kg", obj_tag_value["chuyen_6_cl_13kg"]);
    io.sockets.emit("chuyen_6_cl_18kg", obj_tag_value["chuyen_6_cl_18kg"]);
    
}

function tinhtoan() {
    // Assuming obj_tag_value is declared somewhere and contains the necessary values...

    var data1 = obj_tag_value["chuyen_1_a456_9kg"];
    var data2 = obj_tag_value["chuyen_1_a789_9kg"];
    var data3 = obj_tag_value["chuyen_1_b456_9kg"];
    var data4 = obj_tag_value["chuyen_1_b789_9kg"];
    var data5 = obj_tag_value["chuyen_1_cl_9kg"];

    var Buong_ngaytt = data1 + data2;
    var Tan_ngaytt = (data1 + data2 + data3 + data4 + data5) * 9;
    var Thung_9kgtt = data1 + data2 + data3 + data4 + data5;
    var Thung_13kgtt = data1 + data2 + data3 + data4 + data5;
    var Thung_18kgtt = data1 + data2 + data3 + data4 + data5;

    obj_tag_value["Buong_ngaytt"] = Buong_ngaytt;
    obj_tag_value["Tan_ngaytt"] = Tan_ngaytt;
    obj_tag_value["Thung_9kgtt"] = Thung_9kgtt;
    obj_tag_value["Thung_13kgtt"] = Thung_13kgtt;
    obj_tag_value["Thung_18kgtt"] = Thung_18kgtt;

    io.sockets.emit("Buong_ngaytt", obj_tag_value["Buong_ngaytt"]);
    io.sockets.emit("Tan_ngaytt", obj_tag_value["Tan_ngaytt"]);
    io.sockets.emit("Thung_9kgtt", obj_tag_value["Thung_9kgtt"]);
    io.sockets.emit("Thung_13kgtt", obj_tag_value["Thung_13kgtt"]);
    io.sockets.emit("Thung_18kgtt", obj_tag_value["Thung_18kgtt"]);

// Trả về các giá trị tính toán để sử dụng chúng ở nơi khác
return {
    Buong_ngaytt: Buong_ngaytt,
    Tan_ngaytt: Tan_ngaytt,
    Thung_9kgtt: Thung_9kgtt,
    Thung_13kgtt: Thung_13kgtt,
    Thung_18kgtt: Thung_18kgtt
};
}
// /////////// GỬI DỮ LIỆU BẢNG TAG ĐẾN CLIENT (TRÌNH DUYỆT) ///////////////
io.on("connection", function (socket) {
    socket.on("Client-send-data", function (data) {
        fn_tag();
        tinhtoan();
    });
});

// HÀM GHI DỮ LIỆU XUỐNG PLC
function valuesWritten(anythingBad) {
    if (anythingBad) { console.log("SOMETHING WENT WRONG WRITING VALUES!!!!"); }
    console.log("Done writing.");
}




