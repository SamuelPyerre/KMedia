require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {middlewareGlobal} = require('./src/middlewares/middleware')



//Configurando o mongoose
mongoose.connect(process.env.CONNECTIONSTRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() =>{
    app.emit('pronto')                                                                                                                                                                                                                              
  })
  .catch(e=>{
    console.log(e)
  })

app.use(express.urlencoded({extended: true}))
//Pode se usar também ->>> const app = require("express")();


//Adicionando Sessions
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
//Adicionanto Rotas
const routes = require('./routes')


const sessionOptions = session({

  secret: 'asdadad12d1nmioandsdnaon123131',
  store: MongoStore.create({mongoUrl: process.env.CONNECTIONSTRING}),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})

app.use(sessionOptions)
app.use(flash())
app.use(middlewareGlobal)
app.set('views', './src/views')
app.set('view engine', 'ejs')
app.use(express.static('public'))

//Adicionando para o app poder usar as extensões
app.use(routes)





app.on('pronto', () =>{
  app.listen(3000, () => {
    console.log('Conectando ao servidor...')
    console.log('Conexão conclúida!')
    console.log('Porta http://localhost:3000/')
  })
})
