const {KhachHang, NhanVien} = require("../../database/models")
async function checkAdmin(taikhoan) {
    try {
        const nhanvien = await NhanVien.findAll({
            where: {
                tentaikhoan: taikhoan.tentaikhoan
            }
        });
        if (nhanvien.length > 0) {
            if (nhanvien[0].matrangthai != 1) {
                return {
                    status: 400,
                    message: "Tài khoản đã bị chặn! Vui lòng liên hệ quản trị viên!",
                    data: null
                }
            }
            else {
                return {
                    status: 200,
                    message: "Hợp lệ",
                    data: nhanvien[0]
                }
            }
        }
        return {
            status: 400,
            message: "Không hợp lệ!",
            data: null
        }
    }
    catch(e) {
        return {
            status: 400,
            message: "Có lỗi xảy ra!",
            data: null
        }
    }
}
module.exports={checkKhachHang:async function (taikhoan) {
    try {
        const khachhang = await KhachHang.findAll({
            where: {
                tentaikhoan: taikhoan.tentaikhoan
            }
        });
        if (khachhang.length > 0) {
            if (khachhang[0].TrangThaiKhachHang.ten == "Bị chặn") {
                return {
                    status: 400,
                    message: "Tài khoản đã bị chặn! Vui lòng liên hệ quản trị viên!",
                    data: null
                }
            }
            else {
                return {
                    status: 200,
                    message: "Hợp lệ",
                    data: khachhang[0]
                }
            }
        }
        return {
            status: 400,
            message: "Không hợp lệ!",
            data: null
        }
    }
    catch(e) {
        return {
            status: 400,
            message: "Có lỗi xảy ra!",
            data: null
        }
    }
}
, checkAdmin: checkAdmin,
checkPrivileges: async function (taikhoan,name_func){
    let admin = await checkAdmin(taikhoan)
    let checkPri = false
    if (admin.status == 400) {
        return false
    }
    const quyen = await taikhoan.getQuyen()
    const chucnangs = await quyen.getChucNang()
    for (const chucnang of chucnangs) {
        if (chucnang.ten == name_func) {
            checkPri = true
            break
        }
    }
    if (checkPri){
        return admin.data
    }
    return checkPri
}
}