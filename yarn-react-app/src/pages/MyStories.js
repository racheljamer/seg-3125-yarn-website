import React, {useCallback, useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Col, Container, Row, Button} from "react-bootstrap";
import {collection, deleteDoc, doc, getDocs, query, where, collectionGroup} from "firebase/firestore";
import {db, auth} from "../firebase-config";
import Storybook from "../Components/Storybook";
import {MdOutlineDelete} from "react-icons/md";

function MyStories() {
    const [storyList, setStoryList] = useState([]);

    const storiesCollectionRef = collection(db, "teststories1");

    //call firebase to retrieve stories

    const deleteStory = useCallback(async (id) => {
        const storyDoc = doc(db, "teststories1", id);
        await deleteDoc(storyDoc);
        window.location.reload();
    }, []);


    useEffect(() => {
        const getStories = async () => {
                //const q  = query(storiesCollectionRef, where("authorId", "==", auth.currentUser.uid))
                const data = await getDocs(storiesCollectionRef);
                setStoryList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        };
        getStories();
    }, [deleteStory]);

    return (

            <Container>
                <h3 className="my-3">My Stories</h3>

                <Row>
                    {storyList.map(story => {
                        return auth.currentUser.uid === story.authorId ?
                            <>
                                <Storybook
                                    title={story.title}
                                    href={`/story/${story.id}`}
                                    delete={true}>
                                    <Button variant='danger' className="mx-auto" onClick={() => {
                                        deleteStory(story.id);
                                }}><MdOutlineDelete/> Delete Story</Button></Storybook>

                            </>

                            :
                            <></>
                    })}
                    {/*{storyList.map(story => {*/}
                    {/*    return <Storybook title={story.title}/>*/}
                    {/*})}*/}
                    <Storybook title="New Story" href="/writestory" add={true}/>
                </Row>
            </Container>


    );
}

export default MyStories;