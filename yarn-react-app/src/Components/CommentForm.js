import React, {useState} from 'react'
import {addDoc, collection} from "firebase/firestore";
import {Button, Form} from "react-bootstrap";
import {db, auth} from "../firebase-config";
import {upload} from "@testing-library/user-event/dist/upload";


function CommentForm(props) {
    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});
    const [commentTest, setCommentTest] = useState("");

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
        else if (commentText.length > 800) newErrors.commentText = 'Comment must be less than 800 characters.'

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

    const uploadComment = async () => {
        const timestamp = new Date();
        const timestampString =
            timestamp.getHours() + ':' + (timestamp.getMinutes() < 10 ? "0"+timestamp.getMinutes(): timestamp.getMinutes()) + ", " +
            timestamp.getFullYear() + '-' + (timestamp.getMonth()+1) + "-" + timestamp.getDate();

        const docRef = await addDoc(commentCollectionRef, {
            storyId: props.id,
            commenterName: auth.currentUser.displayName,
            commenterPic: auth.currentUser.photoURL,
            commentTime: timestampString,
            commentText: form.commentText
        });
        window.location.reload();
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