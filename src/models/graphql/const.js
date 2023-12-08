const STATUS_CODE = {
    query_success: "200",
    create_success: "201",
    update_success: "201",
    delete_success: "201",
    query_fail: "404",
    create_fail: "400",
    update_fail: "409",
    delete_fail: "409"
}
const PRIVATE_CODE_AT = "3jfpskefx"
const PRIVATE_CODE_RT = "dkfxsse3r"
const LIFE_AT = 10
const LIFE_RT = 3600 * 72
const CHUCNANG = Object.freeze({
    THEMSANPHAM: "Thêm sản phẩm",
    XOASANPHAM: "Xóa sản phẩm",
    SUASANPHAM: "Sửa sản phẩm",
    THEMLOAI: "Thêm loại",
    SUALOAI: "Sửa loại",
    XOALOAI: "Xóa loại",
    SUAKHACHHANG: "Sửa khách hàng",
    XOAKHACHHANG: "Xóa khách hàng",
    XEMKHO: "Xem kho",
    SUAKHO: "Sửa kho",
    NHAPHANG: "Nhập hàng",
    THEMNHACUNGCAP: "Thêm nhà cung cấp",
    XOANHACUNGCAP: "Xóa nhà cung cấp",
    SUANHACUNGCAP: "Sửa nhà cung cấp", 
    THEMNHANVIEN: "Thêm nhân viên",
    XOANHANVIEN: "Xóa nhân viên",
    SUANHANVIEN: 'Sửa nhân viên',
    DONHANG: 'Quản lý đơn hàng',
    XULYHOADON: 'Xử lý hóa đơn',
    THONGKE: 'Thống kê'
}
)
const MAIL = Object.freeze({
    USERNAME: "vmtpmail@gmail.com",
    PASSWORD: "tpat ogcg wvmd eiew"
})
module.exports = {STATUS_CODE,PRIVATE_CODE_AT, PRIVATE_CODE_RT, LIFE_AT, LIFE_RT, CHUCNANG, MAIL}