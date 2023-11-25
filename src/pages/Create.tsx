import React, {ChangeEvent, useEffect, useState} from 'react';
import Authenticate from "../Components/Authenticate";
import {ChangeWeb} from '../Components/ChangeWeb';
import {pictureForm} from '../types/form';
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

    let picForm: pictureForm = {
        id: parseInt(localStorage.getItem('userId') || '') || 0,
        file_name: selectedFile?.name || '',
        file_type: selectedFile?.type || '',
        picTitle: picDescription.title,
        pictDescription: picDescription.description,
        data: previewUrl || ''
    }

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

    const submitForm = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (await Authenticate()) {
            const baseUrl = 'http://localhost:3001';
            try {
                const res = await fetch(`${baseUrl}/submitPicture`, {
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(picForm),
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (res.ok) {

                } else {
                }
            } catch (err) {
                console.error('error', err);
            }
        } else {
            redirect('/home');
        }
    }

    const handleDescription = (props: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPicDescription({...picDescription, description: props.target.value});
        console.log(picDescription.description);
    }

    const handleTitle = (props: React.ChangeEvent<HTMLInputElement>) => {
        setPicDescription({...picDescription, title: props.target.value});
        console.log(picDescription.title);
    }


    return (
        <div>
            <div>
                <button style={{marginTop: '1.5rem', alignSelf: 'start', position:'fixed', left:'1rem', backgroundColor: 'peru'}} onClick={() => redirect('/home')}
                        className="CustomButton1">Home
                </button>
            </div>
            <div>
                <h1>CREATE</h1>
                <input type='file' accept="image/*" onChange={handleFileInput}/>
                <form className="FormContainer" style={{float: 'right', marginRight: '300px'}}>
                    <label htmlFor="title">Title</label>
                    <input type='title' placeholder='Add a title' onChange={handleTitle} name="title"
                           required={!isFileSelected}
                           disabled={!isFileSelected}/>
                    <label htmlFor="description">Description</label>
                    <textarea placeholder='Add a detailed description' onChange={handleDescription} name="description"
                              required={!isFileSelected}
                              disabled={!isFileSelected}/>
                    <button style={{marginTop: '3rem', alignSelf: 'center'}} onClick={submitForm}
                            className="CustomButton1">Publish
                    </button>
                </form>
            </div>
            <div>
                <img src={previewUrl!}
                     style={{height: '10rem', width: '12rem', marginTop: '3rem', borderRadius: '2.5rem'}}/>
            </div>
        </div>
    );
}

export default Create;