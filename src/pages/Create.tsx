import React, {ChangeEvent, useEffect, useState} from 'react';
import Authenticate from "../Components/Authenticate";
import {ChangeWeb} from '../Components/ChangeWeb';
import {pictureForm} from '../types/form';

function Create() {
    const redirect = ChangeWeb();
    const [isAuth, setIsAuth] = useState< boolean | undefined>(undefined);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [picDescription, setPicDescription] = useState({picTitle:'', pictDescription:''})
    const [file, setFile] = useState<File | undefined>();
    const [imgSource, setImgSource] = useState<string | undefined>();

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
        if(file){
            setFile(file);
            const reader = new FileReader();
            reader.onloadend = () => setImgSource(reader.result as string);
            reader.readAsDataURL(file);
        }
        setIsFileSelected((prev) => !prev);
    }

    const submitForm = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const formData = new FormData();
        if(file){
            formData.append("image", file);
            formData.append("picTitle", picDescription.picTitle);
            formData.append("picDescription", picDescription.pictDescription);
        }

        if (await Authenticate()) {
            const baseUrl = 'https://likelikes-867512b88371.herokuapp.com';
            try {
                const res = await fetch(`${baseUrl}/submitPicture`, {
                    method: 'POST',
                    mode: 'cors',
                    body: formData,
                })
                if (res.ok) {
                    const message = await res.text();
                    redirect('/home')
                } else {
                    console.log(res.status);
                }
            } catch (err) {
                console.error('error', err);
            }
        } else {
            redirect('/home');
        }
    }

    const handleDescription = (props: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPicDescription({...picDescription, pictDescription: props.target.value});
    }

    const handleTitle = (props: React.ChangeEvent<HTMLInputElement>) => {
        setPicDescription({...picDescription, picTitle: props.target.value});
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
                <form className="FormContainer" method="POST" encType="multipart/form-data" style={{float: 'right', marginRight: '300px'}}>
                    <label htmlFor="title">Title</label>
                    <input type='title' placeholder='Add a title' onChange={handleTitle} name="title"
                           required={picDescription.picTitle !== ''}
                           disabled={!isFileSelected}/>
                    <label htmlFor="description">Description</label>
                    <textarea placeholder='Add a detailed description' onChange={handleDescription} name="description"
                              required={picDescription.pictDescription !== ''}
                              disabled={!isFileSelected}/>
                        <button style={{marginTop: '3rem', alignSelf: 'center',
                            backgroundColor: (picDescription.picTitle == '' || picDescription.pictDescription == '')? 'gray' : 'red',
                            cursor: (picDescription.picTitle == '' || picDescription.pictDescription == '')? 'default' : 'pointer'}}
                                onClick={submitForm} aria-required={picDescription.picTitle !== '' && picDescription.pictDescription !== ''} disabled={picDescription.picTitle == '' || picDescription.pictDescription == ''}
                            className="CustomButton1">Publish
                    </button>
                </form>
            </div>
            <div>
                <img src={imgSource}
                     style={{height: '10rem', width: '12rem', marginTop: '3rem', borderRadius: '2.5rem'}}/>
            </div>
        </div>
    );
}

export default Create;