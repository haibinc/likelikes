const express = require('express');
const app = express();
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 11;
const validator = require('validator');

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(bodyParser.text());
dotenv.config();

const isValidPassword = (password) => {
    const hasMinLength = password.length >= 8;
    const hasMaxLength = password.length <= 20;
    // Should include at least one uppercase letter
    const hasUpperCase = /[A-Z]/.test(password);

    // Should include at least one lowercase letter
    const hasLowerCase = /[a-z]/.test(password);

    // Should include at least one digit
    const hasDigit = /\d/.test(password);

    // Return true if all criteria are met
    return hasMinLength && hasUpperCase && hasLowerCase && hasDigit;
}

const isValidEmail = (email) =>{
    return validator.isEmail(email);
}

const hashPassword = async(password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return {hashedPassword, salt};
    } catch (error) {
        console.error('error', error);
    }
}

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.REACT_APP_MYSQL_PASSWORD,
    database: 'DATABASE',
})

app.post('/submitSignup', async(req, res) => {
    if(!isValidEmail(req.body.email)){
        return res.status(400).send('Not a valid email address.');
    }
    else if(!isValidPassword(req.body.password)){
        return res.status(400).send('Passwords must be at least 8-20 characters and must contain one lowercase letter, one uppercase letter, and one number.');
    }
    const hashedPasswordSalt = await hashPassword(req.body.password);
    req.body.password = hashedPasswordSalt.hashedPassword;
    req.body.salt = hashedPasswordSalt.salt;

    const sqlInsert = "INSERT INTO login (username, password, salt) VALUES (?, ?, ?)";
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
                return res.status(400).send('Email is too long');
            }
        }
    })
})

app.post('/submitLogin', (req,res) => {
    res.send('sup');
})

const PORT = Number.parseInt(process.env.PORT) || 3001;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});