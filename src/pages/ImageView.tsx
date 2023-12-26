import React, {useState, useEffect} from 'react';
import {ChangeWeb} from '../Components/ChangeWeb';
import Authenticate from '../Components/Authenticate';
import {useParams} from 'react-router-dom';
import {pictureForm} from '../types/form';

function ImageView() {
    const redirect = ChangeWeb();
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [showDelete, setShowDelete] = useState(false);
    const [likeText, setLikeText] = useState('LIKE')
    const [image, setImage] = useState<pictureForm>();
    const picTitle = useParams();

    const deletePicture = async () => {
        const baseUrl = 'https://13.52.214.140';
        try {
            const res = await fetch(`${baseUrl}/deletePicture/${picTitle.imageName}`, {
                method: 'DELETE',
                mode: 'cors',
            });
            if (res.ok) {
                console.log('GOOD STUFF');
                redirect('/home')
            } else if (!res.ok) {
                console.log('BAD STUFF');
            }
        } catch (error) {
            console.error("ERROR: ", error);
        }
    }

    const getPictureData = async () => {
        const baseUrl = 'https://13.52.214.140';
        try {
            const res = await fetch(`${baseUrl}/getImageData/${picTitle.imageName}`, {
                method: 'GET',
                mode: 'cors',
            });
            if (res.ok) {
                const image = await res.json();
                setImage(image[0]);
            } else if (!res.ok) {
                const errorCode = await res.text();
                console.log(errorCode);
            }
        } catch (error) {
            console.error("Error: ", error);
        }
    }

    const checkId = () => {
        const id = localStorage.getItem('userId');
        if (String(id) === String(image?.userId)) {
            setShowDelete(true);
        }
    }

    const handleLike = async () => {
        if(likeText === 'LIKE'){
            setLikeText('LIKED');
        }
        else if(likeText === 'LIKED'){
            setLikeText('LIKE');
        }
        const baseUrl = 'https://13.52.214.140';
        const id = localStorage.getItem('userId');
        try {
            const res = await fetch(`${baseUrl}/addLike/${picTitle.imageName}`, {
                method: "POST",
                mode: "cors",
                body: '12',
                headers: {
                    'Content-Type': 'text/plain'
                }
            })
        } catch (err) {
            console.error("Error: ", err)
        }
    }

    useEffect(() => {
        const checkAuthentication = async () => {
            const result = await Authenticate();
            if (result === false) {
                redirect('/home');
            }
            setIsAuth(result);
            await getPictureData();
            setLoading(false);
        };
        checkAuthentication();
    }, []);

    useEffect(() => {
        if (image) {
            checkId();
        }
    }, [image]);

    if (loading) {
        return <div></div>
    }

    return (
        <div style={{backgroundColor: 'tan', height: '100vh', width: '100vw', position: 'absolute', overflow: 'auto'}}>
            <div>
                <button
                    style={{marginTop: '1.75rem', height: '2rem', alignSelf: 'start', position: 'fixed', left: '1rem', backgroundColor: 'peru'}}
                    onClick={() => redirect('/home')}
                    className="CustomButton1">Home
                </button>
            </div>
            <div className="ImageViewContainer">
                <img src={image?.imageUrl}/>
            </div>
            <div>
                <h1> Title: {image?.picTitle}</h1>
                <h1> Description: {image?.picDescription}</h1>
                <button onClick={deletePicture} style={{display: showDelete ? 'inline-block' : 'none'}}
                        className="CustomButton1"> DELETE
                </button>
                <button className="CustomButton1" style={{backgroundColor: likeText === 'LIKE' ? 'red' : 'blue'}} onClick={handleLike}>{likeText}</button>
            </div>
        </div>
    );
}

export default ImageView;