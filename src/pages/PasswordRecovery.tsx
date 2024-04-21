import React, {useState, ChangeEvent} from 'react';
import {ChangeWeb} from "../Components/ChangeWeb";

function PasswordRecovery() {
    const redirect = ChangeWeb();
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async(event: React.SyntheticEvent) => {
        event.preventDefault();
        const baseUrl = 'https://13.52.214.140';
        // const baseUrl = 'http://localhost:8080';
        try{
            const res = await fetch(`${baseUrl}/passwordRecovery`, {
                method: 'POST',
                mode: 'cors',
                body: email,
                headers: {
                    'Content-Type': 'text/plain',
                },
            })
            if(res.ok){
                setMessage('WIP');
                console.log('password recovered');
            }
            else if(!res.ok){
                const error = await res.text();
                setMessage('Not a valid email address.')
                console.log(error);
            }
        }
        catch(error)
        {
            console.error("Error" ,  error);
        }
    }

    const handleChange = (prop: ChangeEvent<HTMLInputElement>) =>
    {
        setEmail(prop.target.value);
    }

    return (
        <div>
            <div style={{position:'absolute', marginLeft:'1.5rem'}}>
                <button className="CustomButton1" onClick={() => redirect('/home')}>Likelikes</button>
            </div>
            <div className="CenterContainer" style={{marginTop: '2rem'}}>
                <form className="FormContainer">
                    <h1> Reset Password</h1>
                    <text> Enter your email:</text>
                    <input onChange={handleChange} className="Form" type='email' name='email' placeholder="Enter email..." required={true}/>
                    <h3 style={{display: (message !== '')? 'inline' : 'none', fontSize: '0.95rem',
                        color:'red', textAlign: 'left', marginLeft:'0.5rem',
                    }}> {message} </h3>
                    <button onClick={handleSubmit} className="CustomButton1" style={{marginTop: '3rem', alignSelf: 'center'}}>RECOVER</button>
                </form>
            </div>
        </div>
    );
}

export default PasswordRecovery;