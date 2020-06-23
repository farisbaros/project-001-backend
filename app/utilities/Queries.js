const Pool = require('pg').Pool

const pool = new Pool({
    database: process.env.DB,
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPHRASE,
    port: process.env.DBPORT,
});

const find = (callback = (err, res) => { }, schema = '', table = '', whereKey = [], whereParameter = [], orderKey = [], orderParameter = [], columns = []) => {
    let statement = 'SELECT ';
    statement += columns.length ? `${columns.join()} ` : '* ';
    statement += `FROM ${schema}."${table}" a ${whereKey.length ? 'WHERE' : ''}`;
    whereKey.forEach((x, i) => {
        statement += `a."${x}" = "${whereParameter[i]}" `;
        if (i !== (whereKey.length - 1)) statement += 'AND '
    });
    statement += orderKey.length ? 'ORDER BY ' : '';
    orderKey.forEach((x, i) => {
        statement += `a."${x}" = "${orderParameter[i]}" `;
        if (i !== (orderKey.length - 1)) statement += 'AND '
    });
    pool.query(statement, [], callback);
}

const save = (callback = (err, res) => { }, schema = '', table = '', parameter = []) => {
    let statement = `INSERT INTO ${schema}."${table}" VALUES (`;
    parameter.forEach((x, i) => {
        statement += `?`;
        if (i !== (parameter.length - 1)) statement += ', ';
        else statement += ')';
    })
    pool.query(statement, parameter, callback);
}

const remove = (callback = (err, res) => { }, schema = '', table = '', whereKey = [], whereParameter = []) => {
    let statement = `DELETE FROM ${schema}."${table}" a ${whereKey.length ? 'WHERE ' : ''}`;
    whereKey.forEach((x, i) => {
        statement += `a."${x}" = "${whereParameter[i]}" `;
        if (i !== (whereKey.length - 1)) statement += 'AND '
    })
    pool.query(statement, [], callback);
}

const update = (callback = (err, res) => { }, schema = '', table = '', whereKey = [], whereParameter = [], setColumn = [], newData = []) => {
    let statement = `UPDATE ${schema}."${table}" a SET `;
    setColumn.forEach((x, i) => {
        statement += `a."${x}" = "${newData[i]}"`;
        if (i !== (setColumn.length - 1)) statement += ', '
        else statement += ' ';
    })
    whereKey.forEach((x, i) => {
        statement += `a."${x}" = "${whereParameter[i]}" `;
        if (i !== (whereKey.length - 1)) statement += 'AND '
    })
    pool.query(statement, [], callback);
}

const customQueries = (callback = (err, res) => { }, statement, parameter) => {
    pool.query(statement, parameter, callback);
}

module.exports = { find, save, update, remove, customQueries };