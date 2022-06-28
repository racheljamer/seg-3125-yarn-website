import React from 'react';
import {Button, Container, Nav, Navbar} from "react-bootstrap";

function MainNav({isAuth, signout}) {

    return (
        <Navbar bg="light" expand="lg" variant="light" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    Yarn
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/#library">Library</Nav.Link>
                        <Nav.Link href="/WriteStory">Write</Nav.Link>
                        <Nav.Link href="/Account">My Account</Nav.Link>
                        {isAuth ? <Nav.Link href="/Login">Login</Nav.Link> : <Button onClick={signout}>Log out</Button>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNav;