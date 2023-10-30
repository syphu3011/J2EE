const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const {decrypt_all, encrypt, decryptrsa} = require('../utils/crypto')
const cors = require('cors');
const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');
const app = express();
const https = require('https')
const fs = require('fs');

// const {axio} = require('axios');
const cookieParser = require('cookie-parser');
const { default: axios } = require('axios');
const decrypt = require('../utils/crypto');
const { b64ToUint8array } = require('../utils/util');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'application/json;charset=UTF-8')
  res.setHeader('Access-Control-Allow-Methods', 'get, post, options, put, patch, delete');
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(cors({origin: "http://localhost:8080", credentials: true}));
app.post('/api', async (req, res, next) => {
  if (req.body.key) {
    req.body.key.key = b64ToUint8array(await decrypt.decryptrsa(req.body.key.key))
    req.body.key.iv = b64ToUint8array(await decrypt.decryptrsa(req.body.key.iv))
    req.body.variables = (await decrypt_all(req.body.variables, req.body.key))
  }
  next()
})
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  playground: {
    settings: {
      'schema.polling.enable': false,
      'editor.fontSize': 18,
    },
  },
});

apolloServer.applyMiddleware({app, path: '/api' });
const server = createServer(app);
module.exports = server;
