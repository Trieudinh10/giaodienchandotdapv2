// var values = {};

// function fn_iotag(tag){
//     socket.on(tag, function(value) {
//         values[tag] = value;
//         calculate();
//     })};

//     // Tạo một mảng chứa các tag cần đăng ký sự kiện
// var tags = [
//     'chuyen_1_a456_9kg', 'chuyen_1_a456_13kg', 'chuyen_1_a456_18kg', 'chuyen_1_a789_9kg', 'chuyen_1_a789_13kg', 'chuyen_1_a789_18kg',
//     'chuyen_1_b456_9kg', 'chuyen_1_b456_13kg', 'chuyen_1_b456_18kg', 'chuyen_1_b789_9kg', 'chuyen_1_b789_13kg', 'chuyen_1_b789_18kg',
//     'chuyen_1_cl_9kg', 'chuyen_1_cl_13kg', 'chuyen_1_cl_18kg',
//     'chuyen_2_a456_9kg', 'chuyen_2_a456_13kg', 'chuyen_2_a456_18kg', 'chuyen_2_a789_9kg', 'chuyen_2_a789_13kg', 'chuyen_2_a789_18kg',
//     'chuyen_2_b456_9kg', 'chuyen_2_b456_13kg', 'chuyen_2_b456_18kg', 'chuyen_2_b789_9kg', 'chuyen_2_b789_13kg', 'chuyen_2_b789_18kg',
//     'chuyen_2_cl_9kg', 'chuyen_2_cl_13kg', 'chuyen_2_cl_18kg',
//     'chuyen_3_a456_9kg', 'chuyen_3_a456_13kg', 'chuyen_3_a456_18kg', 'chuyen_3_a789_9kg', 'chuyen_3_a789_13kg', 'chuyen_3_a789_18kg',
//     'chuyen_3_b456_9kg', 'chuyen_3_b456_13kg', 'chuyen_3_b456_18kg', 'chuyen_3_b789_9kg', 'chuyen_3_b789_13kg', 'chuyen_3_b789_18kg',
//     'chuyen_3_cl_9kg', 'chuyen_3_cl_13kg', 'chuyen_3_cl_18kg',
//     'chuyen_4_a456_9kg', 'chuyen_4_a456_13kg', 'chuyen_4_a456_18kg', 'chuyen_4_a789_9kg', 'chuyen_4_a789_13kg', 'chuyen_4_a789_18kg',
//     'chuyen_4_b456_9kg', 'chuyen_4_b456_13kg', 'chuyen_4_b456_18kg', 'chuyen_4_b789_9kg', 'chuyen_4_b789_13kg', 'chuyen_4_b789_18kg',
//     'chuyen_4_cl_9kg', 'chuyen_4_cl_13kg', 'chuyen_4_cl_18kg',
//     'chuyen_5_a456_9kg', 'chuyen_5_a456_13kg', 'chuyen_5_a456_18kg', 'chuyen_5_a789_9kg', 'chuyen_5_a789_13kg', 'chuyen_5_a789_18kg',
//     'chuyen_5_b456_9kg', 'chuyen_5_b456_13kg', 'chuyen_5_b456_18kg', 'chuyen_5_b789_9kg', 'chuyen_5_b789_13kg', 'chuyen_5_b789_18kg',
//     'chuyen_5_cl_9kg', 'chuyen_5_cl_13kg', 'chuyen_5_cl_18kg',
//     'chuyen_6_a456_9kg', 'chuyen_6_a456_13kg', 'chuyen_6_a456_18kg', 'chuyen_6_a789_9kg', 'chuyen_6_a789_13kg', 'chuyen_6_a789_18kg',
//     'chuyen_6_b456_9kg', 'chuyen_6_b456_13kg', 'chuyen_6_b456_18kg', 'chuyen_6_b789_9kg', 'chuyen_6_b789_13kg', 'chuyen_6_b789_18kg',
//     'chuyen_6_cl_9kg', 'chuyen_6_cl_13kg', 'chuyen_6_cl_18kg',
// ];

// // Đăng ký sự kiện cho từng tag trong mảng
// tags.forEach(function(tag) {
//     fn_iotag(tag);
// });
    
// function calculate() {
//     Buong_ngaytt = 9999;
//     Tan_ngaytt = (values['chuyen_1_a456_9kg'] + values['chuyen_1_a789_9kg'] + values['chuyen_1_b456_9kg'] + values['chuyen_1_b789_9kg'] + values['chuyen_1_cl_9kg']) * 9 +
//                  (values['chuyen_1_a456_13kg'] + values['chuyen_1_a789_13kg'] + values['chuyen_1_b456_13kg'] + values['chuyen_1_b789_13kg'] + values['chuyen_1_cl_13kg']) * 13 +
//                  (values['chuyen_1_a456_18kg'] + values['chuyen_1_a789_18kg'] + values['chuyen_1_b456_18kg'] + values['chuyen_1_b789_18kg'] + values['chuyen_1_cl_18kg']) * 18 +

//                  (values['chuyen_2_a456_9kg'] + values['chuyen_2_a789_9kg'] + values['chuyen_2_b456_9kg'] + values['chuyen_2_b789_9kg'] + values['chuyen_2_cl_9kg']) * 9 +
//                  (values['chuyen_2_a456_13kg'] + values['chuyen_2_a789_13kg'] + values['chuyen_2_b456_13kg'] + values['chuyen_2_b789_13kg'] + values['chuyen_2_cl_13kg']) * 13 +
//                  (values['chuyen_2_a456_18kg'] + values['chuyen_2_a789_18kg'] + values['chuyen_2_b456_18kg'] + values['chuyen_2_b789_18kg'] + values['chuyen_2_cl_18kg']) * 18 +

//                  (values['chuyen_3_a456_9kg'] + values['chuyen_3_a789_9kg'] + values['chuyen_3_b456_9kg'] + values['chuyen_3_b789_9kg'] + values['chuyen_3_cl_9kg']) * 9 +
//                  (values['chuyen_3_a456_13kg'] + values['chuyen_3_a789_13kg'] + values['chuyen_3_b456_13kg'] + values['chuyen_3_b789_13kg'] + values['chuyen_3_cl_13kg']) * 13 +
//                  (values['chuyen_3_a456_18kg'] + values['chuyen_3_a789_18kg'] + values['chuyen_3_b456_18kg'] + values['chuyen_3_b789_18kg'] + values['chuyen_3_cl_18kg']) * 18 +

//                  (values['chuyen_4_a456_9kg'] + values['chuyen_4_a789_9kg'] + values['chuyen_4_b456_9kg'] + values['chuyen_4_b789_9kg'] + values['chuyen_4_cl_9kg']) * 9 +
//                  (values['chuyen_4_a456_13kg'] + values['chuyen_4_a789_13kg'] + values['chuyen_4_b456_13kg'] + values['chuyen_4_b789_13kg'] + values['chuyen_4_cl_13kg']) * 13 +
//                  (values['chuyen_4_a456_18kg'] + values['chuyen_4_a789_18kg'] + values['chuyen_4_b456_18kg'] + values['chuyen_4_b789_18kg'] + values['chuyen_4_cl_18kg']) * 18 +

//                  (values['chuyen_5_a456_9kg'] + values['chuyen_5_a789_9kg'] + values['chuyen_5_b456_9kg'] + values['chuyen_5_b789_9kg'] + values['chuyen_5_cl_9kg']) * 9 +
//                  (values['chuyen_5_a456_13kg'] + values['chuyen_5_a789_13kg'] + values['chuyen_5_b456_13kg'] + values['chuyen_5_b789_13kg'] + values['chuyen_5_cl_13kg']) * 13 +
//                  (values['chuyen_5_a456_18kg'] + values['chuyen_5_a789_18kg'] + values['chuyen_5_b456_18kg'] + values['chuyen_5_b789_18kg'] + values['chuyen_5_cl_18kg']) * 18 +

//                  (values['chuyen_6_a456_9kg'] + values['chuyen_6_a789_9kg'] + values['chuyen_6_b456_9kg'] + values['chuyen_6_b789_9kg'] + values['chuyen_6_cl_9kg']) * 9 +
//                  (values['chuyen_6_a456_13kg'] + values['chuyen_6_a789_13kg'] + values['chuyen_6_b456_13kg'] + values['chuyen_6_b789_13kg'] + values['chuyen_6_cl_13kg']) * 13 +
//                  (values['chuyen_6_a456_18kg'] + values['chuyen_6_a789_18kg'] + values['chuyen_6_b456_18kg'] + values['chuyen_6_b789_18kg'] + values['chuyen_6_cl_18kg']) * 18 ;

//     Thung_9kgtt = (values['chuyen_1_a456_9kg'] + values['chuyen_1_a789_9kg'] + values['chuyen_1_b456_9kg'] + values['chuyen_1_b789_9kg'] + values['chuyen_1_cl_9kg']) +
//                   (values['chuyen_2_a456_9kg'] + values['chuyen_2_a789_9kg'] + values['chuyen_2_b456_9kg'] + values['chuyen_2_b789_9kg'] + values['chuyen_2_cl_9kg']) +
//                   (values['chuyen_3_a456_9kg'] + values['chuyen_3_a789_9kg'] + values['chuyen_3_b456_9kg'] + values['chuyen_3_b789_9kg'] + values['chuyen_3_cl_9kg']) +
//                   (values['chuyen_4_a456_9kg'] + values['chuyen_4_a789_9kg'] + values['chuyen_4_b456_9kg'] + values['chuyen_4_b789_9kg'] + values['chuyen_4_cl_9kg']) +
//                   (values['chuyen_5_a456_9kg'] + values['chuyen_5_a789_9kg'] + values['chuyen_5_b456_9kg'] + values['chuyen_5_b789_9kg'] + values['chuyen_5_cl_9kg']) +
//                   (values['chuyen_6_a456_9kg'] + values['chuyen_6_a789_9kg'] + values['chuyen_6_b456_9kg'] + values['chuyen_6_b789_9kg'] + values['chuyen_6_cl_9kg']) ;

//     Thung_13kgtt = (values['chuyen_1_a456_13kg'] + values['chuyen_1_a789_13kg'] + values['chuyen_1_b456_13kg'] + values['chuyen_1_b789_13kg'] + values['chuyen_1_cl_13kg']) +
//                    (values['chuyen_2_a456_13kg'] + values['chuyen_2_a789_13kg'] + values['chuyen_2_b456_13kg'] + values['chuyen_2_b789_13kg'] + values['chuyen_2_cl_13kg']) +
//                    (values['chuyen_3_a456_13kg'] + values['chuyen_3_a789_13kg'] + values['chuyen_3_b456_13kg'] + values['chuyen_3_b789_13kg'] + values['chuyen_3_cl_13kg']) +
//                    (values['chuyen_4_a456_13kg'] + values['chuyen_4_a789_13kg'] + values['chuyen_4_b456_13kg'] + values['chuyen_4_b789_13kg'] + values['chuyen_4_cl_13kg']) +
//                    (values['chuyen_5_a456_13kg'] + values['chuyen_5_a789_13kg'] + values['chuyen_5_b456_13kg'] + values['chuyen_5_b789_13kg'] + values['chuyen_5_cl_13kg']) +
//                    (values['chuyen_6_a456_13kg'] + values['chuyen_6_a789_13kg'] + values['chuyen_6_b456_13kg'] + values['chuyen_6_b789_13kg'] + values['chuyen_6_cl_13kg']) ;

//     Thung_18kgtt = (values['chuyen_1_a456_18kg'] + values['chuyen_1_a789_18kg'] + values['chuyen_1_b456_18kg'] + values['chuyen_1_b789_18kg'] + values['chuyen_1_cl_18kg']) +
//                    (values['chuyen_2_a456_18kg'] + values['chuyen_2_a789_18kg'] + values['chuyen_2_b456_18kg'] + values['chuyen_2_b789_18kg'] + values['chuyen_2_cl_18kg']) +
//                    (values['chuyen_3_a456_18kg'] + values['chuyen_3_a789_18kg'] + values['chuyen_3_b456_18kg'] + values['chuyen_3_b789_18kg'] + values['chuyen_3_cl_18kg']) +
//                    (values['chuyen_4_a456_18kg'] + values['chuyen_4_a789_18kg'] + values['chuyen_4_b456_18kg'] + values['chuyen_4_b789_18kg'] + values['chuyen_4_cl_18kg']) +
//                    (values['chuyen_5_a456_18kg'] + values['chuyen_5_a789_18kg'] + values['chuyen_5_b456_18kg'] + values['chuyen_5_b789_18kg'] + values['chuyen_5_cl_18kg']) +
//                    (values['chuyen_6_a456_18kg'] + values['chuyen_6_a789_18kg'] + values['chuyen_6_b456_18kg'] + values['chuyen_6_b789_18kg'] + values['chuyen_6_cl_18kg']) ;

//     var dataCells = $('.data_cell');

//     $(dataCells[0]).text(Buong_ngaytt);
//     $(dataCells[1]).text(Tan_ngaytt);
//     $(dataCells[2]).text(Thung_9kgtt);
//     $(dataCells[3]).text(Thung_13kgtt);
//     $(dataCells[4]).text(Thung_18kgtt);

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
//     $(dataCells[2]).text(data.Thung_9kgtt);
//     $(dataCells[3]).text(data.Thung_13kgtt);
//     $(dataCells[4]).text(data.Thung_18kgtt);

//     console.log('thubien',data.Buong_ngaytt);
// }


var valuets = {};
// Tạo một mảng chứa các tag cần đăng ký sự kiện
var tags = ['Buong_ngaytt', 'Tan_ngaytt', 'Thung_9kgtt', 'Thung_13kgtt', 'Thung_18kgtt'];

function fn_iotag(tag){
    socket.on(tag, function(valuet) {
        valuets[tag] = valuet;
        calculate();
    })};


// Đăng ký sự kiện cho từng tag trong mảng
tags.forEach(function(tag) {
    fn_iotag(tag);
});
    

function calculate() {
    // Gán giá trị cho các biến dựa trên dữ liệu từ 'values'
    Buong_ngayt = valuets['Buong_ngaytt'];
    Tan_ngayt = valuets['Tan_ngaytt'];
    Thung_9kgt = valuets['Thung_9kgtt'];
    Thung_13kgt = valuets['Thung_13kgtt'];
    Thung_18kgt = valuets['Thung_18kgtt'];

    var dataCells = $('.data_cell');

    $(dataCells[0]).text(Buong_ngayt);
    $(dataCells[1]).text(Tan_ngayt);
    $(dataCells[2]).text(Thung_9kgt);
    $(dataCells[3]).text(Thung_13kgt);
    $(dataCells[4]).text(Thung_18kgt);
}

