import React from 'react';
import {Col, Image, Row} from "react-bootstrap";
import {MdMenuBook} from "react-icons/md";
import {t} from "i18next";
import peopleReading from "../images/whitepeoplereadingabook.jpg"

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
                    <Image rounded width="600" src={peopleReading}/>
                </Col>
            </Row>
        </div>
    )
}

export default About;