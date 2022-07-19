import React, {useState} from 'react';
import './App.css';
import {Link, Navigate, Outlet, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import WriteStory from "./pages/WriteStory";
import {signOut} from "firebase/auth";
import {auth} from "./firebase-config";
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import MyStories from "./pages/MyStories";
import Account from "./pages/Account";
import ReadStory from "./pages/ReadStory";
import {BiLibrary} from "react-icons/bi";
import {MdAccountCircle, MdBook} from "react-icons/md";
import {RiQuillPenFill} from "react-icons/ri";

const ProtectedRoute = ({isAuth, redirectPath = '/Login',children}) => {
    if (!isAuth) {
        return <Navigate to={redirectPath} replace />;
    }

    return children ? children : <Outlet />;
}

function App() {
    const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

    const signUserOut = () => {
        signOut(auth).then(() => {
            localStorage.clear();
            setIsAuth(false);
            window.location.pathname = "/";

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
                    <Nav className="ms-auto">
                        <Nav.Link href="/#library"><BiLibrary/> Library</Nav.Link>
                        {!isAuth ? (
                            <Nav.Link href="/Login">Login</Nav.Link>
                        ) : (
                            <>
                                <Nav.Link href="/WriteStory"><RiQuillPenFill/> Write Story</Nav.Link>
                                <Nav.Link href="/Account"><MdAccountCircle/> My Account</Nav.Link>
                                <Nav.Link href="/MyStories"><MdBook/> My Stories</Nav.Link>
                                <Button variant="secondary" onClick={signUserOut}>Log out </Button>

                            </>
                            )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        <Routes>
            <Route path="/" element={<Home isAuth={isAuth}/>} />
            <Route path="/Login" element={<Login setIsAuth={setIsAuth}/>}/>
            <Route path="/story/:id" element={<ReadStory/>}/>
            <Route path="*" element={<p>There's nothing here! 404</p>}/>
            <Route element={<ProtectedRoute isAuth={isAuth}/>}>
                <Route path="/MyStories" element={<MyStories/>}/>
                <Route path="/WriteStory" element={<WriteStory/>}/>
                <Route path="/Account" element={<Account/>}/>
            </Route>
        </Routes>
    </div>
  );
}

export default App;
