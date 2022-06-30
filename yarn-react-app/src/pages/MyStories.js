import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../firebase-config";
import Storybook from "../Components/Storybook";

function MyStories() {
    const [storyList, setStoryList] = useState([]);
    const storiesCollectionRef = collection(db, "stories");

    //call firebase to retrieve stories
    useEffect(() => {
        const getStories = async () => {
            const data = await getDocs(storiesCollectionRef);
            setStoryList(data.docs.map(
                (doc) => ({...doc.data(), id:doc.id})
            ));
        }
        getStories();
    });

    return (
        <Container>
            <h3 className="my-3">My Stories</h3>
            Here are my stories:
            <Link to="/WriteStory">WriteStory</Link>
            <Row>
            {storyList.map((story) => {
                return <Storybook title={story.title}/>
            })}
                <Col>
                    <Storybook title="New Story"/>
                </Col>
            </Row>
        </Container>
    );
}

export default MyStories;