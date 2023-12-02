function checkLogin() {
    // Lấy giá trị từ trường username và password
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Kiểm tra xem có thông tin đăng nhập hợp lệ hay không (đơn giản là kiểm tra nếu cả hai trường đều được điền)
    if (username && password) {
        username = 1234;
        password = 1234;
        alert("Đăng nhập thành công!");
        // Thực hiện các hành động sau khi đăng nhập thành công (chẳng hạn chuyển hướng trang)
    } else {
        alert("Vui lòng nhập đầy đủ thông tin đăng nhập.");
    }
}
