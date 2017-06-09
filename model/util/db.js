import * as mysql from 'mysql';

// Initialize pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'calendar'
});

function query(sql, values) {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                connection.release();
                reject(error);
            }

            connection.query(sql, values, (error, results, fields) => {
                console.log('model > util > query > error --->', error);
                connection.release();
                if (!error) {
                    resolve(results);
                }
            });

            connection.on('error', error => {
                connection.release();
                reject(error);
            });
        });
    });
}

export { query }