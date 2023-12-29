import React, {useState, useEffect} from 'react';
import {ChangeWeb} from '../Components/ChangeWeb'
import Masonry from 'react-masonry-css';
import {pictureForm} from "../types/form";
import Authenticate from "../Components/Authenticate";

const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
};

function Likes() {
    const redirect = ChangeWeb();
    const [images, setImages] = useState<pictureForm[]>([]);


    useEffect(() => {
        const checkAuthentication = async () => {
            const result = await Authenticate();
            if (result === false) {
                redirect('/home');
            }
            // setIsAuth(result);
            // await getPictureData();
            // setLoading(false);
        };
        checkAuthentication();
    }, []);

    useEffect( () => {
        const fetchImages = async () => {
            try {
                const baseUrl = 'https://13.52.214.140';
                const id = localStorage.getItem('userId')
                const response = await fetch(`${baseUrl}/getLikes/${id}`, {
                    method: 'GET',
                    mode: 'cors',
                });
                if (response.ok) {
                    const res = await response.json();
                    setImages(res);
                }
                else{
                    console.log('no images');
                }
            } catch (error) {
                console.error('Error fetching images:', error);
            }
        };
        fetchImages();
    }, [])

    return (
        <div style={{backgroundColor: 'black', height:'100vh', width:'100vw', position:'absolute', overflow:'auto', textAlign:'center'}}>
            <div>
                <button
                    style={{marginTop: '1.75rem', height: '2rem', alignSelf: 'start', position: 'fixed', left: '1rem', backgroundColor: 'peru'}}
                    onClick={() => redirect('/home')}
                    className="CustomButton1">Home
                </button>
            </div>
            <h1 style={{color: 'azure'}}> LIKES </h1>
            <div>
                <Masonry
                    breakpointCols={breakpointColumnsObj}
                    className="my-masonry-grid"
                    columnClassName="my-masonry-grid_column"
                >
                    {images.map((image) => (
                        <div key={image.imageName}>
                            <img src={image.imageUrl} onClick={() => redirect(`/image/${image.imageName}`)} alt={image.picTitle} />
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    );
}

export default Likes;