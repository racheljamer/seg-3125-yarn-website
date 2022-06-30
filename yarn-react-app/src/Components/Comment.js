import React from 'react'
import {Button, Container, Image} from "react-bootstrap";
import {MdReply} from "react-icons/md";

function Comment() {
    return (
        <Container className="p-2 my-2 rounded-3 border">
            <div id="profile" className="d-flex">
                <Image src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" width="50" rounded/>
                <div className="d-block mx-2">
                    <h6 className="my-0">John Doe</h6>
                    <h6 className="text-secondary">10:25 AM, October 5th, 2020</h6>
                </div>
            </div>
            <p className="mb-0 mt-1">Mauris at gravida felis, sit amet ultrices leo. Quisque vel maximus dolor. Phasellus accumsan, leo sed viverra tempus, leo augue congue ipsum, ac rhoncus leo neque id augue. Proin nec ipsum in ex commodo euismod. Nunc suscipit convallis metus, non fermentum ante tempor et. Aliquam ut dignissim eros. Sed ac tortor arcu.</p>
            <div className="d-flex">
                <Button className="btn btn-primary ms-auto"><MdReply/> Reply</Button>
            </div>
        </Container>
    );
}

export default Comment;