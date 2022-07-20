import React from 'react';
import {Container} from "react-bootstrap";
import About from "../Components/About";
import Library from "../Components/Library";

function Home() {


    return (
        <Container>
            <About/>
            <Library/>
        </Container>
    );
}

export default Home;