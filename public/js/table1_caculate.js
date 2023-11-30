var values = {};
// Tạo một mảng chứa các tag cần đăng ký sự kiện
var tags = ['Buong_ngaytt', 'Tan_ngaytt', 'Thung_9tt', 'Thung_13tt', 'Thung_18tt',
            'Buong_ngaykh', 'Tan_ngaykh', 'Thung_9kh', 'Thung_13kh', 'Thung_18kh',
            'Buong_ngaycl', 'Tan_ngaycl', 'Thung_9cl', 'Thung_13cl', 'Thung_18cl',
            'Buong_ngayhs', 'Tan_ngayhs', 'Thung_9hs', 'Thung_13hs', 'Thung_18hs'];

function fn_iotag(tag){
    socket.on(tag, function(value) {
        values[tag] = value;
        calculate_table1();
    })};


// Đăng ký sự kiện cho từng tag trong mảng
tags.forEach(function(tag) {
    fn_iotag(tag);
});
    

function calculate_table1() {
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

    Buong_ngayc = values['Buong_ngaycl'];
    Tan_ngayc = values['Tan_ngaycl'];
    Thung_9c = values['Thung_9cl'];
    Thung_13c = values['Thung_13cl'];
    Thung_18c = values['Thung_18cl'];

    var dataCells = $('.data_cell_tb12');

    $(dataCells[0]).text(Buong_ngayc);
    $(dataCells[1]).text(Tan_ngayc);
    $(dataCells[2]).text(Thung_9c);
    $(dataCells[3]).text(Thung_13c);
    $(dataCells[4]).text(Thung_18c);

    Buong_ngayh = values['Buong_ngayhs'];
    Tan_ngayh = values['Tan_ngayhs'];
    Thung_9h = values['Thung_9hs'];
    Thung_13h = values['Thung_13hs'];
    Thung_18h = values['Thung_18hs'];

    var dataCells = $('.data_cell_tb13');

    $(dataCells[0]).text(Buong_ngayh);
    $(dataCells[1]).text(Tan_ngayh);
    $(dataCells[2]).text(Thung_9h);
    $(dataCells[3]).text(Thung_13h);
    $(dataCells[4]).text(Thung_18h);
}