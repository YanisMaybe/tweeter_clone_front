import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commentOneTweet, likeTweet, retweetTweet, saveTweet, unLikeTweet, unRetweetTweet, unSaveTweet } from '../Actions/postActions';
import ProfileBloc from './ProfileBloc';
import crypto from 'crypto';
import Comment from './Comment';
import axios from 'axios';

const Tweet = ({ weAreInTheProfilePage,setVerySpecialPounce, theTweet,specialPounce,indexTwo,index, pounceOftweet,posterId, posterPseudo, posterName, userPicture, comments, saves, retweets, message, media, userId, tweetId, likes, date, user, setJustOnePonce, EmptyConfig, setAnotherPounce }) => {
    const myId = "TweetNumnber" + index;
    const dispatch = useDispatch();

    const allTweets = useSelector(state => state.tweetsReducer)
    const actuallyUser = useSelector(state => state.actuallyUserReducer)
    const allUsers = useSelector(state => state.usersReducer)

    const [userProfilePicture,setUserProfilePicture] = useState(`https://tweeter-clone-back-22.onrender.com/images/${posterId}.jpg`)
    const [userProfileName,setUserProfileName] = useState("")

    
    
    useEffect(()=>{
        let weCan = true
        allUsers.forEach(usr=>{
            if(usr._id===theTweet.posterId){
                weCan = false
            }
        })
        if(weCan){
            if(setVerySpecialPounce){
                setVerySpecialPounce(true)
            }
        }
        if(setVerySpecialPounce){
            setVerySpecialPounce(true)
        }
    },[setVerySpecialPounce])

    const [likeButtonClass, setLikeButtonClass] = useState("likeButton")
    const [saveButtonClass, setSaveButtonClass] = useState("saveButton")
    const [retweetButtonClass, setRetweetButtonClass] = useState("retweetButtonM")
    const [isClickigInComment, setIsClickingInComment] = useState(false);

    const [initialCommentsLength, setInitialCommentsLength] = useState(comments ? comments.length : 0)
    const [commentsLength, setCommentsLength] = useState(2)

    const onClickInRetweetBtn = () => {
        if (setJustOnePonce) {
            setJustOnePonce(true)
        }

        let retweetButton = document.getElementById(myId).children[3].children[1]
        if (retweetButton.classList[0] === "retweetButtonM") {
            retweetButton.children[1].textContent = "Retweeted"
            retweetButton.classList.replace("retweetButtonM", "retweetedButtonM")
            dispatch(retweetTweet(userId, theTweet.date))
        } else if (retweetButton.classList[0] === "retweetedButtonM") {
            //("on est lu")
            retweetButton.children[1].textContent = "Retweet"
            retweetButton.classList.replace("retweetedButtonM", "retweetButtonM")
            dispatch(unRetweetTweet(userId, theTweet.date))
        }
    }
    const onClickInLikeButton = () => {
        if (setJustOnePonce) {
            setJustOnePonce(true)
        }
        let likeButton = document.getElementById(myId).children[3].children[2]
        if (likeButton.classList[0] === "likeButton") {
            likeButton.children[1].textContent = "Liked"
            likeButton.classList.replace("likeButton", "likedButton")
            setTimeout(() => {
                dispatch(likeTweet(userId, theTweet.date))
                if (setJustOnePonce) {
                    setJustOnePonce(true)
                }
            }, 200);
        } else if (likeButton.classList[0] === "likedButton") {
            likeButton.children[1].textContent = "Like"
            likeButton.classList.replace("likedButton", "likeButton")
            dispatch(unLikeTweet(userId, theTweet.date))
            if (setJustOnePonce) {
                setJustOnePonce(true)
            }
        }
    }
    const onClickInSaveButton = () => {

        if (setJustOnePonce) {
            setJustOnePonce(true)
        }
        let saveButton = document.getElementById(myId).children[3].children[3]
        if (saveButton.classList[0] === "saveButton") {
            setSaveButtonClass("savedButton")
            dispatch(saveTweet(userId, theTweet.date))
        } else if (saveButton.classList[0] === "savedButton") {
            saveButton.children[1].textContent = "Save"
            saveButton.classList.replace("savedButton", "saveButton")
            setSaveButtonClass("saveButton")
            //("le nom de la classe a été changé en:  " + saveButtonClass)
            dispatch(unSaveTweet(userId, theTweet.date))
            if (setJustOnePonce) {
                setJustOnePonce(true)
            }
        }
    }

    const [pounce, setPounce] = useState(pounceOftweet)
    //ne touche pas celui la
    const [oneDefPounce, setOneDefPounce] = useState(true)
    useEffect(() => {
        if (oneDefPounce && allTweets.length > 0) {
            if (!EmptyConfig && (saves.length > 0 || retweets.length > 0 || likes.length > 0)) {
                allTweets.forEach(tweet => {
                    if (tweet._id === tweetId) {
                        tweet.likes.forEach(tweetLike => {
                            if (tweetLike === userId) {
                                setLikeButtonClass("likedButton")
                            }
                        })
                        tweet.saves.forEach(tweetSave => {
                            if (tweetSave === userId) {
                                setSaveButtonClass("savedButton")
                            }
                        })
                        tweet.retweets.forEach(tweetRtw => {
                            if (tweetRtw === userId) {
                                setRetweetButtonClass("retweetedButtonM")
                            }
                        })
                    }
                })
                setOneDefPounce(false)
            } else if (EmptyConfig && saves.length === 0 && retweets.length === 0 && likes.length === 0) {
                setRetweetButtonClass("retweetButtonM");
                setSaveButtonClass("saveButton");
                setLikeButtonClass("likeButton");
                setOneDefPounce(false)

                let commentButton = document.getElementById("commentButton_dza56dzda156da");
                let retweetButton = document.getElementById("retweetButton_dazd2ad1za3d");
                let likeButton = document.getElementById("likeButton_dsq21dqs56d1q894fr89t");
                let saveButton = document.getElementById("SaveParent_1t56h151cqs231z");

                likeButton.children[0].style = "color:#4f4f4f";
                likeButton.children[1].style = "fill:#4f4f4f";
                retweetButton.children[0].style = "color:#4f4f4f";
                retweetButton.children[1].style = "fill:#4f4f4f";
                saveButton.children[0].style = "color:#4f4f4f";
                saveButton.children[1].style = "fill:#4f4f4f";

                likeButton.children[1].textContent = "Like";
                retweetButton.children[1].textContent = "retweet";
                saveButton.children[1].textContent = "save";

            } else if (EmptyConfig) {
                //("le troisiéme cas dangeureux !! ")
            }
        }
    }, [likeButtonClass, saveButtonClass, retweetButtonClass, pounce, oneDefPounce])

    setTimeout(() => {
        setOneDefPounce(true)
    }, 1000);

    const onSubmitInComment = e => {
        e.preventDefault();

        //(e.target[1].files[0])
        if (!e.target[1].files[0] && !e.target[0].value) {
            console.error("erreur: tout les champs sont vides")
            e.target[0].parentElement.classList.add("errorInputVibration")
            setTimeout(() => {
                e.target[0].parentElement.classList.remove("errorInputVibration")
            }, 750);
        }
        else {
            if (e.target[1].files[0]) {
                dispatch(commentOneTweet(tweetId, userId, user.pseudo, user.profilePicture, e.target[0].value, e.target[1].files[0]))
            } else {
                dispatch(commentOneTweet(tweetId, userId, user.pseudo, user.profilePicture, e.target[0].value, null))
            }
            setCommentsLength(commentsLength + 1)
        }
        if (setJustOnePonce) {
            setJustOnePonce(true)
            //("on le set tres bien la !!!!!!")
        }
        e.target[1].value = null
        e.target[0].value = ""
    }

    useEffect(()=>{
        document.getElementById(messageId).innerHTML = `<p>${message}</p>`
    },[specialPounce])

    
    const [messageId,setMessageId] = useState(Math.random().toString(16).slice(2))
    
    
    return (
        <>
            {comments && saves && retweets && <div className="Tweet" id={myId}>
                <div className="head">
                    <ProfileBloc posterId = {theTweet.posterId} setAnotherPounce={setAnotherPounce} posterPseudo = {posterPseudo} name={posterName} date={date} userPicture={setUserProfilePicture} />
                </div>
                <div className="content">
                    <div className="message">
                        <p id={messageId} className='theMessageSpe'>{message}</p>
                    </div>
                    {media && <div className="potontialPicture">
                        <img src={media} alt="potontial" />
                    </div>}
                    {comments && saves && retweets && <div className="statistiques">
                        <p className="numberOfComments griser">{comments.length} comments</p>
                        <p className="numberOfRetweets griser">{retweets.length} retweets</p>
                        <p className="numberOfSaves griser">{saves.length} saves</p>
                    </div>}
                </div>
                <div style={{
                    marginTop: '-4px'
                }} className="transistor"></div>
                <div className="interactionZone">
                    <div id="commentButton_dza56dzda156da" onClick={e => setIsClickingInComment(!isClickigInComment)} className="commentButton btn interactionButton">
                        <svg fill="#4F4F4F" height="16.67" viewBox="0 0 512 512" width="16.67" xmlns="http://www.w3.org/2000/svg"><path d="m456.835938 0h-401.667969c-30.421875 0-55.167969 24.746094-55.167969 55.167969v294.238281c0 30.417969 24.746094 55.164062 55.167969 55.164062h127.296875l42.15625 84.316407c7.34375 14.6875 18.78125 23.113281 31.378906 23.113281s24.035156-8.425781 31.378906-23.113281l42.160156-84.316407h127.296876c30.417968 0 55.164062-24.746093 55.164062-55.164062v-294.238281c0-30.421875-24.746094-55.167969-55.164062-55.167969zm25.164062 349.40625c0 13.875-11.289062 25.164062-25.164062 25.164062h-136.566407c-5.683593 0-10.875 3.210938-13.417969 8.292969l-46.304687 92.605469c-1.867187 3.734375-3.621094 5.570312-4.546875 6.273438-.925781-.703126-2.679688-2.539063-4.546875-6.273438l-46.304687-92.605469c-2.539063-5.082031-7.734376-8.292969-13.414063-8.292969h-136.566406c-13.878907 0-25.167969-11.289062-25.167969-25.164062v-294.238281c0-13.878907 11.289062-25.167969 25.167969-25.167969h401.667969c13.875 0 25.164062 11.289062 25.164062 25.167969zm0 0" /></svg>
                        <p>Comment</p>
                    </div>
                    <div id="retweetButton_dazd2ad1za3d" onClick={onClickInRetweetBtn} className={`${retweetButtonClass} btn interactionButton`}>
                        <svg onClick={onClickInRetweetBtn} className="retweetSvgButton" fill="#4F4F4F" width="13.33" height="17.15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M493.815,70.629c-11.001-1.003-20.73,7.102-21.733,18.102l-2.65,29.069C424.473,47.194,346.429,0,256,0
                                        C158.719,0,72.988,55.522,30.43,138.854c-5.024,9.837-1.122,21.884,8.715,26.908c9.839,5.024,21.884,1.123,26.908-8.715
                                        C102.07,86.523,174.397,40,256,40c74.377,0,141.499,38.731,179.953,99.408l-28.517-20.367c-8.989-6.419-21.48-4.337-27.899,4.651
                                        c-6.419,8.989-4.337,21.479,4.651,27.899l86.475,61.761c12.674,9.035,30.155,0.764,31.541-14.459l9.711-106.53
                                        C512.919,81.362,504.815,71.632,493.815,70.629z" />
                                </g>
                            </g>
                            <g>
                                <g>
                                    <path d="M472.855,346.238c-9.838-5.023-21.884-1.122-26.908,8.715C409.93,425.477,337.603,472,256,472
                                        c-74.377,0-141.499-38.731-179.953-99.408l28.517,20.367c8.989,6.419,21.479,4.337,27.899-4.651
                                        c6.419-8.989,4.337-21.479-4.651-27.899l-86.475-61.761c-12.519-8.944-30.141-0.921-31.541,14.459l-9.711,106.53
                                        c-1.003,11,7.102,20.73,18.101,21.733c11.014,1.001,20.731-7.112,21.733-18.102l2.65-29.069C87.527,464.806,165.571,512,256,512
                                        c97.281,0,183.012-55.522,225.57-138.854C486.594,363.309,482.692,351.262,472.855,346.238z" />
                                </g>
                            </g>
                        </svg>
                        <p style={!weAreInTheProfilePage?retweets.length===0?{color:"#4f4f4f"}:{}:{}} onClick={onClickInRetweetBtn} >{!weAreInTheProfilePage?retweets.length===0?"Retweet":retweetButtonClass === "retweetedButtonM" ? "Retweeted" : retweetButtonClass === "retweetButtonM" && "Retweet":retweetButtonClass === "retweetedButtonM" ? "Retweeted" : retweetButtonClass === "retweetButtonM" && "Retweet"}</p>
                        <button className="btn retweetButtonResolveProblem">a</button>
                    </div>
                    <div id="likeButton_dsq21dqs56d1q894fr89t" onClick={onClickInLikeButton} className={`${likeButtonClass} btn interactionButton`}>
                        <svg width="16.67" height="14.71" viewBox="0 -28 512.001 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="m256 455.515625c-7.289062 0-14.316406-2.640625-19.792969-7.4375-20.683593-18.085937-40.625-35.082031-58.21875-50.074219l-.089843-.078125c-51.582032-43.957031-96.125-81.917969-127.117188-119.3125-34.644531-41.804687-50.78125-81.441406-50.78125-124.742187 0-42.070313 14.425781-80.882813 40.617188-109.292969 26.503906-28.746094 62.871093-44.578125 102.414062-44.578125 29.554688 0 56.621094 9.34375 80.445312 27.769531 12.023438 9.300781 22.921876 20.683594 32.523438 33.960938 9.605469-13.277344 20.5-24.660157 32.527344-33.960938 23.824218-18.425781 50.890625-27.769531 80.445312-27.769531 39.539063 0 75.910156 15.832031 102.414063 44.578125 26.191406 28.410156 40.613281 67.222656 40.613281 109.292969 0 43.300781-16.132812 82.9375-50.777344 124.738281-30.992187 37.398437-75.53125 75.355469-127.105468 119.308594-17.625 15.015625-37.597657 32.039062-58.328126 50.167969-5.472656 4.789062-12.503906 7.429687-19.789062 7.429687zm-112.96875-425.523437c-31.066406 0-59.605469 12.398437-80.367188 34.914062-21.070312 22.855469-32.675781 54.449219-32.675781 88.964844 0 36.417968 13.535157 68.988281 43.882813 105.605468 29.332031 35.394532 72.960937 72.574219 123.476562 115.625l.09375.078126c17.660156 15.050781 37.679688 32.113281 58.515625 50.332031 20.960938-18.253907 41.011719-35.34375 58.707031-50.417969 50.511719-43.050781 94.136719-80.222656 123.46875-115.617188 30.34375-36.617187 43.878907-69.1875 43.878907-105.605468 0-34.515625-11.605469-66.109375-32.675781-88.964844-20.757813-22.515625-49.300782-34.914062-80.363282-34.914062-22.757812 0-43.652344 7.234374-62.101562 21.5-16.441406 12.71875-27.894532 28.796874-34.609375 40.046874-3.453125 5.785157-9.53125 9.238282-16.261719 9.238282s-12.808594-3.453125-16.261719-9.238282c-6.710937-11.25-18.164062-27.328124-34.609375-40.046874-18.449218-14.265626-39.34375-21.5-62.097656-21.5zm0 0" />
                        </svg>
                        <p style={!weAreInTheProfilePage?likes.length===0?{color:"#4f4f4f"}:{}:{}}>{!weAreInTheProfilePage?likes.length===0?"Like":likeButtonClass === "likeButton" ? 'Like' : likeButtonClass === "likedButton" && 'Liked':likeButtonClass === "likeButton" ? 'Like' : likeButtonClass === "likedButton" && 'Liked'}</p>
                    </div>
                    <div id="SaveParent_1t56h151cqs231z" onClick={onClickInSaveButton} className={`${saveButtonClass} btn interactionButton`}>
                        <svg onClick={onClickInSaveButton} fill="#000" width="11.67" height="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 48.065 48.065" xmlSpace="preserve">
                            <path d="M40.908,0H7.158c-0.553,0-1,0.448-1,1v46.065c0,0.401,0.239,0.763,0.608,0.92c0.369,0.157,0.797,0.078,1.085-0.2
                            l16.182-15.582l16.182,15.582c0.189,0.183,0.439,0.28,0.693,0.28c0.132,0,0.266-0.026,0.392-0.08c0.369-0.157,0.608-0.52,0.608-0.92
                            V1C41.908,0.448,41.46,0,40.908,0z M39.908,44.714L24.726,30.095c-0.193-0.187-0.443-0.28-0.693-0.28s-0.5,0.093-0.693,0.28
                            L8.158,44.714V2h31.75V44.714z"/>
                        </svg>
                        <p style={!weAreInTheProfilePage?saves.length===0?{color:"#4f4f4f"}:{}:{}} onClick={onClickInSaveButton}>{!weAreInTheProfilePage?saves.length===0?"Save":saveButtonClass === "saveButton" ? "Save" : saveButtonClass === "savedButton" && "Saved":saveButtonClass === "saveButton" ? "Save" : saveButtonClass === "savedButton" && "Saved"}</p>
                        <button className="btn retweetButtonResolveProblem">a</button>
                    </div>
                </div>
                <div style={{
                    position: 'relative',
                    top: '8px'
                }} className="transistor"></div>
                {isClickigInComment && <div className="AllCommentsZone">
                    <div className="formPart">
                        <div className="posterPictureInfo">
                            <img className="profilePicture" src={user.profilePicture} alt="principale" />
                        </div>
                        <form style={{ borderRadius: "8px" }} onSubmit={onSubmitInComment} >
                            <input type="text" placeholder="twetter votre reponse" className="tweetReply" />
                            <div className="fileInput7c3A">
                                <label for="inputFile2d1d5za">
                                    <svg fill="#BDBDBD" width="15" height="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                        viewBox="0 0 512 512" xmlSpace="preserve">
                                        <g>
                                            <g>
                                                <g>
                                                    <path d="M464,0H48C21.49,0,0,21.49,0,48v416c0,26.51,21.49,48,48,48h416c26.51,0,48-21.49,48-48V48C512,21.49,490.51,0,464,0z
				                                         M480,464c0,8.837-7.163,16-16,16H48c-8.837,0-16-7.163-16-16V48c0-8.837,7.163-16,16-16h416c8.837,0,16,7.163,16,16V464z"/>
                                                    <path d="M347.36,276.64c-6.241-6.204-16.319-6.204-22.56,0l-36.8,36.8l-68.64-68.64c-6.241-6.204-16.319-6.204-22.56,0l-112,112
                                                        c-6.186,6.31-6.087,16.44,0.223,22.626c2.935,2.878,6.866,4.516,10.977,4.574h320c8.836,0.051,16.041-7.07,16.093-15.907
                                                        c0.025-4.299-1.681-8.426-4.733-11.453L347.36,276.64z"/>
                                                    <circle cx="304" cy="176" r="48" />
                                                </g>
                                            </g>
                                        </g>
                                    </svg>
                                </label>
                                <input style={{ display: "none" }} id="inputFile2d1d5za" name="inputFile2d1d5za" accept=".jpg, .jpeg, .png" type="file" className="postPictureInCommentInput" />
                            </div>
                        </form>
                    </div>
                    <div className="latestComments">
                        {comments.sort((a, b) => b.date - a.date).map((comment, index) => {
                            if (index < commentsLength) {
                                return <Comment media={comment.media} commentId={comment._id} tweetId={tweetId} userId={userId} profilePictureOfCommenter={comment.commenterPicture} commenterName={comment.commenterName} date={comment.date} message={comment.text} likes={comment.likes} setJustOnePonce={setJustOnePonce} />
                            } else {
                                return null
                            }
                        })}
                    </div>
                    <div style={{
                        position: "relative",
                        marginTop: "26px"
                    }} className="seeMoreComment">
                        <svg onClick={e => {

                            if (e.target.classList[1] === "dontShowMore") {
                                e.target.classList.replace("dontShowMore", "showMore")
                                setCommentsLength(2)
                            } else {
                                e.target.classList.replace("showMore", "dontShowMore")
                                setCommentsLength(initialCommentsLength)
                            }
                        }
                        } className="btn showMore" width='12.18' height="9.59" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 612.004 612.004" xmlSpace="preserve">
                            <g>
                                <g>
                                    <path d="M499.147,160.094L330.222,329.019c-6.472,6.472-15.075,10.035-24.223,10.035c-9.146,0-17.749-3.561-24.218-10.035
                                            L112.854,160.094c-25.822-25.817-67.674-25.817-93.491,0c-25.817,25.819-25.817,67.674,0,93.491L188.29,422.508
                                            c31.443,31.445,73.245,48.764,117.712,48.764s86.269-17.319,117.714-48.761l168.925-168.925c25.817-25.817,25.817-67.674,0-93.491
                                            C566.822,134.277,524.962,134.277,499.147,160.094z"/>
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>}

            </div>}
        </>
    )
}

export default Tweet;