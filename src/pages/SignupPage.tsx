import React from 'react';
import {useState} from 'react';

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [salt, setSalt] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');

    let login = {
        email: email,
        password: password,
        salt: salt,
    }

    const submitForm = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        const baseUrl = 'http://localhost:3001';
        try{
            const res = await fetch(`${baseUrl}/submitSignup`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(login),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(res.ok)
            {
                console.log('insertion successful');
                setStatusMessage('');
                setPasswordMessage('');
            }
            else if(!res.ok)
            {
                const errorCode = await res.text();
                console.log(errorCode);
                if(errorCode === 'This email already exists.') {
                    setStatusMessage(errorCode);
                    setPasswordMessage('');
                }
                else if(errorCode === 'Email/password is too long') {
                    setStatusMessage(errorCode);
                    setPasswordMessage('');
                }
                else if(errorCode === 'Not a valid email address.') {
                    setStatusMessage(errorCode);
                    setPasswordMessage('');
                }
                else if(errorCode === 'Passwords must be at least 6 characters and must contain one lowercase letter, one uppercase letter, and one number.'){
                    setPasswordMessage(errorCode);
                }

            }
        }
        catch(error){
            console.error('Error: ', error);
        }
    }

    return (
        <div className="CenterContainer">
            <form method="POST" className="FormContainer">
                <h1> Welcome to Pinterest</h1>
                <label htmlFor='Email'> <b>Email</b> </label>
                <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter Email' name="Email" required={true}/>
                <h3 style={{display: (statusMessage !== '')? 'inline' : 'none', fontSize: '0.5rem',
                    color:'red', textAlign: 'left', marginLeft:'0.5rem',
                }}> {statusMessage} </h3>

                <label> <b>Password</b></label>
                <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Password' name="Password" required={true}/>
                <h3 style={{display: (passwordMessage !== '')? 'inline' : 'none', fontSize: '0.5rem',
                    color:'red', textAlign: 'left', marginLeft:'0.5rem',
                }}> {passwordMessage} </h3>
                <button style={{marginTop:'3rem', alignSelf:'center'}} onClick={submitForm} className="CustomButton1">Sign up</button>
            </form>
        </div>
    );
}

export default SignupPage;
