const Login = require('../models/LoginModel')

exports.index= (req, res) =>{
    if(req.session.user) return res.render('logado')
    return res.render('login')
}

exports.register = async(req, res) => { 
    try{
        const login = new Login(req.body)
        await login.register()
    
    //Verificar novamente se existe erros e mostrar tais na tela
    if (login.errors.length > 0){
        req.flash('errors', login.errors)
        req.session.save(function(){
            return res.redirect('back')
        })
        return
        }
    req.flash('success', 'Usuário cadastrado com sucesso!')
    req.session.save(function(){
        return res.redirect('back')
    })
    return
    }catch(erro){
        return res.render('404')
        
    }
    
}

exports.login = async (req, res) => {
    try{
        const login = new Login(req.body)
        await login.login()

        if(login.errors.length > 0){
            req.flash('errors', login.errors)
            req.session.save( () => {
                return res.redirect('back')
            })
            return
        }

        req.flash('sucess', 'Usuário logado no sistema!')
        req.session.user = login.user
        req.session.save( () => {
            return res.redirect('back')
        })
    }catch(erro){
        console.log(erro)
        return res.render(erro)
    }
}

exports.logout = (req, res) =>{
    req,session.detroy()
    res.redirect('/')
}
