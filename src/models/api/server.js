const express = require('express');
const { createServer } = require('http');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const context = require('../graphql/context');
const app = express();
// const {axio} = require('axios');
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { default: axios } = require('axios');


app.use(cookieParser());
app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({ extended: true })) 
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  // res.header('Content-Type', 'application/json;charset=UTF-8')
  res.header('Access-Control-Allow-Credentials', true)
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})
app.use(cors({origin: "http://localhost:8080", credentials: true}));
// app.use("/api", function(req,res,next) {
//   if (!req.body.token && !req.body.rToken) {
//     if(req.body.username && req.body.password) {
//       if (req.body.isLoginCus) {
//         res.send(axios.post("http://127.0.0.1:3301/api",{query: req.body.query}).then(result => result))
//       }
//       //TODO: đăng nhập admin
//     }
//     if (req.body.isLoginCus) {
//       next()
//     }
//     else {
//       res.send({
//         data: null
//       })
//     }
//   }
//   else {
//     next()
//   }
// })

// app.get('/setcookie', (req, res) => {
//   res.cookie(`Cookie token name`,`encrypted cookie string`, {
//     secure: true, httpOnly: true, sameSite: "none"})
//   res.send('Cookie have been saved successfully');
// });
// app.get('/getcookie', (req, res) => {
//   //show the saved cookies
//   console.log(req.cookies)
//   res.send(req.cookies);
// });
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

apolloServer.applyMiddleware({ app, path: '/api' });

const server = createServer(app);
module.exports = server;
