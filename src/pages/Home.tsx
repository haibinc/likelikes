import React from 'react';
import {useState, useEffect} from 'react';
import LoginPage from './LoginPage';
import SignupPage from "./SignupPage";
import Authenticate from "../Components/Authenticate";
import {ChangeWeb} from "../Components/ChangeWeb";

function Home() {
    const redirect = ChangeWeb();
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setSignup] = useState(false);

    const displayLogin = () => {
        if (showSignup) {
            setSignup((prev) => !prev);
        }
        setShowLogin((prev) => !prev);
    }

    const displaySignup = () => {
        if (showLogin) {
            setShowLogin((prev) => !prev);
        }
        setSignup((prev) => !prev);
    }

    const signOut = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            const result = await Authenticate();
            setIsAuth(result);
        };
        checkAuthentication();
    }, []);

    return (
        <div>
            <div style={{display: isAuth ? 'none' : 'block'}}>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '10rem', marginTop: '1rem'}}>
                    <button className="CustomButton1" onClick={displayLogin}> Log in</button>
                    <button className="CustomButton1" onClick={displaySignup}
                            style={{backgroundColor: 'lightgray', minWidth: '4.5rem'}}> Sign up
                    </button>
                </div>
                <div style={{display: showLogin ? 'block' : 'none'}}>
                    <LoginPage/>
                </div>
                <div style={{display: showSignup ? 'block' : 'none'}}>
                    <SignupPage/>
                </div>
            </div>
            <div style={{display: isAuth ? 'block' : 'none'}}>
                <div style={{display: 'flex', justifyContent:'flex-end'}}>
                    <button style={{marginTop:'1.75rem', height:'2rem', alignSelf: 'start', position:'fixed', left:'1rem', backgroundColor: 'peru'}} onClick={() => redirect('/home')}
                            className="CustomButton1">Home
                    </button>
                    <button className="CustomButton1" onClick={()=> redirect('/create')} style={{backgroundColor: 'sienna', minWidth: '4.5rem', marginTop:'1.75rem', marginRight:'25vw', height:'2rem'}}>
                        CREATE
                    </button>
                    <h1 style={{marginRight:'35vw'}}> WELCOME </h1>
                    <button className="CustomButton1" onClick={signOut}
                            style={{backgroundColor: 'mediumaquamarine', minWidth: '4.5rem', marginTop:'1.75rem', marginRight:'2rem', height:'2rem'}}> Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;