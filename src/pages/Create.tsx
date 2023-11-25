import React, {ChangeEvent, useEffect, useState} from 'react';
import Authenticate from "../Components/Authenticate";
import {ChangeWeb} from '../Components/ChangeWeb';
import Masonry from "react-masonry-css";


const breakpointColumnsObj = {
    default: 4,
    1100: 2,
    700: 1,
};

function Create() {
    const redirect = ChangeWeb();
    const [isAuth, setIsAuth] = useState<boolean | undefined>(undefined);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [picDescription, setPicDescription] = useState({title: '', description: ''});
    useEffect(() => {
        const checkAuthentication = async () => {
            const result = await Authenticate();
            setIsAuth(result);
        };
        if (isAuth === false) {

            redirect('/home');
        }
        checkAuthentication();
    }, [isAuth]);

    const handleFileInput = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setSelectedFile(file);
                setPreviewUrl(reader.result as string);
                setIsFileSelected(true);
            };

            reader.readAsDataURL(file);
        }
        setIsFileSelected((prev) => !prev);
    }

    const submitForm = (e: React.SyntheticEvent) => {
        e.preventDefault();
    }


    return (
        <div>
            <h1>CREATE</h1>
            <input type='file' accept="image/*" onChange={handleFileInput}/>
            <form className="FormContainer" style={{float:'right', marginRight:'300px'}}>
                <label htmlFor="title">Title</label>
                <input type='title' placeholder='Add a title' name="title" required={!isFileSelected} disabled={!isFileSelected}/>
                <label htmlFor="description">Description</label>
                <textarea placeholder='Add a detailed description' name="description" required={!isFileSelected} disabled={!isFileSelected}/>
                <button style={{marginTop:'3rem', alignSelf:'center'}} onClick={submitForm} className="CustomButton1">Publish</button>
            </form>

            <Masonry
                breakpointCols={breakpointColumnsObj}
                className="my-masonry-grid" // This is the class name applied to the Masonry component
                columnClassName="my-masonry-grid_column"
            >
                <div>
                    <img src={previewUrl!}/>
                </div>
                <div>

                </div>
            </Masonry>
        </div>
    );
}

export default Create;