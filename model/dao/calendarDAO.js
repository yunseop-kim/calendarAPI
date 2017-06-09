import * as db from '../util/db';
import co from 'co';

function create (token, values) {
    return co(function* () {
        let userIdx = yield db.query('select users_idx from access_token where token=?', [token]);
        values = Object.assign(values, userIdx[0]);
        let result = yield db.query('insert into schedules set ?', values);

        return result;
    });
}

function daily (idx){
    return co(function* () {
        let sql = `
        select idx, title, start_date, end_date
        from schedules 
        where idx=?
        `;
        let values = [idx];
        let result = yield db.query(sql, values);

        return result;
    });
}

function monthly (token, query) {
    let sql;
    let values;
    return co(function* () {
        if (query) {
            sql = `
            select idx, title, start_date, end_date
            from schedules 
            where users_idx = (select users_idx 
                                from access_token 
                                where token=?)
                and (start_date <= ? and end_date >= ?)
            order by start_date asc;
            `;
            values = [token, query, query];
        }
        else {
            sql = `
            select idx, title, start_date, end_date
            from schedules 
            where users_idx = (select users_idx 
                                from access_token 
                                where token=?)
            order by start_date asc;
            `
            values = [token];
        }
        let schedules = yield db.query(sql, values);
        
        return schedules;
    });
}

export { create, daily, monthly };