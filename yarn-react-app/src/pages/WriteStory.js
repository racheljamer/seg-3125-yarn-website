import React, {useEffect, useState} from 'react';
import {Button, ButtonToolbar, Col, Container, Form, Row} from "react-bootstrap";
import {addDoc, collection} from "firebase/firestore";
import {db, auth} from "../firebase-config";
import {useNavigate} from "react-router-dom";
import {MdUpload} from "react-icons/md"


function WriteStory() {
    //states!
    const [title, setTitle] = useState("");
    const [storyText, setStoryText] = useState("");
    const [year, setYear] = useState("");

    //form control states
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    let navigate = useNavigate();

    //send story to firestore
    const storiesCollectionRef = collection(db, "stories");
    const createPost = async () => {
        await addDoc(storiesCollectionRef, {
            title,
            storyText,
            author: {name: auth.currentUser.displayName, id:auth.currentUser.uid},
            year
        });
        navigate("/");
    };
//to validate: all fields required, title max 70 ch, body max ?, year regex
    return (
            <Container className="px-5">
                <h3 className="mt-5 mb-3">Tell your story</h3>
                <Form>
                    <h5 className="mb-2">Details</h5>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                required
                                type="text"
                                placeholder="Enter a catchy title!"
                                className="mb-3"
                                onChange={(event) => {
                                    setTitle(event.target.value);
                                }}
                            />
                        </Form.Group>
                        <Form.Group as={Col} xs={2} controlId="formGridCity">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                required
                                type="month"
                                max="2022-12"
                                placeholder="yyyy"
                                onChange={(event) => {
                                    setYear(event.target.value);
                                }}
                            />
                        </Form.Group>
                    </Row>
                    <Form.Group>
                        <Form.Label as={"h5"}>Story</Form.Label>
                        <Form.Control
                            required
                            as="textarea" rows={8}
                            placeholder="Tell your story."
                            className="mb-3"
                            onChange={(event) => {
                                setStoryText(event.target.value);
                            }}
                        />
                    </Form.Group>
                    <ButtonToolbar className="w-100">
                        <Button disabled><MdUpload/> Images</Button>
                            <Button className="mx-3" disabled>Save Draft</Button>
                            <Button onClick={createPost}>Publish</Button>
                    </ButtonToolbar>
                </Form>
            </Container>
    );
}

export default WriteStory;