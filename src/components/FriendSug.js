import React, { useEffect, useState } from 'react';
import ProfileBloc from './ProfileBloc'
import followIcon from '../imports/follow.svg'
import crypto from 'crypto'
import { useDispatch } from 'react-redux';
import { followUser, unFollowUser } from '../Actions/usersAction';
import { memo } from 'react'

const FriendSug = ({ userPicture, bio, name, subs, userId, friendSugId, user, covImage }) => {
    const myId = crypto.randomBytes(4).toString('hex');
    const dispatch = useDispatch();

    const [pounce,setPounce] = useState(true)

    useEffect(()=>{
        if(pounce){
            let button = document.getElementById(myId).children[1].children[1]

            subs.forEach(sub=>{
                if(sub===userId){
                    //("olalala t'es un suiveur")
                    button.classList.add("followingButton")
                    button.children[1].textContent = "Following"
                    button.children[0].classList.add("none")
                }
            })
            setPounce(false)
        }
    },[pounce])

    return (
        <div className="friendSuggestion" id={myId}>
            <div style={{
                marginBottom: "18px",
                marginTop: "-12px"
            }} className="transistor"></div>
            <div className="thePerson">
                <ProfileBloc posterId={user._id} name={user.name} posterPseudo = {name} date={subs.length + " followers"} userPicture={userPicture} />
                <button style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: 'space-evenly'
                }} onClick={() => {
                    setPounce(true)

                    let button = document.getElementById(myId).children[1].children[1]
                    if (button.classList[1] === "followingButton") {
                        button.children[1].textContent = "Follow"
                        button.children[0].classList.remove("none")
                        button.classList.remove("followingButton")
                        dispatch(unFollowUser(friendSugId,userId))
                        //("la on dispatch")
                    } else {
                        button.children[1].textContent = "Following"
                        button.children[0].classList.add("none")
                        button.classList.add("followingButton")
                        dispatch(followUser(friendSugId,userId))
                    }
                }} id="followButton" className={`btn`}><img alt="follow" src={followIcon} />   <p>Follow</p></button>
            </div>
            <div className="supInformations">
                <p className="userBIO">{bio}</p>
                <div className="covImage">
                    {covImage!==null&&covImage!==undefined?<img alt = "coverture" src = {covImage} />:<div style = {{backgroundColor: "#cfd9de",width: "100%", height: "100%"}} className = "imageReplacement21332sd"></div>}
                </div>
            </div>

        </div >
    )
}

export default memo(FriendSug)