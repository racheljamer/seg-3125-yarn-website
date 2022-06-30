import React from 'react';
import './storybook.css';
import {Col, Button} from "react-bootstrap";

function Storybook(props) {
    return (
        <Col xs={3}>
            <a href={props.href}>
                <div className="storybook">
                    <h3 className="pt-5 text-center">{props.title}</h3>
                    {props.author && <h4 className="pt-2 text-center">{props.author}</h4>}
                </div>
            </a>
        </Col>

    );
}

export default Storybook;