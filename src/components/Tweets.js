import React, { useCallback, useEffect, useRef, useState } from 'react';
import globeIcon from '../imports/globe.svg';
import socialIcon from '../imports/social.svg';
import Tweet from './Tweet';
import { useDispatch, useSelector } from 'react-redux';
import { createTweet } from '../Actions/postActions';

const Tweets = ({ user, setVerySpecialPounce,tweets }) => {
    const [whoCanReply, setWhoCanReply] = useState("Everyone")
    const [URLpostPicture, setURLPostPicture] = useState(null)
    const [postPicture, setPostPicture] = useState(null)
    const [tweetText, setTweetText] = useState(" ")
    const [ifButtonAreDisabled, setIfButtonAreDisabled] = useState(true)
    const dispatch = useDispatch()

    const [pounceOfRealTweet,setPounceOfRealTweet] = useState(true)

    const profilePicture = user.profilePicture;


    const tweetsRedux = useSelector(state=>state.tweetsReducer);

    const actuallyUser = useSelector(state=>state.actuallyUserReducer)

    const [Tweets,setTweets] = useState(tweetsRedux);
    const onSubmitInTweetForm = e => {
        setPounceOfReduxTweets(true)
        e.preventDefault();
        let isEvery = whoCanReply === "Everyone" ? true : false;
        dispatch(createTweet(actuallyUser.name, actuallyUser._id, profilePicture, postPicture, tweetText, isEvery, actuallyUser.followings, true,actuallyUser.pseudo,setIfButtonAreDisabled,actuallyUser))
        const textareaForTweet = document.getElementById("textareaForTweet")
        textareaForTweet.value = ""
        setPostPicture(null)
        setURLPostPicture(null)
        setIfButtonAreDisabled(true)
        setPounceOfRealTweet(true)

    }

    const [pounceOfReduxTweets,setPounceOfReduxTweets] = useState(true)

    useEffect(() => {
        if (URLpostPicture !== null || (!/^[ ]+$/.test(tweetText) && !/^[]+$/.test(tweetText) && tweetText !== "")) {

            if (tweetText.replace(/(\r\n|\n|\r)/gm, "") !== "") {
                setIfButtonAreDisabled(false)
            } else {
                setIfButtonAreDisabled(true)
            }

        } else {
            setIfButtonAreDisabled(true)
        }
        if(pounceOfReduxTweets){
            setTweets(tweetsRedux)
            setPounceOfReduxTweets(false)
        }
    }, [postPicture, tweetText, ifButtonAreDisabled, URLpostPicture,pounceOfReduxTweets])

    const [tweetsNumberMax,setTweetsNumberMax] = useState(2)

    window.addEventListener('scroll', event => {
       
        let element = event.target.scrollingElement;
        let allTweets = document.querySelectorAll(".tweets > .Tweet")
        if(tweetsNumberMax<=allTweets.length){
            if (element.scrollHeight - element.scrollTop === element.clientHeight)
            {
                setTweetsNumberMax((prev)=>prev+2)
            }
        }
    });
    return (
        <>
            <div className="tweetsZone">
                <div className="posttweet">
                    <div className='postTweetContainer'>
                    <p className="tweetSomething">Tweeter quelque chose</p>
                    <div style={{ marginBottom: "5px" }} className="transistor"></div>
                    <form onSubmit={onSubmitInTweetForm} className="tweetForm">
                        <div className="inputs">
                            <div className="firstPart">
                                <img alt="prof" src={profilePicture} />
                                <textarea maxLength="360" id="textareaForTweet" onChange={e => setTweetText(e.target.value)} style={{ resize: "none" }} type="text" placeholder="Quoi de neuf?" />
                            </div>
                            <div className="imageSelected">
                                {URLpostPicture && <img src={URLpostPicture} alt="em" />}
                            </div>
                        </div>

                        <div className="submit">
                            <div className="anotherLittleInputs">
                                <div className="pictureInput">
                                    <label for = "fileInput123sqd">
                                        <svg fill="#2F80ED" width="15" height="15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
                                    <input style = {{display: "none"}} name = "fileInput123sqd" id = "fileInput123sqd" onChange={(e) => {
                                        if (e.target.files[0]) {
                                            //(e.target.files[0])
                                            setURLPostPicture(URL.createObjectURL(e.target.files[0]))
                                            setPostPicture(e.target.files[0])
                                        }
                                    }} type="file" accept=".jpg, .jpeg, .png" className="selectFileForTweet" />
                                </div>
                                <div onClick={() => {
                                    let whoCanReplyBloc = document.querySelector(".whoCanReplyBloc")
                                    whoCanReplyBloc.classList.remove("none")
                                }} className="howCanReply btn">
                                    <svg className="btn" width="16.67" height="16.67" fill="#2F80ED" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
                                        <g>
                                            <g>
                                                <path d="M256,0C114.844,0,0,114.844,0,256s114.844,256,256,256s256-114.844,256-256S397.156,0,256,0z M256,469.333
                                                                c-58.116,0-110.82-23.418-149.333-61.238v-34.762c0-10.146,4.542-16.677,9.792-24.24C121.865,341.313,128,332.49,128,320
                                                                c0-20.344-18.365-22.406-28.24-23.51c-7.063-0.792-13.729-1.542-17.552-5.365c-2.896-2.896-5.792-8.156-8.854-13.719
                                                                c-6.081-11.064-14.324-25.695-30.017-34.656C50.236,131.296,142.837,42.667,256,42.667c5.855,0,11.611,0.414,17.349,0.879
                                                                c-1.168,0.767-2.599,1.288-3.557,2.246c-2.073,2.073-3.208,4.917-3.125,7.854c0.094,2.927,1.385,5.698,3.573,7.656
                                                                c3.833,3.406,4.573,5.125,4.719,5.125c-0.24,0.51-2.198,3.854-13.115,9.396c-18.021,9.135-38.833,27.833-41.927,47.292
                                                                c-1.417,8.833,1.146,17.031,7.208,23.094c2,2,4.708,3.125,7.542,3.125c14.813,0,26.26-5.479,37.333-10.771
                                                                C283.365,133.135,294.104,128,309.333,128c41.865,0,74.667,9.375,74.667,21.333c0,4.385-1.365,5.729-1.885,6.229
                                                                c-5.24,5.156-23.083,4.823-38.771,4.583c-4.156-0.073-8.406-0.146-12.677-0.146c-14.479,0-18.969-2.115-24.167-4.573
                                                                c-6.052-2.854-12.906-6.094-29.167-6.094c-17.583,0-50.26,3.177-71.542,24.458c-17.406,17.396-15.563,38.208-14.354,51.969
                                                                c0.281,3.167,0.563,6.167,0.563,8.906c0,21.01,21.469,32,42.667,32c32.604,0,60.792,6.083,64,10.667
                                                                c0,11.938,3.552,20.094,6.406,26.635c2.375,5.469,4.26,9.781,4.26,16.031c0,4.833-0.792,5.865-2.927,8.615
                                                                c-4.073,5.292-7.74,11.052-7.74,23.385c0,22.448,21.615,47.073,24.073,49.813c2.052,2.271,4.948,3.521,7.927,3.521
                                                                c0.885,0,1.771-0.104,2.646-0.333c6.281-1.615,61.354-16.771,61.354-53c0-11.354,3.531-14.417,8.885-19.063
                                                                c5.25-4.563,12.448-10.802,12.448-23.604c0-8.552,15.177-30.625,29.24-46.177c1.99-2.198,2.979-5.135,2.719-8.094
                                                                c-0.26-2.958-1.74-5.677-4.083-7.49c-8.292-6.427-31.188-27.354-38.854-47.656c4.344,2.271,9.781,5.969,14.104,10.292
                                                                c3.552,3.573,8.313,5.281,13.729,5.063c8.639-0.493,18.902-7.319,28.628-15.833c4.975,18.046,7.852,36.956,7.852,56.563
                                                                C469.333,373.635,373.635,469.333,256,469.333z" />
                                            </g>
                                        </g>
                                    </svg>
                                    <p className="btn">{whoCanReply} can reply</p>
                                </div>
                                <div className="whoCanReplyBloc none">
                                    <div className="AllP">
                                        <h3>Who can reply?</h3>
                                        <p>Choose who can reply to this tweet</p>
                                    </div>
                                    <div onClick={() => {
                                        let whoCanReplyBloc = document.querySelector(".whoCanReplyBloc")
                                        whoCanReplyBloc.classList.add("none")
                                    }} className="TheChoices">
                                        <div onClick={() => { setWhoCanReply("Everyone") }} className="EveryOne choice btn">
                                            <img className="btn" alt="globe" src={globeIcon} />
                                            <p>Everyone</p>
                                        </div>
                                        <div onClick={() => setWhoCanReply("People you follow")} className="peopleYouFollow choice btn">
                                            <img className="btn" alt="people" src={socialIcon} />
                                            <p>People you follow</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {ifButtonAreDisabled ? <input disabled={true} className="submitButton btn disabled" value="Tweet" type="submit" /> : <input disabled={false} className="submitButton btn" value="Tweet" type="submit" />}
                        </div>
                    </form>
                    </div>
                    
                </div>
                <div className="ifYouRetwetted">
                    <svg fill="#828282" width="13.33" height="17.15" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" xmlSpace="preserve">
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
                    <p>You retwetted</p>
                </div>
                <div className="tweets">
                    {tweetsRedux.sort((a, b) => { return b.date - a.date }).map((tweet, index) => {
                        if(index<tweetsNumberMax){
                            if (!tweet.everyOneCanReply && tweet.posterId !== user._id) {
                                return tweet.userFollowings.map((flw, indx) => {
                                    if (flw + "" === user._id + "") {
                                        return <Tweet posterId = {tweet.posterId} setVerySpecialPounce = {setVerySpecialPounce} posterPseudo = {tweet.posterPseudo} theTweet = {tweet} index = {index} pounceOfTweet = {pounceOfRealTweet} userFollowings={tweet.userFollowings} posterName={tweet.posterName} user={user} key={index} likes={tweet.likes} userId={user._id} tweetId={tweet._id} date={tweet.date} userPicture={profilePicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} />;
                                    } else {
                                        return null
                                    }
                                })
                            } else {
                                return <Tweet posterId = {tweet.posterId} setVerySpecialPounce = {setVerySpecialPounce} posterPseudo = {tweet.posterPseudo} theTweet = {tweet} index = {index} pounceOfTweet = {pounceOfRealTweet} EmptyConfig={tweet.EmptyConfig} userFollowings={tweet.userFollowings} posterName={tweet.posterName} user={user} key={index} likes={tweet.likes} userId={user._id} tweetId={tweet._id} date={tweet.date} userPicture={profilePicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} />;
                            }
                        }
                        
                    })
                    }
                </div>
            </div>
        </>
    )
}

export default Tweets