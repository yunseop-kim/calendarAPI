import * as db from '../util/db';
import co from 'co';

function create(template, token) {
    return co(function* () {
        let { title, startDate, endDate, groupName } = template;
        let userIdx = yield db.query('select users_idx from access_token where token=?', [token]);
        userIdx = userIdx[0].users_idx;
        let groupIdx = yield db.query('select idx from groups where name=?', [groupName]);
        groupIdx = groupIdx.length > 0 ? groupIdx[0].idx : null;

        let result = yield db.query('insert into schedules (title, start_date, end_date, users_idx, groups_idx) VALUES (?, ?, ?, ?, ?)', [title, startDate, endDate, userIdx, groupIdx]);
        
        if(!(result.affectedRows > 0 )){
            yield Promise.reject('Cannot Create schedule!');
        }

        return result;
    });
}

function daily(date, token) {
    return co(function* () {
        let sql = `
        select *
        from (select s.idx, s.title, s.start_date, s.end_date, s.groups_idx, g.selected
                from schedules s
                left outer join groups_has_users g
                on s.groups_idx = g.groups_idx
                where s.users_idx = (select users_idx 
                                    from access_token 
                                    where token=?)
        and (start_date <= ? and end_date >= ?)) custom
        where (selected is null or selected=1)
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
        SELECT s.*, g.name as group_name
        FROM schedules s
        LEFT OUTER JOIN groups g
        ON g.idx = s.groups_idx
        WHERE s.users_idx = (SELECT users_idx 
                            FROM access_token 
                            WHERE token=?)
        AND s.idx = ?
        `;
        let values = [token, idx];
        let result = yield db.query(sql, values);

        if(!(result.length > 0)){
            yield Promise.reject('Not found');
        }

        return result;
    });
}

function find(search, token) {
    return co(function* () {
        let sql = `
        SELECT * 
        FROM schedules 
        WHERE users_idx = (SELECT users_idx 
                            FROM access_token 
                            WHERE token=?)
        AND title like '%${search}%'
        `;
        let values = [token, search];
        let result = yield db.query(sql, values);

        return result;
    });
}

// todo: groupName update
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

        if (!(result.affectedRows > 0)) {
            yield Promise.reject('Cannot modify this contents.');
        }

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

        if (!(result.affectedRows > 0)) {
            yield Promise.reject('Cannot delete this contents.');
        }

        return result;
    });
}

export { create, daily, detail, modify, remove, find };