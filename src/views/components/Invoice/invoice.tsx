import React from "react";

const Invoice: React.FC = () => {
    const donHangData = [
        { id: 1, maDonHang: "DH001", ngayDatHang: "2023-11-27", tongTien: 100 },
        { id: 2, maDonHang: "DH002", ngayDatHang: "2023-11-28", tongTien: 150 },
        { id: 3, maDonHang: "DH003", ngayDatHang: "2023-11-29", tongTien: 200 },
    ];

    return (
        <div>
            <h1>Lịch sử đơn hàng</h1>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Mã đơn hàng</th>
                        <th>Ngày đặt hàng</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    {donHangData.map((donHang) => (
                        <tr key={donHang.id}>
                            <td>{donHang.id}</td>
                            <td>{donHang.maDonHang}</td>
                            <td>{donHang.ngayDatHang}</td>
                            <td>{donHang.tongTien}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Invoice;
