import * as db from '../util/db';
import * as crypto from 'crypto';
import co from 'co';
import { ERROR } from '../../routes/util/error';

const HEX = 'HEX';
const SHA256 = 'sha256';
const TOKEN_SIZE = 32;


function create(email, password) {
    let sql = "select * from users where email=?";
    let values = [email];
    let userInfo = db.query(sql, values);
    

    return co(function* () {
        let userInfo = yield db.query(sql, values);
        yield checkPassword(userInfo, password);
        yield createToken(userInfo);
        let result = yield getToken(userInfo[0].idx);

        return result;
    });
}

function checkPassword(userInfo, password) {
    return new Promise((resolve, reject) => {
        if (userInfo.length < 1) {
            reject(ERROR.RESOURCE_NOT_FOUND);
        }

        let admin = userInfo[0];
        let hash = generateHash(password);
        if (hash != admin.password) {
            reject(ERROR.INVALID_INPUT);
        }

        resolve(true);
    });
}

function createToken(userInfo) {
    let sql = 'INSERT INTO access_token SET ?';
    let values = {
        token: generateToken(),
        created: new Date(),
        expired: getDefaultTokenExpireTime(),
        users_idx: userInfo[0].idx
    }

    return db.query(sql, values);
}

function getToken(userIdx) {
    let sql = "select token from access_token where users_idx=? limit 1"
    let values = [userIdx];

    return db.query(sql, values);
}

function generateHash(value) {
    let result = crypto.createHash(SHA256).update(value).digest(HEX);
    return result;
}

function generateToken() {
    let salt = crypto.randomBytes(TOKEN_SIZE).toString(HEX);
    return salt;
}

function getDefaultTokenExpireTime() {
    let time = new Date();
    let duration = Number(30);  // minutes
    time.setMinutes(time.getMinutes() + duration);
    return time;
}

export { create };