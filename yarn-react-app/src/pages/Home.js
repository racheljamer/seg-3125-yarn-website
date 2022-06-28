import React, {useEffect, useState} from 'react';
import {Container} from "react-bootstrap";
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import {auth, db} from "../firebase-config";

function Home({isAuth}) {
    const [storyList, setStoryList] = useState([]);
    const storiesCollectionRef = collection(db, "stories");


    useEffect(() => {
        //call firebase and retrieve stories
        const getPosts = async () => {
            const data = await getDocs(storiesCollectionRef);
            setStoryList(data.docs.map(
                (doc) => ({...doc.data(), id: doc.id})));
        };

        getPosts();
    });

    const deleteStory = async (id) => {
        const storyDoc = doc(db, "stories", id);
        await deleteDoc(storyDoc);
    }


    return (
        <Container> {storyList.map((story) => {
            return <div>
                <div className="story">{story.title}</div>
                {isAuth && story.author.id === auth.currentUser.uid && <button onClick={() => {
                    deleteStory(story.id)
                }}>X</button>}
            </div>

        })}</Container>
    );
}

export default Home;