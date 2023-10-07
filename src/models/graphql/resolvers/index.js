// graphql/resolvers/index.ts
const phu = require('./index.phu')
const thao = require('./index.thao')
module.exports = [...phu, ...thao];