**Bước 1**: Cài đặt node lên máy tính, phiên bản node v20.6.1 trên trang của node: https://nodejs.org/en/blog/release/v20.6.1<br />
**Bước 2**: Import file Test_sql.sql vào phpmyadmin để tạo cơ sở dữ liệu. Bấm ‘Nhập’ hoặc ‘Import’ để import.<br />
![Picture1](https://github.com/syphu3011/J2EE/assets/77763598/fd691674-38c4-4a65-abed-d45a72ee3846)<br /><br />

**Bước 3**: Vào VSCode, mở project lên. Bật Terminal và chạy lệnh ‘npm i’. Enter và chờ cài đặt module.<br />
![Picture2](https://github.com/syphu3011/J2EE/assets/77763598/d946a6f6-df97-4152-9e66-bf59bfc08ff6)<br /><br />

![Picture3](https://github.com/syphu3011/J2EE/assets/77763598/84da8847-5053-45fc-a239-53da9a1c55cf)<br /><br />

Như trên là đã thành công.<br />

**Bước 4**: Chạy ở terminal câu lệnh ‘npm run dev’<br />
![Picture4](https://github.com/syphu3011/J2EE/assets/77763598/fe201470-0048-495e-bea4-8214c16a255b)<br /><br />

**Bước 5**: Thêm 1 cửa sổ terminal nữa để chạy server. Chạy ‘node src/models’<br />
![Picture5](https://github.com/syphu3011/J2EE/assets/77763598/8f3c4a63-2001-4c03-b5f3-6beda49e3ab7)<br /><br />

**Bước 6**: Vào localhost:8080 để chạy web môi trường localhost<br />

**Lưu ý:** <br />
    1. Phải cài đặt đúng bản node để không bị conflict.<br />
    2. Cổng 8080 và 3301 phải được đảm bảo được mở và không có dịch vụ nào chạy trong đó<br />
