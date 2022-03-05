import React, { useEffect, useState } from "react";
import jwt from 'jwt-decode';
import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Tweet from "../components/Tweet";
import HeaderInTheBottom from "../components/HeaderInTheBottom";


const Bookmarks = () => {
    const url = window.location.href.split("/")
    const userName = url[url.length - 1]

    let cooks = document.cookie.split(";")
    let id;
    for (let index = 0; index < cooks.length; index++) {
        try {
            let a = jwt(cooks[index])
            if (a) {
                id = a.id
                //("le cookie est valid")
            }
        } catch (err) {
            console.error("this cookie are not valide")
        }
    }

    const [pounce, setPounce] = useState(false)
    const [tweetsToDisplay, setTweetsToDisplay] = useState([])
    const [onePounce, setOnePounce] = useState(true)

    const actuallyUser = useSelector(state => state.actuallyUserReducer)
    const tweetsReducer = useSelector(state => state.tweetsReducer)

    useEffect(() => {

        if (onePounce) {
            if (actuallyUser.saves) {
                setPounce(true);
                setOnePounce(false)
            } else {
                setOnePounce(false)
                setTimeout(() => {
                    setOnePounce(true)
                }, 500);
            }
        }
        if (pounce) {
            setTweetsToDisplay([])
            if (url[url.length - 2] === "bookmarks" && actuallyUser.saves) {
                if (userName === "with_replies") {
                    actuallyUser.saves.forEach(tweetId => {
                        tweetsReducer.forEach(tweet => {
                            if (tweet._id === tweetId && tweet.comments.length > 0||tweet.date+"" === tweetId+"" && tweet.comments.length > 0) {
                                setTweetsToDisplay(prev => [...prev, tweet])
                            }
                        })
                    })
                } else if (userName === "media") {
                    actuallyUser.saves.forEach(tweetId => {
                        tweetsReducer.forEach(tweet => {
                            if (tweet._id === tweetId && tweet.media !== undefined||tweet.date+""===tweetId+""&&tweet.media !== undefined) {
                                setTweetsToDisplay(prev => [...prev, tweet])
                            }
                        })
                    })
                } else if (userName === "likes") {
                    actuallyUser.saves.forEach(tweetId => {
                        tweetsReducer.forEach(tweet => {
                            if (tweet._id === tweetId||tweet.date+""===tweetId+"") {
                                actuallyUser.likes.forEach(tweetLike => {
                                    if (tweetLike === tweet._id||tweetLike+""===tweet.date+"") {
                                        setTweetsToDisplay(prev => [...prev, tweet])
                                    }
                                })
                            }
                        })
                    })
                }

            } else {
                if (url[url.length - 1] === "bookmarks" && url[url.length - 2] === "i") {
                    actuallyUser.saves.forEach(tweetId => {
                        tweetsReducer.forEach(tweet => {
                            if (tweet._id === tweetId || tweet.date+"" === tweetId+"") {
                                setTweetsToDisplay(prev => [...prev, tweet])
                            }
                        })
                    })
                }
            }
            setPounce(false)
        }
    }, [pounce, tweetsToDisplay, onePounce])


    const [tweetsNumberMax,setTweetsNumberMax] = useState(2)

    window.addEventListener('scroll', function(event){
        let element = event.target.scrollingElement;

        if (element.scrollHeight - element.scrollTop === element.clientHeight)
        {
            if(tweetsNumberMax<tweetsToDisplay.length){
                setTweetsNumberMax(prev=>prev+2)
            }
        }
    });

    return (
        <>
            {!id ? window.location.replace("/login") :
                <div className="HomePage">
                    <div className="head">
                        <Header />
                    </div>
                    <div className="principaleBookmarksCotainer">
                        <div className="containerOfPrncplContainer">
                            <div className="seeTweetsOfWorld">
                                <div className="tweetChoicer25">
                                    <div className="tweetChoicerBloc25">
                                        <div className="TweetsChoice">
                                            <NavLink onClick={() => { setPounce(true);setTweetsNumberMax(2) }} exact activeClassName="choiceActivedInProfile2513" to={"/i/bookmarks"}>Tweets</NavLink>
                                        </div>
                                        <div className="TweetsAndRepliesChoice">
                                            <NavLink onClick={() => { setPounce(true);setTweetsNumberMax(2) }} exact activeClassName="choiceActivedInProfile2513" to={"/i/bookmarks/with_replies"}>Tweets & replies</NavLink>
                                        </div>
                                        <div className="mediaChoice">
                                            <NavLink onClick={() => { setPounce(true);setTweetsNumberMax(2) }} exact activeClassName="choiceActivedInProfile2513" to={"/i/bookmarks/media"}>Media</NavLink>
                                        </div>
                                        <div className="likesChoice">
                                            <NavLink onClick={() => { setPounce(true);setTweetsNumberMax(2) }} exact activeClassName="choiceActivedInProfile2513" to={"/i/bookmarks/likes"}>Likes</NavLink>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bookmarksTweetsZone">

                                {tweetsToDisplay.length>0 ? tweetsToDisplay.filter((item, pos) => tweetsToDisplay.indexOf(item) == pos).map((tweet,index) => {
                                    return <>
                                        {index<=tweetsNumberMax&&<Tweet index={index} posterId={tweet.posterId} theTweet = {tweet} posterPseudo = {tweet.posterPseudo} style={{ marginBottom: "35.25px" }} posterName={tweet.posterName} userPicture={tweet.posterPicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} userId={actuallyUser._id} tweetId={tweet._id} likes={tweet.likes} date={tweet.date} user={actuallyUser} setJustOnePonce={setPounce} />}
                                    </>
                                }) : <div class="twitter-loader"></div>}
                            </div>
                        </div>
                        <HeaderInTheBottom/>
                    </div>
                </div>}
        </>
    )
}

export default Bookmarks