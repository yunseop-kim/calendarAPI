import * as db from '../util/db';
import * as crypto from 'crypto';
import co from 'co';

const HEX = 'HEX';
const SHA256 = 'sha256';
const TOKEN_SIZE = 32;

class loginDAO {
    constructor(req, res, next) {
        this.req = req;
        this.res = res;
        this.next = next;
    }

    create(email, password) {
        let sql = "select * from users where email=?";
        let values = [email];
        let userInfo = db.query(sql, values);
        let self = this;

        co(function* () {
            let userInfo = yield db.query(sql, values);
            yield self.checkPassword(userInfo, password);
            yield self.createToken(userInfo);
            let tokenObj = yield self.getToken(userInfo.idx);

            return tokenObj.token;
        }).then((token) => {
            self.res.set('Access-Token', token);
            self.res.status(201).end();
        }, (err) => {
            console.error(err);
        });
    }

    checkPassword(userInfo, password) {
        return new Promise((resolve, reject) => {
            if (userInfo.length < 1) {
                reject('User not found.');
            }

            let admin = userInfo[0];
            let hash = this.generateHash(password);
            if (hash != admin.password) {
                reject('Invalid parameter.');
            }

            resolve(true);
        });
    }

    createToken(userInfo) {
        let self = this;
        let sql = 'INSERT INTO access_token SET ?';
        let values = {
            token: self.generateToken(),
            created: new Date(),
            expired: self.getDefaultTokenExpireTime(),
            users_idx: userInfo[0].idx
        }

        return db.query(sql, values);
    }

    getToken(userIdx) {
        let self = this;
        let sql = "select token from access_token where users_idx=? limit 1"
        let values = [userIdx];

        return db.query(sql, values);
    }

    generateHash(value) {
        let result = crypto.createHash(SHA256).update(value).digest(HEX);
        return result;
    }

    generateToken() {
        let salt = crypto.randomBytes(TOKEN_SIZE).toString(HEX);
        return salt;
    }

    getDefaultTokenExpireTime() {
        let time = new Date();
        let duration = Number(30);  // min
        time.setMinutes(time.getMinutes() + duration);
        return time;
    }

}

export default loginDAO;