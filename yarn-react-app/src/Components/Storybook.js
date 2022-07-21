import React from 'react';
import './storybook.css';
import {Col} from "react-bootstrap";
import {MdOutlineAdd} from "react-icons/md";

function Storybook(props) {
    return (
        <Col xs={3}>
            <a href={props.href}>
                <div className="storybook" align="center">
                    <h3 className="pt-5 text-center px-2">{props.title}</h3>
                    {props.author && <h4 className="pt-2 text-center">{props.author}</h4>}
                    <br/><br/>
                    {props.add &&<MdOutlineAdd size={50}/>}
                </div>
            </a>
            <div className="d-grid" style={{width:220}}>
                {props.children}
            </div>
        </Col>

    );
}

export default Storybook;