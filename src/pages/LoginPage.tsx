import React, {ChangeEvent} from 'react';
import {useReducer} from 'react';
import {userPassForms, changeForm} from '../types/form';

function LoginPage() {
    let loginForm:userPassForms = {
        email: '',
        password: '',
        salt: '',
        emailMessage:'',
        passwordMessage:'',
        successMessage:'',
    }

    const [state, dispatch] = useReducer(changeForm, loginForm);

    const handleChange = (props: ChangeEvent<HTMLInputElement>) => {
        dispatch({type:'SET_FIELD', field:props.target.name, value:props.target.value});
    }

    const submitForm = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        const baseUrl = 'https://likelikes-867512b88371.herokuapp.com';
        try{
            const res = await fetch(`${baseUrl}/submitLogin`, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(state),
                    headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(res.ok)
            {
                const {token, userId} = await res.json();
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
                dispatch({type:'SET_FIELD', field:'emailMessage', value:''});
                dispatch({type:'SET_FIELD', field:'passwordMessage', value:''});
                dispatch({type:'SET_FIELD', field:'successMessage', value:'Successful Login'});
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            else if(!res.ok)
            {
                const errorCode = await res.text();
                console.log("Error code: " + errorCode);
                if(errorCode === 'Not a valid email address.')
                {
                    dispatch({type:'SET_FIELD', field:'emailMessage', value:errorCode});
                    dispatch({type:'SET_FIELD', field:'passwordMessage', value:''});
                    dispatch({type:'SET_FIELD', field:'successMessage', value:''});
                }
                else if(errorCode === 'Password incorrect')
                {
                    dispatch({type:'SET_FIELD', field:'emailMessage', value:''});
                    dispatch({type:'SET_FIELD', field:'passwordMessage', value:errorCode});
                    dispatch({type:'SET_FIELD', field:'successMessage', value:''});
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
                <h1> Welcome to Likelikes</h1>
                <label htmlFor='Email'> <b>Email</b> </label>
                <input onChange={handleChange} type='email' placeholder='Enter Email' name="email" required={true}/>
                <h3 style={{display: (state.emailMessage !== '')? 'inline' : 'none', fontSize: '0.5rem',
                    color:'red', textAlign: 'left', marginLeft:'0.5rem',
                }}> {state.emailMessage} </h3>

                <label> <b>Password</b></label>
                <input onChange={handleChange} type='password' placeholder='Enter Password' name="password" required={true}/>
                <h3 style={{display: (state.passwordMessage !== '')? 'inline' : 'none', fontSize: '0.5rem',
                    color:'red', textAlign: 'left', marginLeft:'0.5rem',
                }}> {state.passwordMessage} </h3>
                <h3 style={{display: (state.successMessage !== '')? 'inline' : 'none', fontSize: '0.95rem',
                    color:'darkblue', textAlign: 'left', marginLeft:'0.5rem',
                }}> {state.successMessage} </h3>
                <button style={{marginTop:'3rem', alignSelf:'center'}} onClick={submitForm} className="CustomButton1">Log In</button>
            </form>
        </div>
    );
}

export default LoginPage;
