import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FollowBox from "./FollowBox";

const SeeFollowInfo = ({ exitFunc, isFollowingType, userName, user }) => {
    const allUsers = useSelector(state => state.usersReducer);
    const url = window.location.href.split("/")
    const urlName = url[url.length - 1] === "likes" || url[url.length - 1] === "media" || url[url.length - 1] === "with_replies" ? url[url.length - 2] : url[url.length - 1]
    let followTxt = isFollowingType ? urlName + " is following" : urlName + " is followed"

    const [followers, setFollowers] = useState([])
    const [followings, setFollowings] = useState([])
    const [pounce, setPounce] = useState(true)

    const actuallyUser = useSelector(state=>state.actuallyUserReducer)

    useEffect(() => {
        if (pounce && allUsers.length>0) {
            //(allUsers)
            //("nous aussi on nous a pas oublié tkt")
            allUsers.forEach(usr => {
                user.followers.forEach(a => {
                    if (a === usr._id) {
                        setFollowers(prev => [usr, ...prev])
                        //(followers)
                        //('follower')
                    }
                    //(followers)
                })
                user.followings.forEach(b => {
                    if (b === usr._id) {
                        setFollowings(prev => [usr, ...prev])
                    }
                })
            })
            setPounce(false)
        }
    }, [pounce])

   
    return (
        <div className="SeeFollowInfoContainer">
            <div className="SeeFollowInfo">
                <div className="head">
                    <p>{followTxt.split("%20").join(" ")}</p>
                    <svg className="btn" onClick={exitFunc} width="13.18" height="13.18" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 512.001 512.001" xmlSpace="preserve">
                        <g>
                            <g>
                                <path d="M284.286,256.002L506.143,34.144c7.811-7.811,7.811-20.475,0-28.285c-7.811-7.81-20.475-7.811-28.285,0L256,227.717
                                    L34.143,5.859c-7.811-7.811-20.475-7.811-28.285,0c-7.81,7.811-7.811,20.475,0,28.285l221.857,221.857L5.858,477.859
                                    c-7.811,7.811-7.811,20.475,0,28.285c3.905,3.905,9.024,5.857,14.143,5.857c5.119,0,10.237-1.952,14.143-5.857L256,284.287
                                    l221.857,221.857c3.905,3.905,9.024,5.857,14.143,5.857s10.237-1.952,14.143-5.857c7.811-7.811,7.811-20.475,0-28.285
                                    L284.286,256.002z"/>
                            </g>
                        </g>
                    </svg>

                </div>
                <div className="people">
                    {isFollowingType ? user &&
                        followings.map((flw, index) => {
                            return <FollowBox index = {index} flw = {flw} actuallyUser = {actuallyUser} />
                        }) :
                        user && followers.map((flw, index) => {
                            return <FollowBox index = {index} flw = {flw} actuallyUser = {actuallyUser} />
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default SeeFollowInfo;

/*
<div className="onePerson">
                            <div className="transistor"></div>
                            <div className="top">
                                <ProfileBloc name={user.pseudo} date={user.followers.length} userPicture={user.profilePicture} />
                                <button className="btn followBTN" >Follow</button>
                            </div>
                            <p className="biography griser">{user.bio}</p>
                        </div>
*/