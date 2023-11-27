import React, { useState, useEffect } from 'react';
import { pictureForm } from '../types/form';
import Masonry from 'react-masonry-css';
import {Buffer} from 'buffer';

const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
};

function ImageBoard() {
    const [images, setImages] = useState<pictureForm[]>([]);
    const [data, setData] = useState<string | null>(null);
    const baseUrl = 'http://localhost:3001';

    let picForm = {
        id: parseInt(localStorage.getItem('userId') || '') || 0,
    };

    // useEffect(() => {
    //     // Fetch image data from the API endpoint
    //     const fetchImages = async () => {
    //         try {
    //             const response = await fetch(`${baseUrl}/api/images`, {
    //                 method: 'POST',
    //                 mode: 'cors',
    //                 body: JSON.stringify(picForm),
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             if (response.ok) {
    //                 const imageData = await response.json();
    //                 console.log(imageData);
    //                 const base64Data = Buffer.from(imageData[0].data).toString('base64');
    //                 setData(base64Data);
    //                 setImages(imageData);
    //             }
    //             else{
    //                 console.log('no images');
    //             }
    //         } catch (error) {
    //             console.error('Error fetching images:', error);
    //         }
    //     };
    //     fetchImages();
    // }, []);

    return (
        <div>
            {/*<Masonry*/}
            {/*    breakpointCols={breakpointColumnsObj}*/}
            {/*    className="my-masonry-grid"*/}
            {/*    columnClassName="my-masonry-grid_column"*/}
            {/*>*/}
            {/*    {data && <img src={`data:${images[3]};base64,${data}`} alt={`${images[2]}`}/>}*/}
            {/*    /!*{images.map((image) => (*!/*/}
            {/*    /!*    <div>*!/*/}
            {/*    /!*        <img src={image.data} alt={`${image.picTitle}`} />*!/*/}
            {/*    /!*    </div>*!/*/}
            {/*    /!*))}*!/*/}
            {/*</Masonry>*/}
        </div>
    );
}

export default ImageBoard;