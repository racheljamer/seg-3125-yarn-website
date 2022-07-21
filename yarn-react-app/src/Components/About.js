import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {MdMenuBook} from "react-icons/md";
import {t} from "i18next";

//strings (to be exported to a string file later?)
const aboutStr = "Everyone has a story to tell, and here - you can read it. " +
    "Family stories, passed down through generations of storytellers around the" +
    " world, are stored in Yarn's virtual library. We aim to provide a place to " +
    "explore, read, and share your story with friends and family.";

function About() {
    return (
        <div className="p-4">
            <h3>{t("about_header")} <MdMenuBook/></h3>
            <Row className="mr-2">
                <Col>
                    <p>{t("about_text")}</p>
                    <h5>{t("explore_header")}</h5>
                    <p>{t("explore_text")}</p>
                    <h5>{t("read_header")}</h5>
                    <p>{t("read_text")}</p>
                    <h5>{t("write_header")}</h5>
                    <p>{t("write_text")} <a href="/WriteStory">{t("write_link")}</a></p>
                </Col>
                <Col>
                    <Image rounded src="https://picsum.photos/600/400"/>
                </Col>
            </Row>
        </div>
    )
}

export default About;