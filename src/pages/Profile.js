import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import followIcon from '../imports/follow.svg';
import { useDispatch } from 'react-redux';
import { followUserTypeTwo, unFollowUserTypeTwo } from '../Actions/usersAction';
import SeeFollowInfo from '../components/SeeFollowInfo';
import { NavLink } from 'react-router-dom';
import Tweet from '../components/Tweet';
import jwt from 'jwt-decode';
import HeaderInTheBottom from '../components/HeaderInTheBottom';

const Profile = () => {
    const actuallyUser = useSelector(state => state.actuallyUserReducer);
    const url = window.location.href.split("/")
    const userName = url[url.length - 1] === "likes" || url[url.length - 1] === "media" || url[url.length - 1] === "with_replies" ? url[url.length - 2] : url[url.length - 1]
    const dispatch = useDispatch()

    const [followType, setFollowType] = useState("Follow")
    const [props, setProps] = useState({})
    const [isUser, setIsUser] = useState(false)
    const [pounce, setPounce] = useState(true)
    const [isActuallyUser, setIsActuallyUser] = useState(true)
    const [canSeeFollowInfo, setCanSeeFollowInfo] = useState(false)
    const [isFollowingType, setIsFollowingType] = useState(false)

    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const [isFollowingButton, setIsFollowingButton] = useState("")
    const [buttonIsDisabled, setButtonIsDisabled] = useState(false)

    const [TweetsToDisplay, setTweetsToDisplay] = useState([])
    const [justOnePonce, setJustOnePonce] = useState(true)

    const [userToSee, setUserToSee] = useState({})

    const [randomPounce,setRandomPounce] = useState(true)

    window.onload = () => { setJustOnePonce(true);setPounce(true);setRandomPounce(!randomPounce) }

    const tweetsReducer = useSelector(state => state.tweetsReducer)
    useEffect(async () => {

        if (justOnePonce) {
            await axios.get("https://tweeter-clone-back-22.onrender.com/auth/getuserwithname/" + url[4] + "").then(res => {
                if (res.data) {
                    if (!res.data.error) {
                        setUserToSee(res.data)
                    } else {
                        console.error(res.data.error)
                    }
                } else {
                    console.error("data introuvable")
                }
            }).catch(err => {
                console.error(err)
                return null;
            })

            if (userToSee !== null && userToSee.replies) {
                //("voici le user")
                //(userToSee)
                setTweetsToDisplay([])
                //("nous verifiion les replies du user")
                //(TweetsToDisplay)
                if (url[url.length - 1] === "with_replies") {
                    userToSee.replies.forEach(tweet => {
                        tweetsReducer.forEach(tweetReducer => {
                            if (tweetReducer._id === tweet) {
                                setTweetsToDisplay(prev => [...prev, tweetReducer])
                            }
                        })
                    })
                }
                else if (url[url.length - 1] === "media") {
                    const tweetsToDisplay = [...userToSee.tweets]
                    tweetsToDisplay.forEach(tweet => {
                        tweetsReducer.forEach(twt => {
                            if (twt._id === tweet) {
                                if (twt.media !== undefined) {
                                    setTweetsToDisplay(prev => { return [...prev, twt] })
                                }
                            }
                        })
                    })
                } else if (url[url.length - 1] + "" === "likes") {
                    //("dans le condition poou likes est la")
                    userToSee.likes.forEach(tweet => {
                        tweetsReducer.forEach(tweetReducer => {
                            if (tweetReducer._id === tweet||tweetReducer.date+""===tweet+"") {
                                setTweetsToDisplay(prev => [...prev, tweetReducer])
                            }
                        })
                    })
                } else {
                    const tweetsBox = []
                    tweetsReducer.forEach(tweetReducer=>{
                        console.log("aaaaah ca verify ca verify tkt mm pas")
                        tweetReducer.retweets.forEach(retweet=>{
                            if(retweet===userToSee._id||retweet+""===userToSee.date+""){
                                tweetsBox.push(tweetReducer)
                            }
                        })
                        if(tweetReducer.posterId===userToSee._id){
                            tweetsBox.push(tweetReducer)
                        }
                    })
                    const allFTweets = [...new Set(tweetsBox)]
                    setTweetsToDisplay(allFTweets)
                    /*
                    userToSee.tweets.forEach(tweet => {
                        tweetsReducer.forEach(tweetReducer => {
                            if (tweetReducer._id === tweet) {
                                //("corelation tweet dans la catégorie TWEETS")
                                setTweetsToDisplay(prev => [...prev, tweetReducer])
                            } else {
                                //("not corelation in TWEETS CAT")
                            }
                        })
                    })
                    */
                }
                //("vocici le urtlname")
                //(url[url.length - 1])
                setJustOnePonce(false)
            } else {
                console.error("le user est null")
                //(userToSee)
            }
        }

        if (pounce) {
            //("je suis lu tkt meme pas")
            await axios.get("https://tweeter-clone-back-22.onrender.com/auth/getuserwithname/" + userName).then(async res => {
                if (!res.data) {
                    console.error("l'utilisteur n'existe pas")
                    setIsUser(false)
                } else {
                    setProps({
                        coverPicture: res.data.coverPicture,
                        userPicture: res.data.profilePicture,
                        userName: res.data.pseudo,
                        followersMember: res.data.followers.length,
                        followingsMember: res.data.followings.length,
                        bioText: res.data.bio,
                        _id: res.data._id,
                        followers: res.data.followers,
                        followings: res.data.followings,
                        tweets: res.data.tweets,
                        replies: res.data.replies,
                        retweets: res.data.retweets,
                        name: res.data.name
                    })
                    if (res.data.pseudo === actuallyUser.pseudo) {
                        setIsActuallyUser(true)
                    } else {
                        setIsActuallyUser(false)
                    }

                    res.data.followers.forEach(flw => {
                        if (flw === actuallyUser._id) {

                            setIsFollowingButton("isFollowingButton")
                            setFollowType("Following")
                            setIsFollowingType(true)
                        } else {
                            setIsFollowingButton("")
                            setFollowType("Follow")
                            setIsFollowingType(false)
                        }
                    })
                    setIsUser(true)
                }
            }).catch(err => {
                console.error(err)
            })

            setPounce(false)
        }
    }, [props, userToSee, pounce, isUser, isActuallyUser, followings, followers, isFollowingButton, justOnePonce,randomPounce])


    let cooks = document.cookie.split(";")
    let id;
    for (let index = 0; index < cooks.length; index++) {
        try {
            let a = jwt(cooks[index])
            if (a) {
                id = a.id
            }
        } catch (err) {
            console.error("this cookie are not valide")
        }
    }
    const [specialPounce,setSpecialPounce] = useState(true)
    const onClickInFollowInformations = (isFollowingType) => {
        setCanSeeFollowInfo(!canSeeFollowInfo)
        setIsFollowingType(isFollowingType)
    }
    return (
        <>
            {!id ? window.location.replace("/login") : <>{ canSeeFollowInfo &&
                <SeeFollowInfo user={props} exitFunc={onClickInFollowInformations} userName="yanis kerrouche" isFollowingType={isFollowingType} />
            }
            <Header />
            {isUser ? <div className="userProfile">
                <div className="topPart">
                    {props.coverPicture === null ?
                        <div className="coverPicture undefinedPhoto"></div> :
                        <div style={{ overflow: "hidden" }} className="coverPicture">
                            <img style={{ width: "100%", height: "300%" }} src={props.coverPicture} alt="coverPicture" />
                        </div>}
                </div>
                <div className="bottomPart">
                    <div className="userBlocInformations">
                        <div className="pictureZone2ae">
                            <img className="userPicture" src={props.userPicture} alt="user" />
                        </div>
                        <div className="textInformationsZone">
                            <div className="nameAndFollowInformations">
                                <div className="nameInfo">
                                    <h3 style={{ marginBottom: "0" }} className="userName bold">{props.name}</h3>
                                    <p style={{
                                        margin: "0",
                                        fontSize: '0.8em',
                                        marginBottom: '3px'
                                    }} className="completePseudo griser">@{props.userName}</p>
                                </div>
                                <div className="followInfo">
                                    <p onClick={() => onClickInFollowInformations(false)} className="linkName"><span className="bold">{props.followersMember}</span><span className="griser">Followers</span></p>
                                    <p onClick={() => onClickInFollowInformations(true)} className="linkName"><span className="bold">{props.followingsMember}</span><span className="griser">Followings</span></p>
                                </div>
                            </div>
                            <div className="bioText">
                                <p className="griser">{props.bioText}</p>
                            </div>
                        </div>
                        {isActuallyUser ?
                            <div className="editActuallyUser">
                                <NavLink style={{ color: "white" }} to={"/profile/settings/" + actuallyUser.pseudo}>
                                    <p>Edit user</p>
                                </NavLink>
                            </div> :
                            <div className="followUserButton">
                                <button disabled={buttonIsDisabled} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: 'space-evenly'
                                }} onClick={() => {
                                    setPounce(true)

                                    let button = document.querySelector(".userProfile .bottomPart .followUserButton button")
                                    if (isFollowingButton === "isFollowingButton") {

                                        dispatch(unFollowUserTypeTwo(props._id, actuallyUser._id, button, setIsFollowingButton, setFollowType, setButtonIsDisabled, setIsFollowingType, null))

                                        //("la on dispatch")
                                    } else {
                                        dispatch(followUserTypeTwo(props._id, actuallyUser._id, button, setIsFollowingButton, setFollowType, setButtonIsDisabled, setIsFollowingType, null))

                                    }
                                }} id="followButton" className={`btn followBTN ${isFollowingButton}`}><>{isFollowingType === false ? <img alt="follow" src={followIcon} /> : null}</>   <p>{followType}</p></button>
                            </div>}
                    </div>
                    <div style={{ display: "flex" }} className="seeTweetsOfUser">
                        <div className="tweetChoicer25">
                            <div className="tweetChoicerBloc25">
                                <div className="TweetsChoice">
                                    <NavLink onClick={() => { setJustOnePonce(true) }} exact activeClassName="choiceActivedInProfile2513" to={"/user/" + props.userName}>Tweets</NavLink>
                                </div>
                                <div className="TweetsAndRepliesChoice">
                                    <NavLink onClick={() => { setJustOnePonce(true) }} exact activeClassName="choiceActivedInProfile2513" to={"/user/" + props.userName + "/with_replies"}>Tweets and replies</NavLink>
                                </div>
                                <div className="mediaChoice">
                                    <NavLink onClick={() => { setJustOnePonce(true) }} exact activeClassName="choiceActivedInProfile2513" to={"/user/" + props.userName + "/media"}>media</NavLink>
                                </div>
                                <div className="likesChoice">
                                    <NavLink onClick={() => { setJustOnePonce(true) }} exact activeClassName="choiceActivedInProfile2513" to={"/user/" + props.userName + "/likes"}>likes</NavLink>
                                </div>
                            </div>
                        </div>
                        <div className="allTweetsAndInformationsOfAPerson213">
                            {TweetsToDisplay.sort((a, b) => b.date - a.date).map((tweet,index) => {
                                return <Tweet posterId = {tweet.posterId} posterPseudo = {tweet.posterPseudo} theTweet = {tweet} index = {index} EmptyConfig={tweet.EmptyConfig} userFollowings={tweet.userFollowings} posterName={tweet.posterName} user={actuallyUser} key={index} likes={tweet.likes} userId={actuallyUser._id} tweetId={tweet._id} date={tweet.date} userPicture={actuallyUser.profilePicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} />;
                                //return <Tweet posterPseudo = {tweet.posterPseudo} pounceOfTweet = {pounceOfRealTweet} EmptyConfig={tweet.EmptyConfig} userFollowings={tweet.userFollowings} posterName={tweet.posterName} user={user} key={index} likes={tweet.likes} userId={user._id} tweetId={tweet._id} date={tweet.date} userPicture={tweet.posterPicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} />;
                            })}
                        </div>
                    </div>
                </div>
                <HeaderInTheBottom/>
            </div> : <div className="twitter-loader"></div>
            }</>}

        </>
    )
}

export default Profile