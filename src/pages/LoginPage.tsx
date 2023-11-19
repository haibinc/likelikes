import React from 'react';

function LoginPage() {

    return (
        <div className="CenterContainer">
            <form className="FormContainer">
                <h1> Welcome to Pinterest</h1>
                <label htmlFor='Email'> <b>Email</b> </label>
                <input type='email' placeholder='Enter Email' name="Email"/>

                <label> <b>Password</b></label>
                <input type='password' placeholder='Enter Password' name="Password"/>
            </form>
        </div>
    );
}

export default LoginPage;
