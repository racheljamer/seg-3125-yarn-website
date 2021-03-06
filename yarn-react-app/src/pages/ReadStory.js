import React, {useEffect, useRef, useState} from 'react';
import {
    Button,
    ButtonGroup,
    Container,
    Image,
    Offcanvas,
    Overlay,
    Tooltip
} from "react-bootstrap";
import "./ReadStory.css";
import Comment from "../Components/Comment";
import {MdShare, MdBookmark} from "react-icons/md";
import {db} from "../firebase-config";
import {IoMdHeart} from "react-icons/io";
import {useParams} from "react-router-dom";
import {collection, doc, getDoc, getDocs, query, where} from "firebase/firestore";
import CommentForm from "../Components/CommentForm";

function ReadStory({isAuth}) {
    const {id} = useParams();

    //socials
    const [isBookmarked, setIsBookmarked] = useState (false);
    const [isLiked, setIsLiked] = useState (false);
    const [isCopied, setIsCopied] = useState(false);
    const target = useRef(null);


    //font size change
    const [fontSize, setFontSize] = useState(16);
    const handleFontPlus = () => {
        setFontSize(fontSize+1);
    }
    const handleFontMinus = () => {
        setFontSize(fontSize-1);
    }

    //Author Off-canvas
    const [showAuthor, setShowAuthor] = useState(false);
    const [story, setStory] = useState({});
    const [commentList, setCommentList] = useState([]);

    const handleClose = () => setShowAuthor(false);
    const handleShow = (e) => {
        e.preventDefault();
        setShowAuthor(true);
    }

    //social buttonclicks
    const handleBookmark = () => setIsBookmarked(!isBookmarked);
    const handleLike = () => setIsLiked(!isLiked);
    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setIsCopied(!isCopied);
    }

    //firestore get story doc by id
    const docRef = doc(db, 'stories', id);
    const commentsRef = collection(db, 'comments');
    const q = query(commentsRef, where("storyId", "==", id));

    useEffect(() => {
        const getStory = async() => {
            try {
                const data = await getDoc(docRef)
                    .then((doc) => {
                        setStory({...doc.data(), id: doc.id})
                    })
            } catch (error) {
                console.log(error);
            }
        }
        const getComments = async() => {
            try {
                const data = await getDocs(q);
                setCommentList(data.docs.map(doc => ({...doc.data(), cId: doc.id})));
            } catch (e) {
                console.log(e)
            }
        }
        getStory();
        getComments();
    }, [])


    return (
        <Container>
            <h3 className="mt-5 text-center">{story.title}</h3>
            <div className="d-flex">
                <h5 className="my-2">Story by: <a as={Button} onClick={handleShow} href="">{story.authorName}</a></h5>
                <span className="ms-auto d-inline-block align-top mb-2 ">
                    <p className="mb-0">Font Size</p>
                    <ButtonGroup>
                        <Button variant="outline-primary" onClick={handleFontMinus}> - </Button>
                        <Button variant="outline-primary" onClick={handleFontPlus}>+</Button>
                    </ButtonGroup>
                </span>

            </div>
            <p className="content" style={{fontSize: fontSize}}>
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
            <CommentForm id={story.id} isAuth={isAuth}/>
            {commentList.map((comment) => {
                return <Comment
                    name={comment.commenterName}
                    time={comment.commentTime}
                    text={comment.commentText}
                    picture={comment.commenterPic}
                />
            })}

            <Offcanvas show={showAuthor} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>About the Author</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div align="center">
                        <Image className="w-75" thumbnail src={story.authorPic}/>
                        <h4 className="mt-2">{story.authorName}</h4>
                    </div>
                    <h5>Biography</h5>
                    <p>{story.authorName} is an illustrious author.</p>
                </Offcanvas.Body>
            </Offcanvas>

        </Container>
    );
}

export default ReadStory;