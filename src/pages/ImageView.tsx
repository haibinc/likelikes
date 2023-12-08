import React, {useState, useEffect} from 'react';
import {ChangeWeb} from '../Components/ChangeWeb';
import Authenticate from '../Components/Authenticate';
import {useParams} from 'react-router-dom';

function ImageView() {
    const redirect = ChangeWeb();
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const imageName = useParams();

    const getPictureData = async() => {
        const baseUrl = 'https://13.52.214.140';
        try{
            const res = await fetch(`${baseUrl}/getImageData`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify(imageName),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if(res.ok){
                const image = await res.text();
                console.log(image);
            }
            else if(!res.ok){
                const errorCode = await res.text();
                console.log(errorCode);
            }
        }
        catch(error){
            console.error("Error: ", error);
        }
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            const result = await Authenticate();
            setIsAuth(result);
            getPictureData();
            setLoading(false);
            };
        checkAuthentication();
    }, []);

    if(loading){
        return <div></div>
    }

    return (
        <div>
            <div>
                <button style={{marginTop:'1.75rem', height:'2rem', alignSelf: 'start', position:'fixed', left:'1rem', backgroundColor: 'peru'}} onClick={() => redirect('/home')}
                        className="CustomButton1">Home
                </button>
            </div>
            <h1> SUPSUPSUP</h1>
        </div>
    );
}

export default ImageView;