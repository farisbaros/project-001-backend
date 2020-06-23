const { Queries } = require('../../utilities');

const schema = 'test';

const table = 'user';

const login = (request, response) => {
    const { username, password } = request.body;
    Queries.find(
        (err, res) => {
            if (err) {
                response.status(500).json({ message: JSON.stringify(err) });
                return;
            };
            if (res.rows) {
                if (res.rows.password === password) response.status(200).json({ isSuccessful: true, token: '', message: 'Login Succeed' })
                else response.status(200).json({ isSuccessful: false, message: 'Password does not match' })
            } else {
                response.status(200).json({ isSuccessful: false, message: 'User not found' })
            }
        },
        schema,
        table,
        ["username"],
        [username]
    )
}

const signup = (request, response) => {
    const { username, password } = request.body;
    Queries.save(
        (err, res) => {
            if (err) {
                response.status(500).json({ message: JSON.stringify(err) });
                return;
            };
            response.status(201).json({ message: 'Signup succeed' })
        },
        schema,
        table,
        ["username", "password"],
        [username, password]
    )
}

module.exports = { login, signup };