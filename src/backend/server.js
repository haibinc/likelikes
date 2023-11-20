const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(bodyParser.text());
dotenv.config();

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.REACT_APP_MYSQL_PASSWORD,
    database: 'DATABASE',
})

app.post('/submitLogin', async(req, res) => {

    const sqlInsert = "INSERT INTO login (username, password, userid, salt) VALUES (?, ?, 'sup', ?)";
    const values = [req.body.email, req.body.password, req.body.salt]
    db.query(sqlInsert, values, (err,result) => {
        if(!err){
            return res.status(200).send('Insertion Successful');
        } else{
            if(err.code === 'ER_DUP_ENTRY')
            {
                return res.status(400).send('This email already exists.');
            }
            else if(err.code === 'ER_DATA_TOO_LONG'){
                return res.status(400).send('Email/password is too long');
            }
        }
    })
})

const PORT = Number.parseInt(process.env.PORT) || 3001;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});