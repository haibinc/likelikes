import React, {useState, ChangeEvent} from 'react';
import {ChangeWeb} from "../Components/ChangeWeb";

function PasswordRecovery() {
    const redirect = ChangeWeb();
    const [email, setEmail] = useState('')

    const handleSubmit = async(event: React.SyntheticEvent) => {
        event.preventDefault();
        const baseUrl = 'https://13.52.214.140';
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
                console.log('password recovered');
            }
            else{
                const error = await res.text();
                console.log(error);
                console.log('ERROR PASSWORD NOT RECOVERED');
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
                    <button onClick={handleSubmit} className="CustomButton1" style={{marginTop: '3rem', alignSelf: 'center'}}>RECOVER</button>
                </form>
            </div>
        </div>
    );
}

export default PasswordRecovery;