
const nodemailer = require('nodemailer')
    const user ="classroomfk49@gmail.com"
    const pass = "googlecr666"

module.exports = {
    async create(request, response) {
        const transporte = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port: 587,
            auth: {user, pass}
        })

        transporte.sendMail({
            from: user,
            to: "raulzin.raul@gmail.com",
            subject: "Convite",
            text: "seu codigo para turma classroom"
        }).then(info=>{
            response.send(info)
        }).catch(error =>{
            response.send(error)
        })
        

    }
}