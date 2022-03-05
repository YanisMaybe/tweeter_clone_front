import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { followUserTypeTwo, unFollowUserTypeTwo } from '../Actions/usersAction';
import ProfileBloc from './ProfileBloc';

const FollowBox = ({ index, flw, actuallyUser }) => {
    const [isFollowingTypeA, setIsFollowingTypeA] = useState(true)
    const [text, setText] = useState("Follow")
    const [TheUser, setTheUser] = useState(null)
    const [buttonIsDisabled,setButtonIsDisabled] = useState(false)

    const users = useSelector(state => state.usersReducer)

    const dispatch = useDispatch();

    useEffect(() => {
        if(actuallyUser._id===flw._id){
            //("c'est toi hahahah MDR LOL PTDR XD PRXDDAZDZ")
            setText("Follow")
            setButtonIsDisabled(true)
            setTheUser(actuallyUser)
        }else{
            flw.followers.forEach(follower => {
                if (follower === actuallyUser._id) {
                    //("tu es dêja abonnée")
                    setText("Following")
                    setIsFollowingTypeA(false)
                }
            })
            users.forEach((a, indx) => {
                if (a._id === flw._id) {
                    setTheUser(users[indx])
                    //("voici l'utilisateur avec le redux")
                    //(TheUser)
                    //("voici le vrai user")
                    //(flw)
                }
            })
        }
        console.log(TheUser)
       
    }, [isFollowingTypeA, text])

    const onClickInFollowButton = (thisUser,button,isFollowingType) => {
        if(isFollowingType){
            dispatch(followUserTypeTwo(thisUser._id,actuallyUser._id,button,undefined,setText,true,setButtonIsDisabled,setIsFollowingTypeA))
            //(thisUser._id +" s    " + actuallyUser._id)
        }else{
            dispatch(unFollowUserTypeTwo(thisUser._id,actuallyUser._id,button,undefined,setText,false,setButtonIsDisabled,setIsFollowingTypeA))
            //(thisUser._id +" s    " + actuallyUser._id)
        }
    }

    return (
        <>
            {TheUser ? <div key={index} className="onePerson">
                <div className="transistor"></div>
                <div className="top">
                    <ProfileBloc posterId={TheUser._id} posterPseudo = {TheUser.pseudo} name={TheUser.pseudo} date={TheUser.followers.length + " Followers"} userPicture={TheUser.profilePicture} />
                    <button disabled = {buttonIsDisabled} onClick={(e) => onClickInFollowButton(TheUser, e.target, isFollowingTypeA)} className={`btn followBTN ${buttonIsDisabled? "disabledButton" : ""}`} >{text}</button>

                </div>
                <p className="biography griser">{TheUser.bio}</p>
            </div>:<p>Bpnjour</p>}
        </>
    )
}

export default FollowBox