import React, { useEffect, useState } from "react";
import jwt from 'jwt-decode';
import Header from "../components/Header";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import Tweet from "../components/Tweet";
import TrendUser from "../components/TrendUser";
import HeaderInTheBottom from "../components/HeaderInTheBottom";

const Explore = () => {
    const actuallyUser = useSelector(state => state.actuallyUserReducer)
    const AllTweets = useSelector(state => state.tweetsReducer)
    const AllUsers = useSelector(state => state.usersReducer)

    let cooks = document.cookie.split(";")
    let id;
    for (let index = 0; index < cooks.length; index++) {
        try {
            let a = jwt(cooks[index])
            if (a) {
                id = a.id
                //("le cookie est valid", { color: 'green' })
            }
        } catch (err) {
            console.error("this cookie are not valide")
        }
    }

    const [pounce, setPounce] = useState(true)

    const user = useSelector(state=>state.actuallyUserReducer)
    AllUsers.length = 5;

    const [sortingType, setSortingType] = useState("")


    const url = window.location.href.split("/")
    const userName = url[url.length - 1]

    const [tweetsInSearchingDataMode, setTweetsInSearchingDataMode] = useState([])

    const [isInvalidPage, setIsInvalidePage] = useState(false)

    useEffect(() => {
        if (pounce) {
            if (url[url.length - 2] === "tweets" && url[url.length - 3] === "explore") {
                if (userName === "lastest") {
                    setSortingType("lastest")
                } else if (userName === "people") {
                    setSortingType("people")
                } else if (userName === "media") {
                    setSortingType('media')
                } else {
                    console.error("aucune des proposition malheureusement")
                    setIsInvalidePage(true)
                }

            } else {
                if (userName === "tweets" && url[url.length - 2] === "explore") {
                    //("TOP vous avez choisi TOP")
                    setSortingType("top")

                }
            }
            setPounce(false)
        }
    }, [pounce, sortingType, isInvalidPage])

    const [specialPounce,setSpecialPounce] = useState(true)

    const [fraychtn,setFraychtn] = useState(true)
    useEffect(()=>{
        if(document.getElementById("searchInput213ds45")&&document.getElementById("searchInput213ds45").value===""){
            document.querySelector("#root > div > div > div.bottomPartOfExplorePage > div.containerOfBtmPart > div.rightPartOfBtmPrtOfContainer > div.searchTweetBloc > div > div.submitInputManagement > div > a > button").disabled = true
        }else{
            document.querySelector("#root > div > div > div.bottomPartOfExplorePage > div.containerOfBtmPart > div.rightPartOfBtmPrtOfContainer > div.searchTweetBloc > div > div.submitInputManagement > div > a > button").disabled = false
        }
    },[fraychtn])

    const onSeachInInputSeach = () => {
        setSpecialPounce(!specialPounce)
        setFraychtn(!fraychtn)
        const input = document.getElementById("searchInput213ds45")

        if(input.value!==""){
            let newValue = input.value.split("  ").join(" ")
            //(input.value)
            setTweetsInSearchingDataMode([])
            setPounce(false)
            setSortingType("searching")

            let allText = newValue.split(" ")


            AllTweets.forEach(tweet => {
                let num = 0
                let tweetText = tweet.text.split(" ")
                const textList = []
                let text = ""

                tweetText.forEach((tweetTxt,index)=>{
                    allText.forEach((txt,n)=>{
                        if(tweetTxt.split(" ").join("").toUpperCase()===txt.split(" ").join("").toUpperCase()){
                            let weCan = true
                            textList.forEach((one,indx)=>{
                                if(one.split(" ").join("")===`<span>${txt}</span>`){
                                    weCan = false
                                }
                                else if(one.split(" ").join("")===txt.split(" ").join("")){
                                    if(indx===index&&allText.length>1){
                                        
                                    }
                                    console.log("on supprime une tkt mem pas")
                                    textList.splice(indx,indx)
                                    
                                    weCan = true
                                }else{
                                    weCan=true
                                }
                            })
                            if(weCan){
                                textList.push(`<span>${txt}</span> `)
                            }
                          
                        }else{
                            let weCan = true
                            textList.forEach((one,indx)=>{
                                if(one.split(" ").join("")===tweetTxt.split(" ").join("")||one.split(" ").join("")===`<span>${tweetTxt}</span>`){
                                    if(index===indx){
                                        weCan = false;
                                    }
                             
                                }
                            })
                            if(weCan){
                                textList.push(tweetTxt + " ")
                            }
                        }
                    })
                    
                })
                textList.forEach(el=>{
                    text = text + el
                })
                tweetText.forEach(tweetTxt => {
                    allText.forEach((txt,index) => {
                        if (tweetTxt === txt) {
                            num+=1                      
                            if(index+1===allText.length&&num===allText.length){             
                                const customizeTweet = {...tweet,text:`${text}`}
                                setTweetsInSearchingDataMode(prev => [...prev, customizeTweet])
                            }
                        }
                    })        
                })   
            })

            input.value = ""
        }else{
            //("c vide connard")
        }
    }
 
    const [tweetsNumberMax,setTweetsNumberMax] = useState(2)

    window.addEventListener('scroll', function(event){
        let element = event.target.scrollingElement;

        if (element.scrollHeight - element.scrollTop === element.clientHeight)
        {
            if(tweetsNumberMax<AllTweets.length){
                setTweetsNumberMax(prev=>prev+3)
            }
        }
    });
    return (
        <>
            {!id ? window.location.replace("/login") :
                <>
                    {!isInvalidPage ? <div className="HomePage">
                        <div className="head">
                            <Header />
                        </div>
                        <div className="bottomPartOfExplorePage">
                            <div className="containerOfBtmPart">
                                <div className="seeTweetsOfWorld">
                                    <div className="tweetChoicer25">
                                        <div className="tweetChoicerBloc25">
                                            <div className="TweetsChoice">
                                                <NavLink onClick={() => {setPounce(true);setTweetsNumberMax(2)}} exact activeClassName="choiceActivedInProfile2513" to={"/explore/tweets"}>Top</NavLink>
                                            </div>
                                            <div className="TweetsAndRepliesChoice">
                                                <NavLink onClick={() => {setPounce(true);setTweetsNumberMax(2)}} exact activeClassName="choiceActivedInProfile2513" to={"/explore/tweets/lastest"}>Lastest</NavLink>
                                            </div>
                                            <div className="mediaChoice">
                                                <NavLink onClick={() => {setPounce(true);setTweetsNumberMax(2)}} exact activeClassName="choiceActivedInProfile2513" to={"/explore/tweets/people"}>People</NavLink>
                                            </div>
                                            <div className="likesChoice">
                                                <NavLink onClick={() => {setPounce(true);setTweetsNumberMax(2)}} exact activeClassName="choiceActivedInProfile2513" to={"/explore/tweets/media"}>Media</NavLink>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ width: '100%' }} className="rightPartOfBtmPrtOfContainer">
                                    <div className="searchTweetBloc">
                                        <div className="containerOfSearchTwtBlc">
                                            <div className="searchInputManagement">
                                                <div className="RLsearchInput">
                                                    <svg className="loupeImage none"></svg>
                                                    <input onChange={()=>setFraychtn(!fraychtn)} minLength={1} id="searchInput213ds45" type="text" placeholder="Seach" className="_searchInput" />
                                                </div>
                                            </div>
                                            <div className="submitInputManagement">
                                                <div className="RLsubmitButton">
                                                    <NavLink exact to="/explore/tweets/searching" ><button onClick={onSeachInInputSeach} className="_submitButton btn">Search</button></NavLink>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div  className="sortedTweets">
                                        {
                                            AllTweets.length > 0 && AllUsers.length > 0 ? <>
                                                {sortingType === "top" && AllTweets.sort((a, b) => b.retweets.length - a.retweets.length).map((tweet,index) => {
                                                    if (!tweet.everyOneCanReply && tweet.posterId !== user._id) {
                                                        return tweet.userFollowings.map((flw, indx) => {
                                                            if (flw + "" === user._id + "") {
                                                                if(index<=tweetsNumberMax){
                                                                    return <Tweet index={index} posterId = {tweet.posterId} theTweet = {tweet} specialPounce ={specialPounce} posterPseudo = {tweet.posterPseudo} style={{ marginBottom: "35.25px" }} posterName={tweet.posterName} userPicture={tweet.posterPicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} userId={actuallyUser._id} tweetId={tweet._id} likes={tweet.likes} date={tweet.date} user={actuallyUser} />
                                                                }
                                                            } else {
                                                                return null
                                                            }
                                                        })
                                                    } else {
                                                        if(index<=tweetsNumberMax){
                                                            return <Tweet index={index} posterId = {tweet.posterId} theTweet = {tweet} specialPounce ={specialPounce} posterPseudo = {tweet.posterPseudo} style={{ marginBottom: "35.25px" }} posterName={tweet.posterName} userPicture={tweet.posterPicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} userId={actuallyUser._id} tweetId={tweet._id} likes={tweet.likes} date={tweet.date} user={actuallyUser} />
                                                        }
                                                    }
                                                    
                                                })}
                                                {sortingType === "lastest" && AllTweets.sort((a, b) => b.date - a.date).map((tweet,index) => {
                                                    if (!tweet.everyOneCanReply && tweet.posterId !== user._id) {
                                                        return tweet.userFollowings.map((flw, indx) => {
                                                            if (flw + "" === user._id + "") {
                                                                if(index<=tweetsNumberMax){
                                                                    return <Tweet index={index} posterId = {tweet.posterId} theTweet = {tweet} specialPounce ={specialPounce} posterPseudo = {tweet.posterPseudo} style={{ marginBottom: "35.25px" }} posterName={tweet.posterName} userPicture={tweet.posterPicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} userId={actuallyUser._id} tweetId={tweet._id} likes={tweet.likes} date={tweet.date} user={actuallyUser} />
                                                                }
                                                            } else {
                                                                return null
                                                            }
                                                        })
                                                    } else {
                                                        if(index<=tweetsNumberMax){
                                                            return <Tweet index={index} posterId = {tweet.posterId} theTweet = {tweet} specialPounce ={specialPounce} posterPseudo = {tweet.posterPseudo} style={{ marginBottom: "35.25px" }} posterName={tweet.posterName} userPicture={tweet.posterPicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} userId={actuallyUser._id} tweetId={tweet._id} likes={tweet.likes} date={tweet.date} user={actuallyUser} />
                                                        }
                                                    }
                                                })}
                                                {sortingType === "people" &&
                                                    <>
                                                        <h1 className="trendsForUser">Trends for you</h1>
                                                        <div style={{
                                                            borderTop: "1px solid #dee8ea",
                                                            borderLeft: "1px solid #dee8ea",
                                                            borderRight: " 1px solid #dee8ea"
                                                        }} className="parentOfTrends">
                                                            {
                                                                AllUsers.sort((a, b) => b.followers.length - a.followers.length).map((user, index) => {
                                                                    return <>
                                                                        <TrendUser user={user} />
                                                                    </>
                                                                })
                                                            }
                                                        </div>
                                                    </>
                                                }
                                                {sortingType === "media" && AllTweets.filter(twt => twt.media !== undefined).map((tweet,index) => {
                                                    if (!tweet.everyOneCanReply && tweet.posterId !== user._id) {
                                                        return tweet.userFollowings.map((flw, indx) => {
                                                            if (flw + "" === user._id + "") {
                                                                if(index<=tweetsNumberMax){
                                                                    return <Tweet index={index} posterId = {tweet.posterId} theTweet = {tweet} specialPounce={specialPounce} indexTwo = {index} posterPseudo = {tweet.posterPseudo} style={{ marginBottom: "35.25px" }} posterName={tweet.posterName} userPicture={tweet.posterPicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} userId={actuallyUser._id} tweetId={tweet._id} likes={tweet.likes} date={tweet.date} user={actuallyUser} />
                                                                }
                                                            } else {
                                                                return null
                                                            }
                                                        })
                                                    } else {
                                                        if(index<=tweetsNumberMax){
                                                            return <Tweet index={index} posterId = {tweet.posterId} theTweet = {tweet} specialPounce={specialPounce} indexTwo = {index} posterPseudo = {tweet.posterPseudo} style={{ marginBottom: "35.25px" }} posterName={tweet.posterName} userPicture={tweet.posterPicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} userId={actuallyUser._id} tweetId={tweet._id} likes={tweet.likes} date={tweet.date} user={actuallyUser} />
                                                        }
                                                    }
                                                })}
                                                {sortingType === "searching" && tweetsInSearchingDataMode.filter((item, pos) => tweetsInSearchingDataMode.indexOf(item) == pos).sort((a, b) => b.date - a.date).map((tweet,index) => {
                                                    if (!tweet.everyOneCanReply && tweet.posterId !== user._id) {
                                                        return tweet.userFollowings.map((flw, indx) => {
                                                            if (flw + "" === user._id + "") {
                                                                if(index<=tweetsNumberMax){
                                                                    return <Tweet index={index} posterId = {tweet.posterId} theTweet = {tweet} specialPounce ={specialPounce} indexTwo={index} posterPseudo = {tweet.posterPseudo} style={{ marginBottom: "35.25px" }} posterName={tweet.posterName} userPicture={tweet.posterPicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} userId={actuallyUser._id} tweetId={tweet._id} likes={tweet.likes} date={tweet.date} user={actuallyUser} />
                                                                }
                                                            } else {
                                                                return null
                                                            }
                                                        })
                                                    } else {
                                                        if(index<=tweetsNumberMax){
                                                            return <Tweet index={index} posterId = {tweet.posterId} theTweet = {tweet} specialPounce ={specialPounce} indexTwo={index} posterPseudo = {tweet.posterPseudo} style={{ marginBottom: "35.25px" }} posterName={tweet.posterName} userPicture={tweet.posterPicture} comments={tweet.comments} saves={tweet.saves} retweets={tweet.retweets} message={tweet.text} media={tweet.media} userId={actuallyUser._id} tweetId={tweet._id} likes={tweet.likes} date={tweet.date} user={actuallyUser} />
                                                        }
                                                    }
                                                })}</>
                                                : <div className="twitter-loader"></div>}
                                    </div>
                                </div>
                              
                            </div>
                            <HeaderInTheBottom/>
                        </div>
                    </div> : <h1>Erreur 404: Page introuvable</h1>}
                </>}
        </>
    )
}

export default Explore