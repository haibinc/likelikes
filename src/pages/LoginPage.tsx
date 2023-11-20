import React from 'react';
import {useState} from 'react';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [statusMessage, setStatusMessage] = useState('');

    let login = {
        email: email,
        password: password,
        salt: '1234'
    }

    const submitForm = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        const baseUrl = 'http://localhost:3001';
        try{
            const res = await fetch(`${baseUrl}/submitLogin`, {
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

            }
            else if(!res.ok)
            {
                const errorCode = await res.text();
                console.log(errorCode);
                if(errorCode === 'This email already exists.') {
                    setStatusMessage(errorCode);
                }
                else if(errorCode === 'Email/password is too long') {
                    setStatusMessage(errorCode);
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

                <button style={{marginTop:'3rem'}} onClick={submitForm} className="CustomButton1">Log In</button>
            </form>
        </div>
    );
}

export default LoginPage;
