import React from 'react';
import {ChangeWeb} from "../Components/ChangeWeb";

function LoginPage() {
    const redirect = ChangeWeb();
    return (
        <div>
            <button onClick={()=>redirect('/home')}>LOGIN</button>
        </div>
    );
}

export default LoginPage;
