import React from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";

function MainNav() {
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
                        <Nav.Link href="/Login">Login</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default MainNav;