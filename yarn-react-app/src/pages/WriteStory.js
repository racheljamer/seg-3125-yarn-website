import React, {useState} from 'react';
import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {addDoc, collection} from "firebase/firestore";
import {db, auth, storage} from "../firebase-config";
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import {useNavigate} from "react-router-dom";


function WriteStory() {
    //form control states
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    //image
    const [imageUpload, setImageUpload] = useState(null);

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
        const {title, year, storyText, storyPic} = form
        const newErrors = {}

        //title errors
        if (!title || title === '') newErrors.title = 'Please enter a title.'
        else if (title.length > 70) newErrors.title = 'Title must be less than 70 characters'

        //year errors
        if (!year || year === '') newErrors.year = 'Please enter a year.'
        else if (year > 2022) newErrors.year = 'Please enter a valid year.'
        else if (year < 0) newErrors.year = 'Please enter a valid year.'

        //storyText errors
        if (!storyText || storyText === '') newErrors.storyText = 'Please enter a story.'

        //storyPic errors
        const validTypes = ['png', 'jpeg', 'jpg'];
        const fileType = storyPic.type.split('/')[1];
        if (!validTypes.includes(fileType)) newErrors.storyPic = 'Not a valid image type! Please upload .png, .jpeg, .jpg'

        return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length>0) {
            //Form contains errors!
            setErrors(newErrors)
        } else {
            //no errors - submit story to firebase!
            uploadImage();
        }
    }

    let navigate = useNavigate();

    //send story to firestore
    const storiesCollectionRef = collection(db, "teststories"); //TODO: Change this to finalstories before launching

    const uploadImage = () => {
        if (imageUpload === null) return;
        const imageRef = ref(storage, `storyImages/${imageUpload.name + Date.now()}`);
        uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                const docRef = addDoc(storiesCollectionRef, {
                    title: form.title,
                    storyText: form.storyText,
                    author: {name: auth.currentUser.displayName, id:auth.currentUser.uid},
                    year: form.year,
                    picture: url
                });
                navigate("/");
            })
        })
    };

    return (
            <Container className="px-5">
                <h3 className="mt-5 mb-3">Tell your story</h3>
                <Form>
                    <h5 className="mb-2">Details</h5>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter a catchy title!"
                                onChange={e => setField('title', e.target.value)}
                                isInvalid={!!errors.title}
                            />
                            <Form.Control.Feedback type="invalid" className="mb-3">
                                {errors.title}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} xs={2} controlId="formGridCity">
                            <Form.Label>Year</Form.Label>
                            <Form.Control
                                type="number"
                                max="2022"
                                placeholder="yyyy"
                                onChange={e => setField('year', e.target.value)}
                                isInvalid={!!errors.year}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.year}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Form.Group>
                        <Form.Label as={"h5"}>Story</Form.Label>
                        <Form.Control
                            as="textarea" rows={8}
                            placeholder="Tell your story."
                            onChange={e => setField('storyText', e.target.value)}
                            isInvalid={!!errors.storyText}
                        />
                        <Form.Control.Feedback type="invalid" className="mb-3">
                            {errors.storyText}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label as="h5" className="mt-3">Image</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={(e) => {
                                setImageUpload(e.target.files[0]) //first file in array
                                setField('storyPic', e.target.files[0])
                            }}
                            isInvalid={!!errors.storyPic}
                        />
                        <Form.Control.Feedback type="invalid" className="mb-3">
                            {errors.storyPic}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Button type="submit" onClick={handleSubmit} className="mt-3">Publish</Button>
                </Form>
            </Container>
    );
}

export default WriteStory;