import React, {useEffect, useState} from 'react';
import {collection, getDocs, deleteDoc, doc} from "firebase/firestore";
import {db} from "../firebase-config";
import Storybook from "./Storybook";
import {Button, Col, Container, Form, InputGroup, Row} from "react-bootstrap";

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
                <Form>
                    <Row>
                        <InputGroup as={Col} >
                            <InputGroup.Text id="basic-addon1">🔍</InputGroup.Text>
                            <Form.Control type="text" placeholder="Search the library"/>
                            <Button variant="outline-primary" id="button-addon2">
                                Search
                            </Button>
                        </InputGroup>
                        <Form.Group as={Col} xs={2} controlId="formGridState">
                            <Form.Select defaultValue="Sort by">
                                <option>Sort by</option>
                                <option>Newest</option>
                                <option>Most Liked</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                </Form>

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