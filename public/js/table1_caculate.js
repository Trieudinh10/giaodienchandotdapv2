// var values = {};

// function fn_iotag(tag){
//     socket.on(tag, function(value) {
//         values[tag] = value;
//         calculate();
//     })};

//     // Tạo một mảng chứa các tag cần đăng ký sự kiện
// var tags = [
//     'a456_9', 'a456_13', 'a456_18', 'a789_9', 'a789_13', 'a789_18',
//     'b456_9', 'b456_13', 'b456_18', 'b789_9', 'b789_13', 'b789_18',
//     'cl_9', 'cl_13', 'cl_18',
//     'a456_9', 'a456_13', 'a456_18', 'a789_9', 'a789_13', 'a789_18',
//     'b456_9', 'b456_13', 'b456_18', 'b789_9', 'b789_13', 'b789_18',
//     'cl_9', 'cl_13', 'cl_18',
//     'a456_9', 'a456_13', 'a456_18', 'a789_9', 'a789_13', 'a789_18',
//     'b456_9', 'b456_13', 'b456_18', 'b789_9', 'b789_13', 'b789_18',
//     'cl_9', 'cl_13', 'cl_18',
//     'a456_9', 'a456_13', 'a456_18', 'a789_9', 'a789_13', 'a789_18',
//     'b456_9', 'b456_13', 'b456_18', 'b789_9', 'b789_13', 'b789_18',
//     'cl_9', 'cl_13', 'cl_18',
//     'a456_9', 'a456_13', 'a456_18', 'a789_9', 'a789_13', 'a789_18',
//     'b456_9', 'b456_13', 'b456_18', 'b789_9', 'b789_13', 'b789_18',
//     'cl_9', 'cl_13', 'cl_18',
//     'a456_9', 'a456_13', 'a456_18', 'a789_9', 'a789_13', 'a789_18',
//     'b456_9', 'b456_13', 'b456_18', 'b789_9', 'b789_13', 'b789_18',
//     'cl_9', 'cl_13', 'cl_18',
// ];

// // Đăng ký sự kiện cho từng tag trong mảng
// tags.forEach(function(tag) {
//     fn_iotag(tag);
// });
    
// function calculate() {
//     Buong_ngaytt = 9999;
//     Tan_ngaytt = (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) * 9 +
//                  (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) * 13 +
//                  (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) * 18 +

//                  (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) * 9 +
//                  (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) * 13 +
//                  (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) * 18 +

//                  (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) * 9 +
//                  (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) * 13 +
//                  (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) * 18 +

//                  (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) * 9 +
//                  (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) * 13 +
//                  (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) * 18 +

//                  (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) * 9 +
//                  (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) * 13 +
//                  (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) * 18 +

//                  (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) * 9 +
//                  (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) * 13 +
//                  (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) * 18 ;

//     Thung_9tt = (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) +
//                   (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) +
//                   (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) +
//                   (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) +
//                   (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) +
//                   (values['a456_9'] + values['a789_9'] + values['b456_9'] + values['b789_9'] + values['cl_9']) ;

//     Thung_13tt = (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) +
//                    (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) +
//                    (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) +
//                    (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) +
//                    (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) +
//                    (values['a456_13'] + values['a789_13'] + values['b456_13'] + values['b789_13'] + values['cl_13']) ;

//     Thung_18tt = (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) +
//                    (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) +
//                    (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) +
//                    (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) +
//                    (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) +
//                    (values['a456_18'] + values['a789_18'] + values['b456_18'] + values['b789_18'] + values['cl_18']) ;

//     var dataCells = $('.data_cell');

//     $(dataCells[0]).text(Buong_ngaytt);
//     $(dataCells[1]).text(Tan_ngaytt);
//     $(dataCells[2]).text(Thung_9tt);
//     $(dataCells[3]).text(Thung_13tt);
//     $(dataCells[4]).text(Thung_18tt);

// }

// var socket = io();
// fn_Table01_SQL_Show_Display();
// function fn_Table01_SQL_Show_Display()
// {
//     socket.removeAllListeners("data_from_calculate");
//     socket.on('data_from_calculate',function(data){
//         fn_table_01(data);
//     });
// }
// // Phần này giữ nguyên, chỉ cần sửa phần fn_table_01(data)
// function fn_table_01(data){
//     var dataCells = $('.data_cell');

//     // Sử dụng dữ liệu từ tham số 'data' được truyền vào
//     $(dataCells[0]).text(data.Buong_ngaytt);
//     $(dataCells[1]).text(data.Tan_ngaytt);
//     $(dataCells[2]).text(data.Thung_9tt);
//     $(dataCells[3]).text(data.Thung_13tt);
//     $(dataCells[4]).text(data.Thung_18tt);

//     console.log('thubien',data.Buong_ngaytt);
// }


var values = {};
// Tạo một mảng chứa các tag cần đăng ký sự kiện
var tags = ['Buong_ngaytt', 'Tan_ngaytt', 'Thung_9tt', 'Thung_13tt', 'Thung_18tt'];

function fn_iotag(tag){
    socket.on(tag, function(value) {
        values[tag] = value;
        calculate();
    })};


// Đăng ký sự kiện cho từng tag trong mảng
tags.forEach(function(tag) {
    fn_iotag(tag);
});
    

function calculate() {
    // Gán giá trị cho các biến dựa trên dữ liệu từ 'values'
    Buong_ngayt = values['Buong_ngaytt'];
    Tan_ngayt = values['Tan_ngaytt'];
    Thung_9t = values['Thung_9tt'];
    Thung_13t = values['Thung_13tt'];
    Thung_18t = values['Thung_18tt'];

    var dataCells = $('.data_cell_tb11');

    $(dataCells[0]).text(Buong_ngayt);
    $(dataCells[1]).text(Tan_ngayt);
    $(dataCells[2]).text(Thung_9t);
    $(dataCells[3]).text(Thung_13t);
    $(dataCells[4]).text(Thung_18t);
}

