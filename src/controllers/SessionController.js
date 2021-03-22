const connection = require('../database/connection.js')

module.exports = {
    async create(request, response) {
        const { email } = request.body

        const user = await connection('users')
        .where('email', email)
        .select('name', 'id')
        .first()

        if(!user) {
            return response.status(400).json({ error: 'No user found with this E-mail' });
        }

        return response.json(user)
    }
}