const express = require('express')
const route = express.Router()


//Buscando os controles para controlar nossas rotas...

const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const cadastroController = require('./src/controllers/cadastroController')
/*
~ SEM OS CONTROLLERS
route.get('/', (req, res) =>{
    res.send('Tela Inicial')
})

~ COM OS CONTROLLERS
route.get('/', homeController.index)
*/

/***************************************************
                        ROTAS                             
****************************************************/

//Rotas da Home
route.get('/', homeController.index)

//Rotas de Login
route.get('/login/index', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/login', loginController.login)
route.get('/login/logout', loginController.logout)

//Rotas de Cadastro
route.get('/cadastro/index', cadastroController.index)

module.exports = route

            