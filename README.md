**Bước 1**: Cài đặt node lên máy tính, phiên bản node v20.6.1 trên trang của node: https://nodejs.org/en/blog/release/v20.6.1<br />
**Bước 2**: Import file Test_sql.sql vào phpmyadmin để tạo cơ sở dữ liệu. Bấm ‘Nhập’ hoặc ‘Import’ để import.<br />
![Picture1](https://github.com/syphu3011/J2EE/assets/77763598/f7a06f71-6548-4a23-9d04-50e2fe783890)<br />

**Bước 3**: Vào VSCode, mở project lên. Bật Terminal và chạy lệnh ‘npm i’. Enter và chờ cài đặt module.<br />
![Picture2](https://github.com/syphu3011/J2EE/assets/77763598/1733fe38-47df-4587-9925-1957c2a1120e)<br />

![Picture3](https://github.com/syphu3011/J2EE/assets/77763598/8e7e2d0a-36a2-4b47-909c-8edee1c50d9a)<br />

Như trên là đã thành công.<br />

**Bước 4**: Chạy ở terminal câu lệnh ‘npm run dev’<br />
![Picture4](https://github.com/syphu3011/J2EE/assets/77763598/138f45e8-82e3-41bc-9828-4d43681824cd)<br />

**Bước 5**: Thêm 1 cửa sổ terminal nữa để chạy server. Chạy ‘node src/models’<br />
![Picture5](https://github.com/syphu3011/J2EE/assets/77763598/70ec03a8-5f06-431e-97b0-939ec8c99872)<br />

**Bước 6**: Vào localhost:8080 để chạy web môi trường localhost<br />

**Lưu ý:** <br />
    1. Phải cài đặt đúng bản node để không bị conflict.<br />
    2. Cổng 8080 và 3301 phải được đảm bảo được mở và không có dịch vụ nào chạy trong đó<br />
