const {gql} = require('apollo-server-express')
const SanPhamType = require('./sanpham'); 
const LoaiType = require('./loai'); 
const rootType = gql`
 type Query {
     root: String
 }
 type Mutation {
     root: String
 }

`;

module.exports = [rootType, SanPhamType, LoaiType];