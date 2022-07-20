import React, {useState} from 'react'
import {addDoc, collection} from "firebase/firestore";
import {Button, Form} from "react-bootstrap";
import {db, auth} from "../firebase-config";
import {upload} from "@testing-library/user-event/dist/upload";


function CommentForm(props) {
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
        const {commentText} = form
        const newErrors = {}

        //comment errors
        if (!commentText || commentText === '') newErrors.commentText = 'Comment must have text.'
        else if (commentText.length > 70) newErrors.commentText = 'Comment must be less than 800 characters.'

        return newErrors
    }

    const handleSubmit = e => {
        e.preventDefault()
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length>0) {
            //Form contains errors!
            setErrors(newErrors)
        } else {
            //no errors - submit comment to firebase!
            uploadComment();

        }
    }
    const commentCollectionRef = collection(db, "comments");

    const uploadComment = () => {
        const timestamp = new Date();
        const timestampString =
            timestamp.getHours() + ':' + (timestamp.getMinutes() < 10 ? "0"+timestamp.getMinutes(): timestamp.getMinutes()) + ", " +
            timestamp.getFullYear() + '-' + (timestamp.getMonth()+1) + "-" + timestamp.getDate();

        const docRef = addDoc(commentCollectionRef, {
            storyId: props.id,
            commenterName: auth.currentUser.displayName,
            commentTime: timestampString,
            commentText: form.commentText
        })
    }

    return (
        <div>
            <Form>
                <Form.Group>
                    <Form.Label>Write Comment</Form.Label>
                    <Form.Control
                        as="textarea" rows={3}
                        placeholder={props.isAuth ? "Leave a comment!" : "Sign in to leave a comment!"}
                        onChange={e => setField('commentText', e.target.value)}
                        isInvalid = {!!errors.commentText}
                        className="mb-1"
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.commentText}
                    </Form.Control.Feedback>
                </Form.Group>
                <Button type="submit" className="mt-1" onClick={handleSubmit} disabled={!props.isAuth}>Comment</Button>
            </Form>
        </div>
    )

}

export default CommentForm;