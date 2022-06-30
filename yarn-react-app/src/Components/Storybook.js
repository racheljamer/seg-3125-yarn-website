import React from 'react';
import './storybook.css';
import {Col} from "react-bootstrap";

function Storybook(props) {
    return (
        <Col xs={4}>
            <div className="storybook">
                <h3 className="pt-5 text-center">{props.title}</h3>
                {props.author && <h4 className="pt-2 text-center">{props.author}</h4>}
            </div>
        </Col>

    );
}

export default Storybook;