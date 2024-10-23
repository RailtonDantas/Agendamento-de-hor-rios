const dotenv = require('dotenv');
dotenv.config()
const { globalMiddleware } = require("./src/middlewares/globalMiddleware")
const express = require("express");
const session = require("express-session");
const flash = require('connect-flash');
const MongoStore = require('connect-mongo')
const path = require('path');
const mongoose = require("mongoose");
const app = express();
const {routes} = require("./routes");
const { type } = require('os');
mongoose.connect(process.env.CONNECTIONSTRING)
  .then(() => {
    app.emit('base conectada')
  })
  .catch(() => {
    console.log('Erro na conexão dos dados')
  })
app.use(
  express.urlencoded(
      {extended:true}
  )
);
const sessionOptions = session({
    secret:'2918y3wgrbewjhebfiewurw rg7832t g3ryeyFBE,W9    7WYRGEF',
    // store: new MongoStore({mongooseConnection:mongoose.connection}),
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:1000 * 60 * 60 * 24,
        httpOnly:true
    },
    store:MongoStore.create({mongoUrl:process.env.CONNECTIONSTRING})
});
app.use(sessionOptions)
app.use(flash())
app.use(express.static(path.resolve(__dirname,'public')))
app.set('views',path.resolve(__dirname,'src','views'));
app.set('view engine','ejs')
app.use(globalMiddleware)
app.use(routes)
app.on('base conectada',() => {
    app.listen(5050)
    console.log('http://localhost:5050')
})
//res.location(req.get("Referrer") || "/")