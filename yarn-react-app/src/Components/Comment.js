import React from 'react'
import {Button, Container, Image} from "react-bootstrap";
import {MdReply} from "react-icons/md";

function Comment(props) {

    return (
        <Container className="p-2 my-2 rounded-3 border">
            <div id="profile" className="d-flex">
                <Image src={props.picture ? props.picture : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"} width="50" rounded/>
                <div className="d-block mx-2">
                    <h6 className="my-0">{props.name}</h6>
                    <h6 className="text-secondary">{props.time}</h6>
                </div>
            </div>
            <p className="mb-0 mt-1">{props.text}</p>
            {/*<div className="d-flex">*/}
            {/*    <Button className="btn btn-primary ms-auto"><MdReply/> Reply</Button>*/}
            {/*</div>*/}
        </Container>
    );
}

export default Comment;