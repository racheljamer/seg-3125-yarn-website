import React, {useEffect, useState} from 'react';
import {Button, Col, Container, Form, Image, Row, Alert} from "react-bootstrap";
import {MdSave} from "react-icons/md";
import {auth, db} from "../firebase-config";
import "./Account.css";
import {addDoc, collection} from "firebase/firestore";

function Account() {
    const [userAccount, setUserAccount] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [remindTime, setRemindTime] = useState("");

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    const setField = (field, value) => {
        setForm({
            ...form,
            [field]: value
        })

        if(!!errors[field]) setErrors({
            ...errors,
            [field]: null
        })
    }

    //validation conditions
    const findFormErrors = () => {
        const {biography} = form
        const newErrors = {}

        //biography errors
        if (!biography || biography === '') newErrors.biography = 'Biography cannot be empty!'
        else if (biography.length > 800) newErrors.biography = 'Biography must be less than 800 characters.'

        return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length>0) {
            //Form contains errors!
            setErrors(newErrors)
        } else {
            //no errors - upload bio to firebase
            uploadBio();
        }
    }

    const bioCollectionRef = collection(db, "biographies");

    const uploadBio = async () => {
        const docRef = await addDoc(bioCollectionRef, {
            authorId: userAccount.uid,
            authorPic: userAccount.photoURL,
            bio: form.biography
        });
        window.location.reload();
    }

    const handleReminderAlert = (e) => {
        setRemindTime(e)
        //console.log(remindTime)
        setShowAlert(true);
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
                if (user) {
                    //console.log(user)
                    setUserAccount(user);
                }
            });
    }, [])

    //BIOGRAPHY FUNCTIONALITY - RAN OUT OF TIME.
    // useEffect(() => {
    //     const q = query(bioCollectionRef, where("authorId", "==", userAccount.uid));
    //     const getBio = async() => {
    //         try {
    //             const data = await getDocs(q);
    //             setBio(data.docs[0]);
    //         } catch (e) {
    //             console.log(e)
    //         }
    //     }
    //     getBio()
    //
    // }, [userAccount])

    return (
        <Container className="mt-5">
            <h3>My Account</h3>
            <Row>
                <Col xxl={3}>
                    <div className="d-grid mb-3">
                        <Image thumbnail src={userAccount.photoURL} className="profile"/>
                    </div>
                </Col>

                <Col>
                    <Form>
                        <h4>Information</h4>
                        <p>Name: {userAccount.displayName}</p>
                        <p>Email: {userAccount.email}</p>
                        <h4>Biography</h4>
                        <Form.Group className="my-3">
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Biographies coming soon!"
                                onChange={e => setField('biography', e.target.value)}
                                isInvalid = {!!errors.biography}
                                disabled
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.biography}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Form>
                    <Form>
                        <h4>Journal with Yarn</h4>
                        <Form.Label>Enable email reminders to write stories</Form.Label>
                        <Form.Group>
                            <Form.Label>Remind me:</Form.Label>
                            <Form.Select
                                defaultValue="never"
                                onChange={e => handleReminderAlert(e.target.value)}
                            >
                                <option value="never">Never</option>
                                <option value="every day">Every Day</option>
                                <option value="every 3 days">Every 3 Days</option>
                                <option value="weekly">Weekly</option>
                                <option value="every 2 weeks">Every 2 Weeks</option>
                                <option value="monthly">Monthly</option>
                            </Form.Select>
                        </Form.Group>
                        {showAlert ?
                            (remindTime === "never") ?
                                <Alert className="mt-3" variant="info" dismissible onClose={() => setShowAlert(false)}>Sorry to see you go! We won't send you any more emails.</Alert>
                                :
                            <Alert className="mt-3" variant="success" dismissible onClose={() => setShowAlert(false)}>Thanks for subscribing! We'll send you an email {remindTime} to remind you to Journal with Yarn.</Alert>
                            :
                            null
                        }
                        <Button className="my-3" type="submit" href={"/"}><MdSave/> Save</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Account;