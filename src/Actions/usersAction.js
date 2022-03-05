import axios from "axios"


export const GET_USER = "GET_USER"
export const GET_USERS = "GET_USERS"
export const FOLLOW_USER = "FOLLOW_USER"
export const UN_FOLLOW_USER = "UN_FOLLOW_USER"
export const FOLLOW_USER_TYPE_TWO = "FOLLOW_USER_TYPE_TWO"
export const UN_FOLLOW_USER_TYPE_TWO = "UN_FOLLOW_USER_TYPE_TWO"

export const getUser = (id) => {
    return dispatch => {
        axios.get("https://tweeter-clone-back-22.onrender.com/auth/getuser/" + id).then(res => {
            if (res.data) {
                if (!res.data.error) {
                    return dispatch({ type: GET_USER, payload: res.data })
                }
            } else {
                //(res.data.error)
            }
        }).catch(err => {
            console.error(err)
        })
    }
}
export const getUsers = () => {
    return dispatch => {
        axios.get("https://tweeter-clone-back-22.onrender.com/auth/getusers").then(res => {
            if (!res.data.error) {
                return dispatch({ type: GET_USERS, payload: res.data })
            } else {
                console.error(res.data.error)
            }
        }).catch(err => {
            console.error("emmm it's error:    " + err)
        })
    }
}
export const followUser = (userToFollowId, followerId) => {
    return dispatch => {
        axios.patch("https://tweeter-clone-back-22.onrender.com/auth/followUser/" + userToFollowId, { followerId }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                //("+1follower")
            }
        }).catch(err => {
            console.error(err)
        })
        return dispatch({ type: FOLLOW_USER, payload: { _id: userToFollowId } })

    }
}
export const unFollowUser = (userToFollowId, followerId) => {
    return dispatch => {
        axios.patch("https://tweeter-clone-back-22.onrender.com/auth/unfollowUser/" + userToFollowId, { followerId }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
            }
        }).catch(err => {
            console.error(err)
        })
        //("concours ici : ")
        //(userToFollowId)
        return dispatch({ type: UN_FOLLOW_USER, payload: { _id: userToFollowId, followerId } })
    }
}
export const followUserTypeTwo = (userToFollowId, followerId, button, setIsFollowingButton,setText,isFollowingType,setButtonIsDisabled,setIsFollowingTypeA) => {
    return dispatch => {
        if(setButtonIsDisabled!==null){
            setButtonIsDisabled(true)
            button.classList.add("disabledButton")
        }

        axios.patch("https://tweeter-clone-back-22.onrender.com/auth/followUser/" + userToFollowId, { followerId }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                //("+1follower")
                if (button && setIsFollowingButton) {
                    //(" c bien la premiere qui lu")
                    button.children[1].textContent = "Following"
                    button.children[0].classList.add("none")
                    setIsFollowingButton("isFollowingButton")
                    setButtonIsDisabled(false)
                    button.classList.remove("disabledButton")
                    setText("Following")
                    if(setIsFollowingTypeA){
                        setIsFollowingTypeA(true)
                    }

                    //("c'est la premiere partie qui est lu")
                }
                else if(button&&isFollowingType!==null&&!setIsFollowingButton){
                    //("c bien la deuxieme qui est lu")
                    if(isFollowingType){
                        //("la c'est changer en following")
                        button.value = "Following"
                        setText("Following")
                        isFollowingType = false
                        setButtonIsDisabled(false)
                        button.classList.remove("disabledButton")
                        setIsFollowingTypeA(false)
                    }else{
                        //("la c'est changer en follow")
                        button.value = "Follow"
                        setIsFollowingTypeA(false)
                        isFollowingType = true
                        setText("Follow")
                        setButtonIsDisabled(false)
                        button.classList.remove("disabledButton")

                 
                    }
                }
            }
        }).catch(err => {
            console.error(err)
        })
        return dispatch({ type: FOLLOW_USER_TYPE_TWO, payload: { _id: userToFollowId } })
    }
}
export const unFollowUserTypeTwo = (userToFollowId, followerId, button, setIsFollowingButton,setText,isFollowingType,setButtonIsDisabled,setIsFollowingTypeA) => {
    return dispatch => {
        if(setButtonIsDisabled!==null){
            setButtonIsDisabled(true)
            button.classList.add("disabledButton")
        }
        
        axios.patch("https://tweeter-clone-back-22.onrender.com/auth/unfollowUser/" + userToFollowId, { followerId }).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                if (button) {
                    if(setIsFollowingButton!==undefined){
                        setIsFollowingButton("")
                        button.children[0].classList.remove("none")
                    }
                    setButtonIsDisabled(false)
                    button.classList.remove("disabledButton")
                    button.value = "Follow"
                    setText("Follow")
                    //("c'est lu et c'est transformé")
                    if(setIsFollowingTypeA){
                        setIsFollowingTypeA(true)
                    }
                    button.children[0].classList.remove("none")
                    //("tout s'est bien passé ")
                    isFollowingType = true
               
                }
            }
        }).catch(err => {
            console.error(err)
        })
        //("concours ici : ")
        //(userToFollowId)
        return dispatch({ type: UN_FOLLOW_USER_TYPE_TWO, payload: { _id: userToFollowId, followerId } })
    }
}