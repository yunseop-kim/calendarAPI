import * as db from '../util/db';
import co from 'co';

function create(template, token) {
    return co(function* () {
        let connection = yield db.transaction();
        let userInfo = yield db.transactionQuery(connection, 'select users_idx from access_token where token=?', [token]);
        let userIdx = userInfo[0].users_idx;
        template = Object.assign(template, userInfo[0]);
        let result = yield db.transactionQuery(connection, 'insert into groups set ?', template);
        let groupIdx = result.insertId;
        let result2 = yield db.transactionQuery(connection, 'insert into groups_has_users set groups_idx=?, users_idx=?, selected=1', [groupIdx, userIdx]);
        yield db.commit(connection);

        return result2;
    });
}

function daily(date, token) {
    return co(function* () {
        let sql = `
        select idx, title, start_date, end_date
            from schedules 
            where users_idx = (select users_idx 
                                from access_token 
                                where token=?)
                and (start_date <= ? and end_date >= ?)
            order by start_date asc;
        `;
        let values = [token, date, date];
        let result = yield db.query(sql, values);

        return result;
    });
}

function detail(idx, token) {
    return co(function* () {
        let sql = `
        select idx, title, start_date, end_date
            from schedules 
            where users_idx = (select users_idx 
                                from access_token 
                                where token=?)
                and idx = ?
        `;
        let values = [token, idx];
        let result = yield db.query(sql, values);

        return result;
    });
}

function modify(idx, template, token) {
    let { title, start_date, end_date } = template;

    return co(function* () {
        let sql = `
        UPDATE schedules 
        SET title=?, start_date=?, end_date=? 
        where idx=? 
        and users_idx=(select users_idx 
                        from access_token 
                        where token=?)
        `;
        let values = [title, start_date, end_date, idx, token];
        let result = yield db.query(sql, values);

        return result;
    });
}

function remove(idx, token) {
    return co(function* () {
        let sql = `
        DELETE FROM schedules 
        where idx=? 
        and users_idx=(select users_idx 
                        from access_token 
                        where token=?)
        `;
        let values = [idx, token];
        let result = yield db.query(sql, values);

        return result;
    });
}

export { create, daily, detail, modify, remove };