import React from 'react';
import {useState} from 'react';
import LoginPage from './LoginPage';
import SignupPage from "./SignupPage";

function Home() {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setSignup] = useState(false);

    const displayLogin = () =>
    {
        if(showSignup)
        {
            setSignup((prev) => !prev);
        }
        setShowLogin((prev) => !prev);
    }

    const displaySignup = () =>
    {
        if(showLogin)
        {
            setShowLogin((prev) => !prev);
        }
        setSignup((prev) => !prev);
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'flex-end', marginRight:'10rem', marginTop:'1rem'}}>
                <button className="CustomButton1" onClick={displayLogin}> Log in </button>
                <button className="CustomButton1" onClick={displaySignup} style={{backgroundColor:'gray', minWidth:'4.5rem'}}> Sign up </button>
            </div>
            <div style={{display: showLogin? 'block' : 'none'}}>
                <LoginPage/>
            </div>
            <div style={{display: showSignup? 'block' : 'none'}}>
                <SignupPage/>
            </div>
        </div>
    );
}

export default Home;