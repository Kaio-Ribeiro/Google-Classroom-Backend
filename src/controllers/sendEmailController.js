
const nodemailer = require('nodemailer')
    const user ="classroomfk49@gmail.com"
    const pass = "googlecr666"

module.exports = {
    async create(request, response) {
        const {email, code} = request.body

        const transporte = nodemailer.createTransport({
            host:"smtp.gmail.com",
            port: 587,
            auth: {user, pass},
            tls: {
                rejectUnauthorized: false
            }
        })

        try {

            transporte.sendMail({
                from: user,
                to: email,
                subject: "Convite",
                text: `Seu código para turma classroom: ${code}`
            })

            return response.json({success: true})

        }catch(err){
            return response.json(err)
        }
        

    }
}