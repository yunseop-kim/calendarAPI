import * as db from '../util/db';
import co from 'co';
import { ERROR } from '../../routes/util/error';

function create(template, token) {
    let { name, selected } = template;
    return co(function* () {
        let connection = yield db.transaction();
        let result = yield db.transactionQuery(connection, 'insert into groups set name=?, users_idx=(select users_idx from access_token where token=?)', [name, token]);
        let groupIdx = result.insertId;
        let result2 = yield db.transactionQuery(connection, 'insert into groups_has_users set groups_idx=?, users_idx=(select users_idx from access_token where token=?), selected=?', [groupIdx, token, selected]);
        yield db.commit(connection);

        return result2;
    });
}

function list() {
    return co(function* () {
        let sql = "SELECT * FROM groups ORDER BY name desc";
        let values = [];
        let result = yield db.query(sql, values);

        return result;
    });
}

function detail(idx, token) {
    return co(function* () {
        let sql = `
        SELECT g.*, h.selected
        FROM groups g
        LEFT OUTER JOIN groups_has_users h
        ON g.idx = h.groups_idx
        WHERE g.idx=? and g.users_idx=(SELECT users_idx 
                                FROM access_token 
                                WHERE token=?)
        `;
        let values = [idx, token];
        let result = yield db.query(sql, values);

        return result;
    });
}

function modify(idx, template, token) {
    let { name, selected } = template;

    return co(function* () {
        let connection = yield db.transaction();
        
        let sql = `
        UPDATE groups 
        SET name=?, modified=now()
        where idx=?
        and users_idx=(select users_idx 
                        from access_token 
                        where token=?)
        `;
        let values = [name, idx, token];
        
        let updateResult = yield db.transactionQuery(connection, sql, values);
        if (!(updateResult.affectedRows > 0)) {
            yield db.rollback(connection, ERROR.INVALID_INPUT);
        }

        sql = `
        UPDATE groups_has_users
        SET selected=?
        WHERE groups_idx=? 
        and users_idx=(select users_idx 
                        from access_token 
                        where token=?)
        `;
        values = [template.selected, idx, token]

        updateResult = yield db.transactionQuery(connection, sql, values);

        if (!(updateResult.affectedRows > 0)) {
            yield db.rollback(connection, ERROR.INVALID_INPUT);
        }
        yield db.commit(connection);

        return updateResult;
    });
}

function remove(idx, token) {
    return co(function* () {
        let connection = yield db.transaction();

        let sql = `
        DELETE FROM groups 
        WHERE idx=? 
        AND users_idx=(SELECT users_idx 
                        FROM access_token 
                        WHERE token=?)
        `;
        let values = [idx, token];

        let deleteResult = yield db.transactionQuery(connection, sql, values);
        
        if (!(deleteResult.affectedRows > 0)) {
            yield db.rollback(connection, ERROR.INVALID_INPUT);
        }

        yield db.commit(connection);

        return deleteResult;
    });
}

export { create, list, detail, modify, remove };