import React, {useState} from 'react';
import {Button, Col, Container, Image, Offcanvas, Row} from "react-bootstrap";
import "./ReadStory.css";

const storyPlaceholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus accumsan ante at varius. Donec odio erat, efficitur non mauris eget, egestas euismod magna. Duis ac felis ac nisl tempor venenatis vitae eget turpis. Nulla erat augue, molestie vitae neque venenatis, maximus pharetra arcu. Ut suscipit semper diam at commodo. Duis maximus ante laoreet porta maximus. Pellentesque a fermentum odio, in rutrum lectus.\n" +
    "\n" +
    "Nulla facilisi. Nullam metus ex, rutrum in tellus sit amet, venenatis gravida nisl. Praesent consequat, dui vitae blandit fermentum, tortor tortor mattis lectus, ac facilisis enim quam at mi. Curabitur id ullamcorper nisl. Morbi ullamcorper mauris eu turpis malesuada, vel volutpat felis venenatis. Ut eu pellentesque nisi, sit amet consectetur ipsum. Nullam ultricies, est et mattis lobortis, orci felis volutpat purus, quis sagittis nulla neque vitae dui. Aliquam a dui sed ligula suscipit venenatis. Aenean vel gravida felis. Quisque dignissim leo vitae semper sodales. Suspendisse a molestie diam. Phasellus feugiat vulputate nisi in venenatis. Maecenas scelerisque finibus sapien sit amet ultricies.\n" +
    "\n" +
    "Etiam nec ex arcu. Integer posuere diam eget nibh varius pellentesque eget ut nulla. Fusce sed dolor metus. Nulla nibh ligula, dictum et rhoncus at, finibus eu nibh. Donec tincidunt id nisl vel dictum. Aliquam at tellus a massa imperdiet fringilla at ut turpis. Ut odio mauris, pharetra vitae venenatis consectetur, faucibus vel ligula. Aenean ac velit quis enim bibendum viverra lacinia non magna. Mauris et nulla vestibulum, lobortis nunc vel, lacinia ante.";

function ReadStory() {
    //Author Off-canvas
    const [showAuthor, setShowAuthor] = useState(false);

    const handleClose = () => setShowAuthor(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShowAuthor(true);
    }

    //firestore get doc by id

    return (
        <Container>
            <h3 className="mt-5 text-center">This is where the title goes</h3>
            <h5 className="my-2 text-end">Story by: <a as={Button} onClick={handleShow} href="">Author</a></h5>
            <p className="content">
                {storyPlaceholder}
            </p>
            <h4>Photo Album</h4>
            <Row>
                <Col><Image src="https://picsum.photos/600/400" width="400" className="rounded my-2"/></Col>
                <Col><Image src="https://picsum.photos/600/400" width="400" className="rounded my-2"/></Col>
                <Col><Image src="https://picsum.photos/600/400" width="400" className="rounded my-2"/></Col>
                <Col><Image src="https://picsum.photos/600/400" width="400" className="rounded my-2"/></Col>
                <Col><Image src="https://picsum.photos/600/400" width="400" className="rounded my-2"/></Col>
                <Col><Image src="https://picsum.photos/600/400" width="400" className="rounded my-2"/></Col>
            </Row>

            <h4>Comments</h4>


            <Offcanvas show={showAuthor} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>About the Author</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div align="center">
                        <Image className="w-75" thumbnail src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"/>
                        <h4 className="mt-2">Johnny Appleseed</h4>
                    </div>
                    <h5>Biography</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus accumsan ante at varius. Donec odio erat, efficitur non mauris eget, egestas euismod magna. Duis ac felis ac nisl tempor venenatis vitae eget turpis.</p>
                </Offcanvas.Body>
            </Offcanvas>

        </Container>
    );
}

export default ReadStory;