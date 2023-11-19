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
            <button className="LoginButton" onMouseEnter={(e) => (e.target as HTMLButtonElement).style.cursor = 'pointer'} onClick={displayLogin}> Log in </button>
            <div style={{display: showForm? 'block' : 'none'}}>
                <LoginPage/>
            </div>
        </div>
    );
}

export default Home;