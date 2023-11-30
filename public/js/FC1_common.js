////////////// YÊU CẦU DỮ LIỆU TỪ SERVER- REQUEST DATA //////////////
// Khai báo socket.io và kết nối tới server
var socket = io();
var myVar = setInterval(myTimer, 500);
function myTimer() {
  socket.emit("Client-send-data", "Request data client");
}
////////////// CÁC KHỐI CHƯƠNG TRÌNH CON ///////////////////////////
// Chương trình con đọc dữ liệu lên IO Field
function fn_IOFieldDataShow(tag, IOField, tofix) {
    socket.on(tag, function (data) {
      if (tofix == 0) {
        document.getElementById(IOField).value = data;
      } else {
        document.getElementById(IOField).value = data.toFixed(tofix);
      }
    });
  }



// Chương trình con nút sửa/lưu dữ liệu
function fn_DataEdit(button1, button2)
{
    document.getElementById(button1).style.zIndex='1';  // Hiển nút 1
    document.getElementById(button2).style.zIndex='0';  // Ẩn nút 2
}