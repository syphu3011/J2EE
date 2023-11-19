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
const node_rsa = require("node-rsa")

// const {axio} = require('axios');
const cookieParser = require('cookie-parser');
const { default: axios } = require('axios');
const decrypt = require('../utils/crypto');
const { b64ToUint8array } = require('../utils/util');
const { generateKeyRSAUser, pushToKeyUser, getKeyUser } = require('../utils/constant');
const bodyParser = require('body-parser');

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};
app.use(cookieParser());
app.use(bodyParser.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(function(req, res, next) {
  res.setHeader('Content-Type', 'text/plain;charset=UTF-8')
  res.setHeader('Access-Control-Allow-Methods', 'get, post, options, put, patch, delete');
  res.setHeader('Access-Control-Expose-Headers', 'hello, wait')
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, haizz, getout, hello, wait'
  )
  next()
})
app.use(cors({origin: "http://localhost:8080", credentials: true}));
app.use((req, res, next) => {
 if (req.url != '/api') {
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
}
else {
  next()
}
});
app.post('/api', async (req, res, next) => {
  req.headers.ip = req.ip
  try {
    req.headers.what_this = await decrypt.decryptrsa(req.headers.what_this, null)
  }
  catch(e) {
    req.headers.what_this = 'false'
  }
  let keyUser
  if (req.headers.what_this == 'false') {
    keyUser = getKeyUser(req.ip)
  }
  else if (req.headers.what_this == 'truee'){
    keyUser = null
  }
  if (req.cookies.haizz && req.headers.who_are_you && req.headers.i_dont_know && req.headers.how) {
    if (keyUser) {
      try {
        req.cookies.haizz = b64ToUint8array(await decrypt.decryptrsa(req.cookies.haizz, keyUser.old_private_client ? keyUser.old_private_client : keyUser.private_client))
        req.cookies.getout = b64ToUint8array(await decrypt.decryptrsa(req.cookies.getout, keyUser.old_private_client ? keyUser.old_private_client : keyUser.private_client))
        keyUser.old_private_client = null
        const aeskey = {key: req.cookies.haizz, iv: req.cookies.getout}
        let data = {token: req.cookies.token, rToken: req.cookies.rToken}
        data = (await decrypt_all(data, aeskey))
        req.cookies.token = data.token
        req.cookies.rToken = data.rToken
      }
      catch (e) {
        console.log(e)
      }
    }
    else {
      if (req.headers.what_this == 'false') {
        res.status(404).send({message: "Không hợp lệ!"})
        return
      }
    }
  }
  try {
    if (req.headers.custom1) {
      req.headers.custom1 = b64ToUint8array(await decrypt.decryptrsa(req.headers.custom1, keyUser && keyUser.private))
      req.headers.custom2 = b64ToUint8array(await decrypt.decryptrsa(req.headers.custom2, keyUser && keyUser.private))
      const key = {key: req.headers.custom1, iv: req.headers.custom2}
      req.cookies.private = (await decrypt.decrypt(req.headers.custom3,key)).replaceAll('\n','')
      let data_encrypted = (await decrypt.decrypt(req.body, key))
      const closing_brace_index = data_encrypted.lastIndexOf('}') + 1;
      data_encrypted = data_encrypted.slice(0, closing_brace_index);
      req.body = JSON.parse(`${data_encrypted}`)
      if (req.body.variables && req.body.variables.private && req.body.variables.public) {
        pushToKeyUser({ip: req.ip,
          public: req.body.variables.public,
          private: req.body.variables.private,
          private_client: req.body.variables.private_client})
      }
    }
  }
  catch(e) {
    console.log(e)
  }
  next()
})
app.get('/key', async (req, res, next) => {
  pushToKeyUser({id: req.ip,public: res.body.variables.public,private: res.body.variables.private}) 
})
app.post('/close', async (req, res, next) => {
  pushToKeyUser({ip: req.ip, public: null, private: null})
})
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  introspection: true,
  plugins: [
    {requestDidStart() {
      return {
        async willSendResponse({ response, context }) {
          try {
            if (response.data) {
              response.data = await decrypt.encrypt_with_key(JSON.stringify(response.data), getKeyUser(context.req.headers.ip).public, context.res)
            }
          }
          catch(e) {
            response.data = ""
          }
          context.req.cookies.private = ''
          context.res.req.cookies.private = ''
          return response;
        }
      }
    }}
  ]
  ,
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
