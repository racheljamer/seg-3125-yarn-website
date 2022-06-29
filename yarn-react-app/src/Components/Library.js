import React, {useEffect, useState} from 'react';
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebase-config";
import Storybook from "./Storybook";
import {Col, Container, Row} from "react-bootstrap";

function Library() {
    const [storyList, setStoryList] = useState([]);
    const storiesCollectionRef = collection(db, "stories");

    // useEffect(() => {
    //     //call firebase and retrieve stories
    //     const getPosts = async () => {
    //         const data = await getDocs(storiesCollectionRef);
    //         setStoryList(data.docs.map(
    //             (doc) => ({...doc.data(), id: doc.id})));
    //     };
    //
    //     getPosts();
    // });
    //
    // const deleteStory = async (id) => {
    //     const storyDoc = doc(db, "stories", id);
    //     await deleteDoc(storyDoc);
    // }

    return (
        <>
            <h3>Library</h3>
            

                <Row>
                    <Col><Storybook/></Col>
                    <Col><Storybook/></Col>
                    <Col><Storybook/></Col>
                    <Col><Storybook/></Col>
                    <Col><Storybook/></Col>
                </Row>



            {/*{storyList.map((story) => {*/}
            {/*    return <div>*/}
            {/*        <div className="story">{story.title}</div>*/}
            {/*    </div>*/}
            {/*})}*/}

        </>
    );
}

export default Library;