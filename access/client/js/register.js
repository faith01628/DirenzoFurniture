document.getElementById('login_form').addEventListener('submit', async function (e) {
    e.preventDefault(); // Ngăn form gửi theo cách mặc định

    // Lấy giá trị của các trường nhập liệu
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    const confirmPassword = document.getElementById('ConfirmPassword').value;

    // Kiểm tra nếu Password và Confirm Password không khớp
    if (password !== confirmPassword) {
        alert('Mật khẩu không trùng khớp. Vui lòng thử lại.');
        return;
    }

    // Chuẩn bị dữ liệu để gửi
    const accountData = {
        email: email,
        password: password,
    };

    try {
        // Gửi yêu cầu POST tới API tạo tài khoản
        const response = await fetch('https://furni1.transtechvietnam.com/account/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(accountData), // Chuyển dữ liệu thành chuỗi JSON
        });

        const result = await response.json(); // Đọc phản hồi từ API

        if (response.ok) {
            // Tài khoản tạo thành công, chuyển hướng sang trang đăng nhập hoặc trang khác
            alert('Tạo tài khoản thành công! Chuyển hướng tới trang đăng nhập.');
            window.location.href = '/login'; // Chuyển hướng tới trang login
        } else {
            // Xử lý lỗi (ví dụ: email đã tồn tại)
            alert('Lỗi khi tạo tài khoản: ' + result.message);
        }

    } catch (error) {
        console.error('Lỗi trong quá trình tạo tài khoản:', error);
        alert('Có lỗi xảy ra khi tạo tài khoản. Vui lòng thử lại.');
    }
});
