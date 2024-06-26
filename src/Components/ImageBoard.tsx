import React, { useState, useEffect } from 'react';
import { pictureForm } from '../types/form';
import Masonry from 'react-masonry-css';
import {ChangeWeb} from '../Components/ChangeWeb';

const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
};

function ImageBoard() {
    const [images, setImages] = useState<pictureForm[]>([]);
    const baseUrl = 'https://3.101.36.103:8443';
    const redirect = ChangeWeb();

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await fetch(`${baseUrl}/getImagePosts`, {
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
    }, []);

    return (
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
    );
}

export default ImageBoard;