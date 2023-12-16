import React from 'react';
import {useState, useEffect} from 'react';
import LoginPage from './LoginPage';
import SignupPage from "./SignupPage";
import Authenticate from "../Components/Authenticate";
import {ChangeWeb} from "../Components/ChangeWeb";
import ImageBoard from "../Components/ImageBoard";
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
};

function Home() {
    const redirect = ChangeWeb();
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignup, setSignup] = useState(false);
    const [loading, setLoading] = useState(true);

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
            setLoading(false);
        };
        checkAuthentication();
    }, []);

    const handleLoginClose = () => {
        setShowLogin(prev => !prev);
    }

    const handleSignupClose = () => {
        setSignup(prev => !prev);
    }

    if (loading) {
        return <div>
        </div>
    }

    return (
        <div style={{backgroundColor: 'black', height:'100vh', width:'100vw', position:'absolute', overflow:'auto'}}>
            <div style={{display: isAuth ? 'none' : 'block'}}>
                <div style={{position: 'absolute', marginLeft: '1.5rem'}}>
                    <button className="CustomButton1" onClick={() => redirect('/home')}>Likelikes</button>
                </div>
                <div style={{display: 'flex', justifyContent: 'flex-end', marginRight: '10rem', marginTop: '1rem'}}>
                    <button className="CustomButton1" onClick={displayLogin}> Log in</button>
                    <button className="CustomButton1" onClick={displaySignup}
                            style={{backgroundColor: 'lightgray', minWidth: '4.5rem'}}> Sign up
                    </button>
                </div>
                <div style={{display: showLogin ? 'block' : 'none'}}>
                    <LoginPage closeLogin={handleLoginClose}/>
                </div>
                <div style={{display: showSignup ? 'block' : 'none'}}>
                    <SignupPage closeSignup={handleSignupClose} openLogin={displayLogin}/>
                </div>
                <div style={{display: showLogin || showSignup ? 'none' : 'block', marginRight:'3rem'}}>
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="my-masonry-grid"
                        columnClassName="my-masonry-grid_column"
                    >
                        <img src="https://scion-social.com/wp-content/uploads/2016/07/gif-wallpaper-13.gif" alt="aniamtedgif"/>
                        <img src="https://qph.cf2.quoracdn.net/main-qimg-3a7273395f005dc08ee2b4f006b35613" />
                        <img src="https://i0.wp.com/66.media.tumblr.com/e1a2edf664e0193357a152f390292a8e/tumblr_nishpyDPLK1qhv2wyo1_500.gif?resize=549%2C732&ssl=1"/>
                        <img src="https://i0.wp.com/66.media.tumblr.com/80f4eb5f327b21e92815ef4690628491/tumblr_nigusqZx1Y1qhv2wyo1_r1_500.gif?resize=549%2C659&ssl=1"/>
                        <img src="https://i.pinimg.com/originals/7b/90/5c/7b905cf64bc28814451d91624b651745.gif"/>
                        <img src="https://www.altushost.com/wp-content/uploads/2016/02/tumblr_n0iatyY57p1rpbikxo1_500.gif"/>
                        <img src="https://steamuserimages-a.akamaihd.net/ugc/97230938372796271/55E6E36D887714CE7C8BD17BAF2BB745401E89BB/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false"/>
                        <img src="https://i.pinimg.com/originals/62/9a/af/629aaf3e2c11c0b96655ece18013e568.gif"/>
                        <img src="https://cdn.shopify.com/s/files/1/0633/5417/5743/files/tumblr_37a43647174cf99f19833b8b4f893ac3_be0d5f30_540_480x480.gif?v=1687525312"/>
                        <img src="https://media.tenor.com/xMQiT3Xb3CEAAAAC/2099-spider-man-2099.gif"/>
                        <img src="https://media4.giphy.com/media/1qErVv5GVUac8uqBJU/giphy.gif"/>
                    </Masonry>
                </div>
            </div>
            <div style={{display: isAuth ? 'block' : 'none'}}>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <button
                        style={{marginTop: '1.75rem', height: '2rem', alignSelf: 'start', position: 'fixed', left: '1rem', backgroundColor: 'peru'}}
                        onClick={() => redirect('/home')}
                        className="CustomButton1">Home
                    </button>
                    <button className="CustomButton1" onClick={() => redirect('/create')}
                            style={{backgroundColor: 'sienna', minWidth: '4.5rem', marginTop: '1.75rem', marginRight: '30vw', height: '2rem'}}>
                        CREATE
                    </button>
                    <h1 style={{marginRight: '35vw'}}> WELCOME </h1>
                    <button className="CustomButton1" onClick={signOut}
                            style={{backgroundColor: 'mediumaquamarine', minWidth: '4.5rem', marginTop: '1.75rem', marginRight: '2rem', height: '2rem'}}> Sign
                        Out
                    </button>
                </div>
                <div>
                    <ImageBoard></ImageBoard>
                </div>
            </div>
        </div>
    );
}

export default Home;