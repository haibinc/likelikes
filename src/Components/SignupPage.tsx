import React, {ChangeEvent} from 'react';
import {useReducer} from 'react';
import {userPassForms, changeForm} from '../types/form';

interface SignupPageProps {
    closeSignup: () => void;
    openLogin: () => void;
}

function SignupPage({closeSignup, openLogin} : SignupPageProps) {
    let signupForm:userPassForms = {
        email: '',
        password: '',
        salt: '',
        emailMessage:'',
        passwordMessage:'',
        successMessage:''
    }

    const [state, dispatch] = useReducer(changeForm, signupForm);

    const handleChange = (props: ChangeEvent<HTMLInputElement>) => {
        dispatch({type:'SET_FIELD', field:props.target.name, value:props.target.value});
    }

    const submitForm = async(e: React.SyntheticEvent) => {
        e.preventDefault();
        const baseUrl = 'https://13.52.214.140';
        try{
            const res = await fetch(`${baseUrl}/submitSignup`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(state),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if(res.ok)
            {
                console.log('signup success');
                dispatch({type:'SET_FIELD', field:'emailMessage', value:''});
                dispatch({type:'SET_FIELD', field:'passwordMessage', value:''});
                dispatch({type:'SET_FIELD', field:'successMessage', value:'Successful Signup'});
                setTimeout(() => {
                    openLogin();
                }, 1000);
            }
            else if(!res.ok)
            {
                const errorCode = await res.text();
                console.log(errorCode);
                if(errorCode === 'This email already exists.') {
                    dispatch({type:'SET_FIELD', field:'emailMessage', value:errorCode});
                    dispatch({type:'SET_FIELD', field:'passwordMessage', value:''});
                    dispatch({type:'SET_FIELD', field:'successMessage', value:''});
                }
                else if(errorCode === 'Email/password is too long') {
                    dispatch({type:'SET_FIELD', field:'emailMessage', value:errorCode});
                    dispatch({type:'SET_FIELD', field:'passwordMessage', value:''});
                    dispatch({type:'SET_FIELD', field:'successMessage', value:''});
                }
                else if(errorCode === 'Not a valid email address.') {
                    dispatch({type:'SET_FIELD', field:'emailMessage', value:errorCode});
                    dispatch({type:'SET_FIELD', field:'passwordMessage', value:''});
                    dispatch({type:'SET_FIELD', field:'successMessage', value:''});
                }
                else if(errorCode === 'Passwords must be at least 8-20 characters and must contain one lowercase letter, one uppercase letter, and one number.'){
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

    const handleSignupClose = () => {
        closeSignup();
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
        if (e.key === 'Enter') {
            submitForm(e);
        }
    };

    return (
        <div className="CenterContainer">
            <form method="POST" className="FormContainer" onKeyDown={handleKeyDown}>
                <h1> Signup to Likelikes</h1>
                <button style={{position: 'absolute', backgroundColor:'white', border:'.0',
                    color:'blue', marginTop:'.5rem',
                    marginLeft:'19.5rem', fontSize:'1.5rem'}} onClick={handleSignupClose}> x </button>
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
                <button style={{marginTop:'3rem', alignSelf:'center'}} onClick={submitForm} className="CustomButton1">Sign up</button>
            </form>
        </div>
    );
}

export default SignupPage;
