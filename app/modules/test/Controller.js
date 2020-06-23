const { Queries } = require('../../utilities');

const schema = 'test';

const table = 'test';

const get = (request, response) => {
    Queries.find(
        (err, res) => {
            if (err) {
                response.status(500).json({ message: JSON.stringify(err) });
                return;
            }
            response.status(200).json(res.rows);
        },
        schema,
        table
    )
}

const getById = (request, response) => {
    const id = parseInt(request.params.id);
    Queries.find(
        (err, res) => {
            if (err) {
                response.status(500).json({ message: JSON.stringify(err) });
                return;
            }
            response.status(200).json(res.rows);
        },
        schema,
        table,
        ["ID"],
        [id]
    )
}

const post = (request, response) => {
    const { name, email } = request.body;
    Queries.save(
        (err, res) => {
            if (err) {
                response.status(500).json({ message: JSON.stringify(err) });
                return;
            }
            response.status(201).json(res.rows);
        },
        schema,
        table,
        [name, email]
    )
}

const put = (request, response) => {
    const id = parseInt(request.params.id);
    const { name, email } = request.body;
    Queries.update(
        (err, res) => {
            if (err) {
                response.status(500).json({ message: JSON.stringify(err) });
                return;
            }
            response.status(200).json(res.rows);
        },
        schema,
        table,
        ["ID"],
        [id],
        ["name", "email"],
        [name, email]
    )
}

const deletes = (request, response) => {
    const id = parseInt(request.params.id);
    Queries.remove(
        (err, res) => {
            if (err) {
                response.status(500).json({ message: JSON.stringify(err) });
                return;
            }
            response.status(200).json(res.rows);
        },
        schema,
        table,
        ["ID"],
        [id],
    )
}

module.exports = { get, getById, post, put, deletes };