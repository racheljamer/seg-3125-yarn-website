import React, {useState} from 'react';
import './App.css';
import {Link, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import WriteStory from "./pages/WriteStory";
import MainNav from "./Components/mainNav";
import {signOut} from "firebase/auth";
import {auth} from "./firebase-config";
import {Button, Container, Nav, Navbar} from "react-bootstrap";

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/login";

        })
    };

  return (
    <div>
        <Navbar bg="light" expand="lg" variant="light" sticky="top">
            <Container>
                <Navbar.Brand href="/">
                    Yarn
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/#library">Library</Nav.Link>
                        <Nav.Link href="/Account">My Account</Nav.Link>
                        {!isAuth ? (
                            <Nav.Link href="/Login">Login</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link href="/WriteStory">Write</Nav.Link>
                                <Button onClick={signUserOut}>Log out</Button>
                            </>
                            )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/WriteStory" element={<WriteStory isAuth={isAuth}/>}/>
            <Route path="/Login" element={<Login setIsAuth={setIsAuth}/>}/>
        </Routes>
    </div>
  );
}

export default App;
