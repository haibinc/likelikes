import React, { useState, useEffect } from 'react';
import { pictureForm } from '../types/form';
import Masonry from 'react-masonry-css';

const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
};

function ImageBoard() {
    const [images, setImages] = useState<pictureForm[]>([]);
    const baseUrl = 'https://likelikes-867512b88371.herokuapp.com';

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
    console.log(images);
    return (
        <div>
            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid"
                columnClassName="my-masonry-grid_column"
            >
                {images.map((image) => (
                    <div key={image.image_Name}>
                        <img src={image.imageUrl} alt={image.picTitle} />
                    </div>
                ))}
            </Masonry>
        </div>
    );
}

export default ImageBoard;