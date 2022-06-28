import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../firebase-config";
import {useNavigate} from "react-router-dom";


function WriteStory({isAuth}) {
    //states!
    const [title, setTitle] = useState("");
    const [storyText, setStoryText] = useState("");

    let navigate = useNavigate();

    //send story to firestore
    const storiesCollectionRef = collection(db, "stories");
    const createPost = async () => {
        await addDoc(storiesCollectionRef, {
            title,
            storyText,
            author: {name: auth.currentUser.displayName, id:auth.currentUser.uid}
        });
        navigate("/");
    };

    useEffect(() => {
        if (!isAuth) {
            navigate("/login"); //this is just a trick to make sure users are authenticated first
        }

    }, [])
    return (
            <Container>
                <h1>Write a Story</h1>
                <div>
                    <label> Title:</label>
                    <input placeholder="Enter a catchy title!"
                           onChange={(event) => {
                            setTitle(event.target.value);
                           }}
                    />
                </div>
               <div>
                   <label> Story:</label>
                   <textarea
                       placeholder="Tell your story."
                       onChange={(event) => {
                       setStoryText(event.target.value);
                       }}
                   />
               </div>
                <Button onClick={createPost}>Submit Story</Button>
            </Container>
    );
}

export default WriteStory;