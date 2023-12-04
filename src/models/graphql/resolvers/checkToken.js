const {KhachHang, NhanVien, LichSuHeThong} = require("../../database/models");
const { STATUS_CODE } = require("../const");
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
async function checkAndResolveAdmin (taikhoan, callback, noidunglichsu, name_func=null) {
    if (taikhoan) {
        if (name_func) {
            const check_pri = await checkPrivileges(taikhoan, name_func)
            if (check_pri) {
                const rs = await callback(check_pri)
                if (rs.status == '200' || rs.status == '201') {
                    if (noidunglichsu && noidunglichsu !== "") {
                        const noidunglichsu_full = `${check_pri.ma} ${check_pri.ten} ${noidunglichsu}`
                        await LichSuHeThong.create({ noidung: noidunglichsu_full })
                    }
                }
                return rs
            }
        }
        else {
            const check_admin = await checkAdmin(taikhoan)
            if (check_admin) {
                const rs = await callback(check_admin)
                if (rs.status == '200' || rs.status == '201') {
                    if (noidunglichsu && noidunglichsu !== "") {
                        const noidunglichsu_full = `${check_admin.data.ma} ${check_admin.data.ten} ${noidunglichsu}`
                        await LichSuHeThong.create({ noidung: noidunglichsu_full })
                    }
                }
                return rs
            }
        }
    }
    return {
        status: STATUS_CODE.query_fail,
        message: "Có lỗi xảy ra!",
        data: []
    }
}
async function checkAndResolveWithOutData (taikhoan, callback, noidunglichsu, name_func=null) {
    if (taikhoan) {
        if (name_func) {
            const check_pri = await checkPrivileges(taikhoan, name_func)
            if (check_pri) {
                const rs = await callback(check_pri)
                if (rs.status == '200' || rs.status == '201' || rs.status == 200 || rs.status == 201) {
                    if (noidunglichsu && noidunglichsu !== "") {
                        const noidunglichsu_full = `${check_pri.ma} ${check_pri.ten} ${noidunglichsu}`
                        await LichSuHeThong.create({ noidung: noidunglichsu_full })
                    }
                }
                return rs
            }
        }
        else {
            const check_admin = await checkAdmin(taikhoan)
            if (check_admin) {
                const rs = await callback(check_admin)
                if (rs.status == '200' || rs.status == '201') {
                    if (noidunglichsu && noidunglichsu !== "") {
                        const noidunglichsu_full = `${check_admin.data.ma} ${check_admin.data.ten} ${noidunglichsu}`
                        await LichSuHeThong.create({ noidung: noidunglichsu_full })
                    }
                }
                return rs
            }
        }
    }
    return {
        status: STATUS_CODE.query_fail,
        message: "Có lỗi xảy ra!",
    }
}
async function checkPrivileges (taikhoan,name_func){
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
, checkAdmin,
checkPrivileges
, 
checkAndResolveAdmin,
checkAndResolveWithOutData
}