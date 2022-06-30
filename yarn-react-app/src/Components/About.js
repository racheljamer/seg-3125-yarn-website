import React from 'react';
import {Col, Image, Row} from "react-bootstrap";

//strings (to be exported to a string file later?)
const aboutStr = "Everyone has a story to tell, and here - you can read it. " +
    "Family stories, passed down through generations of storytellers around the" +
    " world, are stored in Yarn's virtual library. We aim to provide a place to " +
    "explore, read, and share your story with friends and family.";

function About() {
    return (
        <div className="p-4">
            <h3>About Yarn</h3>
            <Row className="mr-2">
                <Col>
                    <p>{aboutStr}</p>
                    <h5>Explore</h5>
                    <p>Browse our digital library of stories.</p>
                    <h5>Read</h5>
                    <p>Click a storybook to read the story. Find out more about the author, leave a comment, and share the story with your friends. </p>
                    <h5>Write</h5>
                    <p>Got a fun anecdote? <a href="/login">Share your story on Yarn.</a></p>
                </Col>
                <Col>
                    <Image rounded src="https://picsum.photos/600/400"/>
                </Col>
            </Row>
        </div>
    )
}

export default About;