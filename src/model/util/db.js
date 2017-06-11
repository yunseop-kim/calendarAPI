import * as mysql from 'mysql';

// Initialize pool
// todo : check mysql is running
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'calendar'
});

function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('model > util > query > err --->', err.message);
                connection.release();
                reject(err.message);
            }

            connection.query(sql, values, (err, results, fields) => {
                if (err) {
                    console.log('model > util > query > err --->', err.message);
                    reject(err.message);
                }
                connection.release();
                resolve(results);
            });
        });
    });
}

function transaction() {
    console.log('model > util > transaction > start !');
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log('model > util > transaction > err:', err.message);
                connection.release();
                reject(err.message);
            }

            connection.beginTransaction((err) => {
                if (err) {
                    console.log('model > util > transaction > err:', err.message);
                    connection.rollback(() => {
                        console.log('model > util > transaction > rollback!');
                        connection.release();
                    });
                    reject(err.message);
                }

                console.log('model > util > transaction > resolve!');
                resolve(connection);
            });
        });
    });
}

function transactionQuery(connection, query, values) {
    console.log('model > util > transactionQuery > start --->');
    return new Promise((resolve, reject) => {
        connection.query(query, values, (err, results, fields) => {
            if (err) {
                console.log('model > util > transactionQuery > err:', err.message);
                connection.rollback(() => {
                    console.log('model > util > transactionQuery > rollback!');
                    connection.release();
                });
                reject(err.message);
            }

            console.log('model > util > transactionQuery > resolve!');
            // 여기서는 release를 하지 않는다. query가 더 있을수 있기 때문.
            resolve(results);
        });
    });
}

function commit(connection) {
    console.log('model > util > commit > start --->');
    return new Promise((resolve, reject) => {
        connection.commit((err) => {
            if (err) {
                console.log('model > util > commit > err --->', err.message);
                connection.rollback(() => {
                    connection.release();
                });
                reject(err.message);
            }

            console.log('model > util > commit > success --->');
            connection.release();
            resolve(connection);
        });
    });
}

function rollback(connection, message){
    console.log('model > util > rollback > start --->');
    return new Promise((resolve, reject)=>{
        connection.rollback(()=>{
            connection.release();
        });
        reject(message);
    });
}

export { query, transaction, transactionQuery, commit, rollback }