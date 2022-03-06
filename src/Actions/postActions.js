import axios from 'axios';

export const CREATE_TWEET = "CREATE_TWEET";
export const GET_TWEETS = "GET_TWEETS";
export const SAVE_TWEET = "SAVE_TWEET";
export const UN_SAVE_TWEET = "UN_SAVE_TWEET";
export const LIKE_TWEET = "LIKE_TWEET";
export const UN_LIKE_TWEET = "UN_LIKE_TWEET";
export const RETWEET_TWEET = "RETWEET_TWEET";
export const UN_RETWEET_TWEET = "UN_RETWEET_TWEET";
export const COMMENT_ONE_TWEET = "COMMENT_ONE_TWEET";
export const LIKE_COMMENT_FROM_TWEET = "LIKE_COMMENT_FROM_TWEET";
export const UNLIKE_COMMENT_FROM_TWEET = "UNLIKE_COMMENT_FROM_TWEET";

export const createTweet = (posterName, posterId, posterPicture, media, text,isEvery,userFollowings,EmptyConfig,posterPseudo,setIfButtonAreDisabled,actuallyUser) => {
    return dispatch => {

        const formData = new FormData()
        formData.append("posterName", posterName)
        formData.append("posterId", posterId)
        formData.append("posterPicture", posterPicture)
        formData.append("image", media)
        formData.append("text", text)
        formData.append("saves", [])
        formData.append("retweets", [])
        formData.append("comments", [])
        formData.append("likes", [])
        formData.append("everyOneCanReply", isEvery)
        formData.append("userFollowings", userFollowings)
        formData.append("posterPseudo", posterPseudo)
        //(formData)
        
        const data = {
            posterName: actuallyUser.name,
            posterId: actuallyUser._id,
            posterPicture: actuallyUser.profilePicture,
            posterPseudo: actuallyUser.pseudo,
            text,
            userFollowings,
            likes : [],
            comments: [],
            saves: [],
            retweets: [],
            everyOneCanReply: isEvery
        }
        console.log("voici au cas ou la data")
        console.log(data)
        //(media)
        setIfButtonAreDisabled(true)
        return axios.post("https://tweeter-clone-back-22.onrender.com/app/createtweet", formData).then(res => {
            if (!res.data.error) {
                //("requête reussi !")
                //(res.data)
                setIfButtonAreDisabled(false)
                //window.location.reload()
                return dispatch({ type: CREATE_TWEET, payload: {...data,date:res.data.date,media:res.data.media,EmptyConfig,liked:false,saved:false,retweeted:false}})
            } else {
                //("it's me : "+res.data.error)
                return {};
            }
        }).catch(err => {
            console.error(err)
            return {};
        })
    }
}
export const getAllTweets = () => {
    return dispatch => {
        axios.get("https://tweeter-clone-back-22.onrender.com/app/gettweets").then(res => {
            if (res.data.error) {
                //("requete non reussi")
                console.error(res.data.error)
            } else {
                //("requête reussi !")
                //(res.data)
                dispatch({ type: GET_TWEETS, payload: res.data })
            }

        }).catch(err => {
            console.error("emm " + err)
        })
    }
}
export const saveTweet = (saverId, tweetToSaveId,date) => {
    return dispatch => {
        console.log(saverId + "  et  "+tweetToSaveId+ "     et    " + date)
        dispatch({ type: SAVE_TWEET, payload: { _id: tweetToSaveId } })
        axios.patch("https://tweeter-clone-back-22.onrender.com/app/savetweet/" + tweetToSaveId, { saverId,date }).then(res => {
            if (!res.data.error&&res) {
                console.log("requête reussi !")
            } else {
                console.error(res.data.error)
                axios.patch("https://tweeter-clone-back-22.onrender.com/app/savetweet/" + date, { saverId }).then(rs=>{
                    if(!rs.data.error){
                        
                    }else{
                        console.error(rs.data.error)
                    }
                })
            }
        }).catch(err => {
            console.error("err: " + err)
        })
   
    }
}
export const unSaveTweet = (saverId, tweetToUnSaveId) => {
    return dispatch => {
        dispatch({ type: UN_SAVE_TWEET, payload: { _id: tweetToUnSaveId } })
        axios.patch("https://tweeter-clone-back-22.onrender.com/app/unsavetweet/" + tweetToUnSaveId, { saverId }).then(res => {
            if (!res.data.error) {
                //("requête reussi !")
            } else {
                console.error(res.data.error)
            }
        }).catch(err => {
            console.error("err: " + err)
        })
       

    }
}
export const likeTweet = (likerId, tweetToLikeId) => {
    return dispatch => {
        axios.patch("https://tweeter-clone-back-22.onrender.com/app/liketweet/" + tweetToLikeId, { likerId }).then(res => {
            if (!res.data.error) {
                //("requête reussi !")
                dispatch({ type: LIKE_TWEET, payload: res.data })
            } else {
                console.error(res.data.error)
            }
        }).catch(err => {
            console.error("err: " + err)
        })


    }
}
export const unLikeTweet = (likerId, tweetToUnLikeId) => {
    return dispatch => {
        axios.patch("https://tweeter-clone-back-22.onrender.com/app/unliketweet/" + tweetToUnLikeId, { likerId }).then(res => {
            if (!res.data.error) {
                //("requête reussi !")
                dispatch({ type: UN_LIKE_TWEET, payload: res.data })
            } else {
                console.error(res.data.error)
            }
        }).catch(err => {
            console.error("err: " + err)
        })


    }
}
export const retweetTweet = (retweeterId, tweetToRetweetId) => {
    return dispatch => {
        axios.patch("https://tweeter-clone-back-22.onrender.com/app/reteweetTweet/" + tweetToRetweetId, { retweeterId }).then(res => {
            if (!res.data.error) {
                //("requête reussi !")
            } else {
                console.error(res.data.error)
                console.error("ceci est une erreur")
            }
        }).catch(err => {
            console.error("err: " + err)
        })
        dispatch({ type: RETWEET_TWEET, payload: { _id: retweeterId,tweetToRetweetId:tweetToRetweetId } })

    }
}
export const unRetweetTweet = (retweeterId, tweetToUnRetweetId,date) => {
    return dispatch => {
        axios.patch("https://tweeter-clone-back-22.onrender.com/app/unreteweetTweet/" + tweetToUnRetweetId, { retweeterId }).then(res => {
            if (!res.data.error) {
                //("requête reussi !")
            } else {
                console.error(res.data.error)
            }
        }).catch(err => {
            console.error("err: " + err)
        })
        dispatch({ type: UN_RETWEET_TWEET, payload: { _id: tweetToUnRetweetId } })

    }
}
export const commentOneTweet = (tweetToCommentId, commenterId, commenterName, commenterPicture, text, media) => {
    return dispatch => {
        const formData = new FormData()
        formData.append("commenterId", commenterId)
        formData.append("commenterName", commenterName)
        formData.append("commenterPicture", commenterPicture)
        formData.append("text", text)
        formData.append("image", media)
        formData.append("date", new Date().getTime())
        formData.append("likes", [])

        //("le formdata")
        
        axios.patch("https://tweeter-clone-back-22.onrender.com/app/commenttweet/" + tweetToCommentId, formData).then(res => {
            if (res.data.error) {
                console.error(res.data.error)
            } else {
                //(res.data)
            }
        }).catch(err => {
            console.error(err)
        })
        return dispatch({ type: COMMENT_ONE_TWEET, payload: {tweetToCommentId,commentInfo: {commenterId,commenterName,commenterPicture,text,media,likes:[]}} })
    }
}
export const likeCommentInTweet = (tweetId,likerId,commentId) => {
    return dispatch => {
        const data = {
            likerId: likerId,
            commentId: commentId
        }
        //(data)
        axios.patch("https://tweeter-clone-back-22.onrender.com/app/tweets/comments/like/"+tweetId,data).then(res=>{
            if(!res.data.error){
                //("ca s'est bien passé")
            }else{
                console.error(res.data.error)
            }
        }).catch(err=>{
            console.error(err)
        })
        return dispatch({type:LIKE_COMMENT_FROM_TWEET,payload:{likerId,tweetId,commentId}})
    }
}
export const unLikeCommentInTweet = (tweetId,likerId,commentId) => {
    return dispatch => {
        const data = {
            likerId: likerId,
            commentId: commentId
        }
        //(data)
        axios.patch("https://tweeter-clone-back-22.onrender.com/app/tweets/comments/unlike/"+tweetId,data).then(res=>{
            if(!res.data.error){
                //("ca s'est bien passé")
            }else{
                console.error(res.data.error)
            }
        }).catch(err=>{
            console.error(err)
        })
        return dispatch({type:UNLIKE_COMMENT_FROM_TWEET,payload:{likerId,tweetId,commentId}})
    }
}