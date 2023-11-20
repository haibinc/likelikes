import React from 'react';
import {useState} from 'react';
import LoginPage from './LoginPage';

function Home() {

    const [showForm, setShowForm] = useState(false);

    const displayLogin = () =>
    {
        setShowForm((prev) => !prev);
    }

    return (
        <div>
            <div style={{display:'flex', justifyContent:'flex-end', marginRight:'10rem', marginTop:'1rem'}}>
                <button className="CustomButton1" onClick={displayLogin}> Log in </button>
            </div>
            <div style={{display: showForm? 'block' : 'none'}}>
                <LoginPage/>
            </div>
        </div>
    );
}

export default Home;