const express = require('express');
const multer = require('multer');
const app = express();
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {S3Client, PutObjectCommand, GetObjectCommand} = require('@aws-sdk/client-s3');
const {getSignedUrl} = require('@aws-sdk/s3-request-presigner');
const saltRounds = 11;
let secretKey = '';
const validator = require('validator');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});
const fs = require('fs');
const file = fs.readFileSync('twitterclone/BC3C2121F021FF610960E2DCA9A1A16F.txt')
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: true}));
app.use(bodyParser.text());
dotenv.config();

app.get('/.well-known/pki-validation/BC3C2121F021FF610960E2DCA9A1A16F.txt', (req, res) => {
    res.sendFile('/Users/haibin/WebstormProjects/twitterclone1/twitterclone/BC3C2121F021FF610960E2DCA9A1A16F.txt');
})
//
// const s3 = new S3Client({
//     credentials:{
//         accessKeyId: 'AKIA6KZJMKD2P7KBNHOC',
//         secretAccessKey: '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',
//     },
//     region: 'us-west-1'
// });
//
// const isValidPassword = (password) => {
//     const hasMinLength = password.length >= 8;
//     const hasMaxLength = password.length <= 20;
//     // Should include at least one uppercase letter
//     const hasUpperCase = /[A-Z]/.test(password);
//
//     // Should include at least one lowercase letter
//     const hasLowerCase = /[a-z]/.test(password);
//
//     // Should include at least one digit
//     const hasDigit = /\d/.test(password);
//
//     // Return true if all criteria are met
//     return hasMinLength && hasMaxLength && hasUpperCase && hasLowerCase && hasDigit;
// }
//
// const isValidEmail = (email) => {
//     return validator.isEmail(email);
// }
//
// const hashPassword = async (password) => {
//     try {
//         const salt = await bcrypt.genSalt(saltRounds);
//         const hashedPassword = await bcrypt.hash(password, salt);
//         return {hashedPassword, salt};
//     } catch (error) {
//         console.error('error', error);
//     }
// }
//
// const generateJWTSecret = () => {
//     const secretLength = 64;
//     return crypto.randomBytes(secretLength).toString('hex');
// }
//
// const generateImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex');
//
// secretKey = generateJWTSecret();
//
// const checkHashedPassword = async (inputPassword, hashedPassword) => {
//     try {
//         const isMatch = await bcrypt.compare(inputPassword, hashedPassword);
//         return isMatch;
//     } catch (error) {
//         console.error('Error comparing passwords:', error);
//         throw error; // Handle the error as needed in your application
//     }
// }
//
// const dbLogin = mysql.createPool({
//     host: 'tutorial-db-instance.cdi7glvucsme.us-west-1.rds.amazonaws.com',
//     user: 'root',
//     port: '3306',
//     password: '!Damkies33',
//     database: 'DATABASE',
//     connectionLimit: '10',
// })
//
// const dbImages = mysql.createPool({
//     host: 'tutorial-db-instance.cdi7glvucsme.us-west-1.rds.amazonaws.com',
//     user: 'root',
//     port: '3306',
//     password: '!Damkies33',
//     database: 'IMAGEDATA',
//     connectionLimit: '10',
// })
//
// app.post('/submitSignup', async (req, res) => {
//     try {
//         if (!isValidEmail(req.body.email)) {
//             return res.status(400).send('Not a valid email address.');
//         } else if (!isValidPassword(req.body.password)) {
//             return res.status(400).send('Passwords must be at least 8-20 characters and must contain one lowercase letter, one uppercase letter, and one number.');
//         }
//         const hashedPasswordSalt = await hashPassword(req.body.password);
//         req.body.password = hashedPasswordSalt.hashedPassword;
//         req.body.salt = hashedPasswordSalt.salt;
//
//         const sqlInsert = "INSERT INTO login (username, password, salt) VALUES (?, ?, ?)";
//         const values = [req.body.email, req.body.password, req.body.salt];
//         const [row, fields] = await dbLogin.execute(sqlInsert, values);
//         return res.status(200).send('Insertion Successful');
//     } catch (err) {
//         if (err.code === 'ER_DUP_ENTRY') {
//             return res.status(400).send('This email already exists.');
//         } else if (err.code === 'ER_DATA_TOO_LONG') {
//             return res.status(400).send('Email is too long');
//         }
//         console.error('Error:', err);
//         return res.status(500).send('Internal Server Error');
//     }
// })
//
// app.post('/submitLogin', async (req, res) => {
//     try {
//         if (!isValidEmail(req.body.email)) {
//             return res.status(400).send('Not a valid email address.');
//         } else if (!isValidPassword(req.body.password)) {
//             return res.status(400).send('Passwords must be at least 8-20 characters and must contain one lowercase letter, one uppercase letter, and one number.');
//         }
//         const sqlSelect = "SELECT * FROM login WHERE username = ?";
//         const [rows, fields] = await dbLogin.execute(sqlSelect, [req.body.email]);
//         if (rows.length > 0) {
//             const checkPass = await checkHashedPassword(req.body.password, rows[0].password);
//             if (checkPass) {
//                 const token = jwt.sign({userId: rows[0].userid, email: rows[0].username}, secretKey, {expiresIn: '1h'});
//                 return res.status(200).json({token, userId: rows[0].userid});
//             } else if (!checkPass) {
//                 return res.status(400).send('Password incorrect');
//             }
//         } else {
//             return res.status(400).send('Email not found');
//         }
//     } catch (err) {
//         console.error('Error:', err);
//         return res.status(500).send('Internal Server Error');
//     }
// })
//
// const validateToken = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         console.log('first');
//         return res.status(401).json({message: 'Unauthorized - Missing token'});
//     }
//     try {
//         const decoded = jwt.verify(token, secretKey);
//         next();
//     } catch (error) {
//         return res.status(401).json({message: 'Unauthorized - Invalid token'});
//     }
// };
//
// app.get('/checkToken', validateToken, (req, res) => {
//     res.status(200).json({message: 'Auth Sucess'});
// });
//
// app.post('/submitPicture', upload.single('image'),async (req, res) => {
//     try{
//         const imageName = generateImageName();
//         const params = {
//             Bucket: 'likelikes',
//             Key: imageName,
//             Body: req.file.buffer,
//             ContentType: req.file.mimetype,
//         }
//         const command = new PutObjectCommand(params)
//         await s3.send(command);
//         const sqlInsert = "INSERT into imagedatas (picTitle, picDescription, imageName, created) VALUES (?,?,?,CURRENT_TIMESTAMP)";
//         const values = [req.body.picTitle, req.body.picDescription, imageName];
//         const [rows, fields] = await dbImages.execute(sqlInsert, values);
//         return res.status(200).send('Submission Success');
//     }catch(err){
//         console.error(err);
//     }
// })
//
// app.get('/getImagePosts', async(req,res) => {
//     try{
//         const [rows] = await dbImages.execute('SELECT * FROM imagedatas ORDER BY created DESC');
//
//         if(rows){
//             for(let post of rows){
//                 const params = {
//                     Bucket: likelikes,
//                     Key: post.imageName,
//                 }
//                 const command = new GetObjectCommand(params);
//                 const url = await getSignedUrl(s3, command, {expiredIn: 3600});
//                 post.imageUrl = url;
//             }
//             res.send(rows);
//         }
//     }catch(err)
//     {
//         console.error('error getting image posts: ', err)
//     }
//
// })

app.get("/", async (req, res) => {
    try {
        console.log('can you at least console log something')
        res.send('please bro just work please man');
    } catch (error) {
        res.send(error)
    }
})

const PORT = Number.parseInt(process.env.PORT) || 8080;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});