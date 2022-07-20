import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    ButtonGroup,
    Col,
    Container,
    Image,
    Offcanvas,
    Overlay,
    OverlayTrigger,
    Row,
    Tooltip
} from "react-bootstrap";
import "./ReadStory.css";
import Comment from "../Components/Comment";
import {MdShare, MdBookmark, MdOutlineAdd} from "react-icons/md";
import {db} from "../firebase-config";
import {IoMdHeart} from "react-icons/io";
import {RiFontSize} from "react-icons/ri"
import {GoDash} from "react-icons/go"
import {useLocation, useParams} from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

const storyPlaceholder = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus accumsan ante at varius. Donec odio erat, efficitur non mauris eget, egestas euismod magna. Duis ac felis ac nisl tempor venenatis vitae eget turpis. Nulla erat augue, molestie vitae neque venenatis, maximus pharetra arcu. Ut suscipit semper diam at commodo. Duis maximus ante laoreet porta maximus. Pellentesque a fermentum odio, in rutrum lectus.\n" +
    "\n" +
    "Nulla facilisi. Nullam metus ex, rutrum in tellus sit amet, venenatis gravida nisl. Praesent consequat, dui vitae blandit fermentum, tortor tortor mattis lectus, ac facilisis enim quam at mi. Curabitur id ullamcorper nisl. Morbi ullamcorper mauris eu turpis malesuada, vel volutpat felis venenatis. Ut eu pellentesque nisi, sit amet consectetur ipsum. Nullam ultricies, est et mattis lobortis, orci felis volutpat purus, quis sagittis nulla neque vitae dui. Aliquam a dui sed ligula suscipit venenatis. Aenean vel gravida felis. Quisque dignissim leo vitae semper sodales. Suspendisse a molestie diam. Phasellus feugiat vulputate nisi in venenatis. Maecenas scelerisque finibus sapien sit amet ultricies.\n" +
    "\n" +
    "Etiam nec ex arcu. Integer posuere diam eget nibh varius pellentesque eget ut nulla. Fusce sed dolor metus. Nulla nibh ligula, dictum et rhoncus at, finibus eu nibh. Donec tincidunt id nisl vel dictum. Aliquam at tellus a massa imperdiet fringilla at ut turpis. Ut odio mauris, pharetra vitae venenatis consectetur, faucibus vel ligula. Aenean ac velit quis enim bibendum viverra lacinia non magna. Mauris et nulla vestibulum, lobortis nunc vel, lacinia ante.\n" +
    "\n" +
    "Mauris at gravida felis, sit amet ultrices leo. Quisque vel maximus dolor. Phasellus accumsan, leo sed viverra tempus, leo augue congue ipsum, ac rhoncus leo neque id augue. Proin nec ipsum in ex commodo euismod. Nunc suscipit convallis metus, non fermentum ante tempor et. Aliquam ut dignissim eros. Sed ac tortor arcu. Etiam sit amet iaculis elit. Maecenas bibendum mi dolor, sed vulputate neque condimentum vitae. Cras placerat mauris dolor. Maecenas tempus maximus metus lacinia vestibulum. Phasellus nec mauris eget libero sodales pretium et quis felis. Duis urna elit, tempus non tellus quis, fermentum cursus ipsum. Fusce tortor mi, ultricies sit amet pretium sit amet, gravida non lorem.\n" +
    "\n" +
    "Donec porta eros ac mauris accumsan egestas. Aenean metus odio, convallis sed mauris convallis, efficitur volutpat orci. Donec porttitor, odio nec fringilla bibendum, risus quam iaculis sapien, iaculis feugiat magna urna eu risus. Vivamus ac fringilla lacus. In ornare interdum augue sed pulvinar. Nulla a tellus ante. Nulla molestie vehicula lobortis. Mauris sed lectus non ligula viverra finibus quis at risus. Nam molestie ipsum at lacus iaculis ornare nec ac est. Etiam at sem interdum, euismod lectus eu, tincidunt nunc. In auctor erat nec odio faucibus gravida. Suspendisse auctor enim eget massa volutpat gravida quis sit amet dui. Maecenas at tellus purus. Cras egestas dictum dolor id commodo. Nunc vel elit tellus. Duis mollis mattis massa eget cursus.";

function ReadStory() {
    const {id} = useParams();

    //socials
    const [isBookmarked, setIsBookmarked] = useState (false);
    const [isLiked, setIsLiked] = useState (false);
    const [isCopied, setIsCopied] = useState(false);
    const target = useRef(null);


    //font size change
    const [fontSize, setFontSize] = useState(14);

    //Author Off-canvas
    const [showAuthor, setShowAuthor] = useState(false);
    const [story, setStory] = useState({
        author: {
            name: "",
            id: ""
        }
    });
    const [author, setAuthor] = useState({}); //eventually need to show author bio

    const handleClose = () => setShowAuthor(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShowAuthor(true);
    }

    const handleBookmark = () => setIsBookmarked(!isBookmarked);
    const handleLike = () => setIsLiked(!isLiked);
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(!isCopied);
    }

    //firestore get doc by id
    const docRef = doc(db, 'teststories', id);


    useEffect(() => {
        const getStory = async() => {
            try {
                const data = await getDoc(docRef)
                    .then((doc) => {
                        setStory({...doc.data()})
                        console.log(doc.data(), doc.id)
                    })
            } catch (error) {
                console.log(error);
            }
        }
        getStory();
    }, [])


    //const story = db.collection('teststories').doc(id).get();

    return (
        <Container>
            <h3 className="mt-5 text-center">{story.title}</h3>
            <div className="d-flex">
                <h5 className="my-2">Story by: <a as={Button} onClick={handleShow} href="">{story.author.name}</a></h5>
                <span className="ms-auto d-inline-block align-top mb-2 ">
                    <p className="mb-0">Font Size</p>
                    <ButtonGroup>
                        <Button variant="outline-primary" > - </Button>
                        <Button variant="outline-primary">+</Button>
                    </ButtonGroup>
                </span>

            </div>
            <p className="content" >
                {story.storyText}
            </p>
            <Image src={story.picture} width="50%" className="rounded my-2"/>
            <div id="Interactions" className="d-flex">
                <Button className="btn ms-auto" onClick={handleShare} ref={target}><MdShare/> Share </Button>
                <Overlay target={target.current} placement={'top'} show={isCopied}>
                    {(props) => (
                        <Tooltip {...props}>
                            Link copied to clipboard!
                        </Tooltip>
                    )
                    }
                </Overlay>
                <Button className="btn mx-1"
                        variant={isBookmarked ? "secondary" : "primary"}
                        onClick={handleBookmark}>
                    <MdBookmark
                        color={isBookmarked ? "#eac868" : "white"}/>
                    {isBookmarked ? "Un-b" : "B"}ookmark
                </Button>
                <Button className="btn" variant={isLiked ? "secondary" : "primary"} onClick={handleLike}><IoMdHeart color={isLiked ? "#e07a7f" : "white"}/> {isLiked ? "Un-l" : "L"}ike </Button>
            </div>



            <hr/>
            <h4>Comments</h4>
            <Comment/>
            <Comment/>


            <Offcanvas show={showAuthor} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>About the Author</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div align="center">
                        <Image className="w-75" thumbnail src="https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"/>
                        <h4 className="mt-2">{story.author.name}</h4>
                    </div>
                    <h5>Biography</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam rhoncus accumsan ante at varius. Donec odio erat, efficitur non mauris eget, egestas euismod magna. Duis ac felis ac nisl tempor venenatis vitae eget turpis.</p>
                </Offcanvas.Body>
            </Offcanvas>

        </Container>
    );
}

export default ReadStory;