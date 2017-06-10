import * as db from '../util/db';
import co from 'co';

function create(template, token) {
    return co(function* () {
        let userIdx = yield db.query('select users_idx from access_token where token=?', [token]);
        template = Object.assign(template, userIdx[0]);
        let result = yield db.query('insert into schedules set ?', template);

        return result;
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