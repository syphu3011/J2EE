const SanPhamResolvers = require('./sanpham')
const LoaiResolvers = require('./loai')
const NhaCungCapResolvers = require('./nhacungcap')
const PhieuNhapResolvers = require('./phieunhap') 
const DonViResolvers = require('./donvi') 
const TrangThaiNhaCungCapResolvers = require('./trangthainhacungcap')
module.exports = [SanPhamResolvers, LoaiResolvers, NhaCungCapResolvers, TrangThaiNhaCungCapResolvers, PhieuNhapResolvers, DonViResolvers]