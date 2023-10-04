// graphql/resolvers/index.ts
const SanPhamResolvers = require('./sanpham')
const LoaiResolvers = require('./loai')
module.exports = [SanPhamResolvers, LoaiResolvers];