import React, {useCallback, useEffect, useState} from 'react';
import {collection, getDocs, deleteDoc, doc, query, where} from "firebase/firestore";
import {db} from "../firebase-config";
import Storybook from "./Storybook";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import {MdOutlineSearch} from "react-icons/md";
import {t} from "i18next";


function Library() {
    const [storyList, setStoryList] = useState([]);
    const [filteredStoryList, setFilteredStoryList] = useState(null);
    const storiesCollectionRef = collection(db, "stories");

    const deleteStory = useCallback(async (id) => {
        const storyDoc = doc(db, "stories", id);
        await deleteDoc(storyDoc);
    }, []);

    useEffect(() => {
        const getStories = async () => {
            try {
                const data = await getDocs(storiesCollectionRef);
                setStoryList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
            } catch (error) {
                console.log(error);
            }
        };
        getStories();
    }, [deleteStory]);

    //FORM
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

    const findFormErrors = () => {
        const {year, operand} = form
        const newErrors = {}

        //year errors
        if (!year || year === '') newErrors.year = 'Please enter a year.'
        else if (year < 0) newErrors.year = 'Please enter a valid year.'

        //operand errors
        if (!operand || operand === '') newErrors.operand = 'Make a selection.'

        return newErrors
    }

    const handleSearchSubmit = e => {
        e.preventDefault()
        const newErrors = findFormErrors();
        if (Object.keys(newErrors).length > 0) {
            //Form contains errors!
            setErrors(newErrors)
        } else {
            //no errors - search
            const q = query(storiesCollectionRef, where("year", form.operand, form.year))
            searchStories(q);
        }
    }

    const searchStories = async (q) => {
        try {
            const data = await getDocs(q);
            setFilteredStoryList(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <h3 id="library">{t("library_header")}</h3>
            <p>{t("library_text")}</p>
                <Form>
                    <Row>
                        <Col xl={2}>
                            <Form.Group controlId="formGridState">
                            <Form.Select
                                defaultValue="Sort by"
                                onChange={e => setField('operand', e.target.value)}
                                isInvalid={!!errors.operand}
                            >
                                <option value=''>{t("search_search")}</option>
                                <option value='<='>{t("search_before")}</option>
                                <option value='=='>{t("search_during")}</option>
                                <option value='>='>{t("search_after")}</option>
                            </Form.Select>
                            <Form.Control.Feedback type='invalid'>
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        </Col>
                        <Col>
                            <InputGroup>
                            <InputGroup.Text id="basic-addon1"><MdOutlineSearch/> {t("year")} </InputGroup.Text>
                            <Form.Control
                                type="number"
                                placeholder="yyyy"
                                onChange={e => setField('year', e.target.value)}
                                isInvalid={!!errors.year}
                            />
                            <Button variant="outline-primary" type="submit" onClick={handleSearchSubmit}>
                                {t("search_search")}
                            </Button>
                            <Button variant="outline-danger"onClick={() => setFilteredStoryList(null)}>{t("search_clear")}</Button>
                                <Form.Control.Feedback type="invalid">
                                    {errors.year}
                                </Form.Control.Feedback>
                        </InputGroup>
                        </Col>
                    </Row>
                </Form>
            <Row>
                {filteredStoryList && filteredStoryList.map((story) => {
                    return <Storybook title={story.title} author={story.authorName} href={`/story/${story.id}`}/>
                })}


                {(filteredStoryList === null) && storyList.map((story) => {
                    return <Storybook title={story.title} author={story.authorName} href={`/story/${story.id}`}/>
                })}
            </Row>
        </>
    );
}

export default Library;