const express = require('express');
const app = express();
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
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
    return hasMinLength &&hasMaxLength && hasUpperCase && hasLowerCase && hasDigit;
}

const isValidEmail = (email) => {
    return validator.isEmail(email);
}

const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return {hashedPassword, salt};
    } catch (error) {
        console.error('error', error);
    }
}

const generateJWTSecret = async() => {
    const secretLength = 64;
    return crypto.randomBytes(secretLength).toString('hex');
}

const checkHashedPassword = async(inputPassword, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
        return isMatch;
    } catch (error) {
        console.error('Error comparing passwords:', error);
        throw error; // Handle the error as needed in your application
    }
}

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: process.env.REACT_APP_MYSQL_PASSWORD,
    database: 'DATABASE',
    connectionLimit: 10,
})

app.post('/submitSignup', async (req, res) => {
    try {
        if (!isValidEmail(req.body.email)) {
            return res.status(400).send('Not a valid email address.');
        } else if (!isValidPassword(req.body.password)) {
            return res.status(400).send('Passwords must be at least 8-20 characters and must contain one lowercase letter, one uppercase letter, and one number.');
        }
        const hashedPasswordSalt = await hashPassword(req.body.password);
        req.body.password = hashedPasswordSalt.hashedPassword;
        req.body.salt = hashedPasswordSalt.salt;

        const sqlInsert = "INSERT INTO login (username, password, salt) VALUES (?, ?, ?)";
        const values = [req.body.email, req.body.password, req.body.salt];
        const [row, fields] = await db.execute(sqlInsert, values);
        return res.status(200).send('Insertion Successful');
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(400).send('This email already exists.');
        } else if (err.code === 'ER_DATA_TOO_LONG') {
            return res.status(400).send('Email is too long');
        }
        console.error('Error:', err);
        return res.status(500).send('Internal Server Error');
    }
})

app.post('/submitLogin', async (req, res) => {
    try{
        if (!isValidEmail(req.body.email)) {
            return res.status(400).send('Not a valid email address.');
        } else if (!isValidPassword(req.body.password)) {
            return res.status(400).send('Passwords must be at least 8-20 characters and must contain one lowercase letter, one uppercase letter, and one number.');
        }
        const sqlSelect = "SELECT * FROM login WHERE username = ?";
        const [rows, fields] = await db.execute(sqlSelect, [req.body.email]);
        if (rows.length > 0) {
            const checkPass = await checkHashedPassword(req.body.password, rows[0].password);
            if(checkPass)
            {
                const secretKey = await generateJWTSecret();
                const token = jwt.sign({ userId: rows[0].userid, email: rows[0].username}, secretKey, { expiresIn: '1h' });
                return res.status(200).json({token, userId: rows[0].userid});
            }
            else if(!checkPass)
            {
                return res.status(400).send('Password incorrect');
            }
        }
        else
        {
            return res.status(400).send('Email not found');
        }
    }
    catch(err){
        console.error('Error:', err);
        return res.status(500).send('Internal Server Error');
    }

})

const PORT = Number.parseInt(process.env.PORT) || 3001;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});