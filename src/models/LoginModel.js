const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const LoginSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true}
})

const LoginModel = mongoose.model('Login', LoginSchema)

class Login {
    constructor(body){
        this.body = body,
        this.errors = [],
        this.user = null
    }
    async login(){
        this.validarDados()
        if (this.errors.length > 0) return
        this.user = await LoginModel.findOne({email: this.body.email})

        if(!this.user) {
            this.errors.push('Usuário não existe!')
            return
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida!')
            this.user = null
            return
        }
    }

    //CADASTRO DE NOVOS USUARIOS
    async register(){
        //chamar os metodos para fazer a verificação e validação dos dados inseridos no formulário
        this.validarDados()

        //Verifica se existem erros no array de errors
        if (this.errors.length > 0 ) return

        await this.userExists()
        
        if (this.errors.length > 0 ) return
        
        const salt = bcryptjs.genSaltSync()
        this.body.password = bcryptjs.hashSync(this.body.password, salt)
        this.user = await LoginModel.create(this.body)
        
        
    }

    async userExists(){
        const user = await LoginModel.findOne({email: this.body.email})
        if(user) this.errors.push('Usuário já existe!')
    }

    validarDados(){

        //Validação para que todos os valores cheguem como strings
        this.cleanUp()

        //Validação do e-mail - Usamos um modulo exportado do NPM
        if (!validator.isEmail(this.body.email)) this.errors.push('E-mail inválido!')

        //Validação da Senha - Precisa ter entre 3 e 50 caracteres
        if (this.body.password.length < 3 || this.body.password > 50){
            this.errors.push('A senha precisa ter entre 3 e 50 caracteres!')
        }
    }

    cleanUp(){
        for (let key in this.body){
            if (typeof this.body[key] !== 'string'){
                this.body[key] = ''
            }
        }
        this.body = {
            nome: this.body.nome,
            email: this.body.email,
            password: this.body.password
        }
    }
}


module.exports = Login