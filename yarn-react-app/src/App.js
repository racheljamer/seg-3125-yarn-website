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
import MyStories from "./pages/MyStories";
import Account from "./pages/Account";
import ReadStory from "./pages/ReadStory";

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
                        {!isAuth ? (
                            <Nav.Link href="/Login">Login</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link href="/Account">My Account</Nav.Link>
                                <Nav.Link href="/MyStories">Write</Nav.Link>
                                <Button onClick={signUserOut}>Log out</Button>
                            </>
                            )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path="/" element={<Home isAuth={isAuth}/>} />
            <Route path="/MyStories" element={<MyStories isAuth={isAuth}/>}/>
            <Route path="/WriteStory" element={<WriteStory isAuth={isAuth}/>}/>
            <Route path="/Login" element={<Login setIsAuth={setIsAuth}/>}/>
            <Route path="/Account" element={<Account setIsAuth={setIsAuth}/>}/>
            <Route path="/Story" element={<ReadStory/>}/>
        </Routes>
    </div>
  );
}

export default App;
