const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const {decrypt_all, encrypt, decryptrsa} = require('../utils/crypto')
const cors = require('cors');
const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');
const app = express();
const url = require("url");
const https = require('https')
const fs = require('fs');
const path = require("path");

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
app.use((req, res, next) => {
 
  // Parsing the URL
  const request = url.parse(req.url, true);

  // Extracting the path of file
  const action = request.pathname;

  // Path Refinements
  const filePath = path.join('./',
      action).split("%20").join(" ");

  // Checking if the path exists
  fs.exists(filePath, function (exists) {

      if (!exists) {
          // res.writeHead(404, {
          //     "Content-Type": "text/plain"
          // });
          // res.end("404 Not Found");
          next()
          return
      }

      // Extracting file extension
      const ext = path.extname(action);

      // Setting default Content-Type
      var contentType = "text/plain";

      // Checking if the extension of
      // image is '.png'
      if (ext === ".png") {
          contentType = "image/png";
      }

      // Setting the headers
      res.writeHead(200, {
          "Content-Type": contentType
      });

      // Reading the file
      fs.readFile(filePath,
          function (err, content) {
              // Serving the image
              res.end(content);
          });
  });
});
app.post('/api', async (req, res, next) => {
  if (req.cookies.haizz && req.headers.who_are_you && req.headers.what_this && req.headers.i_dont_know && req.headers.how) {
    req.cookies.haizz = b64ToUint8array(await decrypt.decryptrsa(req.cookies.haizz))
    req.cookies.getout = b64ToUint8array(await decrypt.decryptrsa(req.cookies.getout))
    console.log("key "+ req.cookies.haizz )
    console.log("iv "+ req.cookies.getout )
    const aeskey = {key: req.cookies.haizz, iv: req.cookies.getout}
    let data = {token: req.cookies.token, rToken: req.cookies.rToken}
    data = (await decrypt_all(data, aeskey))
    req.cookies.token = data.token
    req.cookies.rToken = data.rToken
  }
  if (req.headers.custom1) {
    req.headers.custom1 = b64ToUint8array(await decrypt.decryptrsa(req.headers.custom1))
    req.headers.custom2 = b64ToUint8array(await decrypt.decryptrsa(req.headers.custom2))
    const key = {key: req.headers.custom1, iv: req.headers.custom2}
    req.body.variables = (await decrypt_all(req.body.variables, key))
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
