import React, {useEffect} from 'react';
import {Button, Col, Container, DropdownButton, Dropdown, Form, Image, InputGroup, Row} from "react-bootstrap";
import {MdUpload, MdSave} from "react-icons/md";
import {auth} from "../firebase-config";
import {Navigate, useNavigate} from "react-router-dom";
import "./Account.css";

//auth.currentUser.displayName, id:auth.currentUser.uid <= import auth from firebase to access first name and such

function Account() {

    return (
        <Container className="mt-5">
            <h3>My Account</h3>
            <Row>
                <Col xxl={3}>
                    <div className="d-grid mb-3">
                        <Image thumbnail src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png" className="profile"/>
                        <Button className="mt-3 profile"disabled><MdUpload/> Upload Image</Button>
                    </div>

                </Col>

                <Col>
                    <Form>
                        <h4>Information</h4>
                        <Row>
                            <Form.Group as={Col}>
                                <Form.Control type="text" placeholder="First Name" readOnly/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Control type="text" placeholder="Last Name" readOnly/>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group className="my-3">
                                <Form.Control type="email" placeholder="Email" readOnly/>
                            </Form.Group>
                        </Row>
                        <h4>Biography</h4>
                        <Form.Group className="my-3">
                            <Form.Control as="textarea" rows={3} placeholder="Bio" readOnly/>
                        </Form.Group>
                        <h4>Journal with Yarn</h4>
                        <Form.Label>Enable email reminders to write stories</Form.Label>
                        <InputGroup>

                            <InputGroup.Checkbox/>
                            <DropdownButton
                                variant="outline-primary"
                                title="Remind me every..."
                                id="input-group-dropdown-4"
                                align="end"
                            >
                                <Dropdown.Item>Day</Dropdown.Item>
                                <Dropdown.Item>3 Days</Dropdown.Item>
                                <Dropdown.Item>Week</Dropdown.Item>
                                <Dropdown.Item>2 Weeks</Dropdown.Item>
                                <Dropdown.Item>Month</Dropdown.Item>
                            </DropdownButton>
                        </InputGroup>

                        <Button className="mt-3" href="/"><MdSave/> Save</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Account;