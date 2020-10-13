import mysql  from 'mysql';
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.host);

const DB = mysql.createConnection({
    host:process.env.host,
    user:process.env.user,
    password:process.env.password,
    database:process.env.dbname,
})

export default DB;

