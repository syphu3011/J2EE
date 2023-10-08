const {gql} = require('apollo-server-express')
module.exports = gql`
  type TrangThaiNhaCungCap {
    ma: ID!
    ten: String!
    nhacungcap: [NhaCungCap]
  }
  input TrangThaiNhaCungCapInput {
    ma: Int
    ten: String!
  }
  type TrangThaiNhaCungCapQueryResponse {
    status: Int!
    message: String!
    data: [TrangThaiNhaCungCap]
  }
  type TrangThaiNhaCungCapQueryVoiMaResponse {
    status: Int!
    message: String!
    data: TrangThaiNhaCungCap
  }
  type TrangThaiNhaCungCapResponse {
    status: Int!
    message: String!
  }
  extend type Query {
    trangthainhacungcap: TrangThaiNhaCungCapQueryResponse
    trangthainhacungcapvoima(ma: Int!): TrangThaiNhaCungCapQueryVoiMaResponse
  }
  extend type Mutation {
    themTrangThaiNhaCungCap(input: TrangThaiNhaCungCapInput): TrangThaiNhaCungCapResponse
    xoaTrangThaiNhaCungCap(ma: Int!): TrangThaiNhaCungCapResponse
    suaTrangThaiNhaCungCap(input: TrangThaiNhaCungCapInput): TrangThaiNhaCungCapResponse
  }
`