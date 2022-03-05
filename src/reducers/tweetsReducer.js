import { COMMENT_ONE_TWEET, CREATE_TWEET, GET_TWEETS, LIKE_COMMENT_FROM_TWEET, LIKE_TWEET, RETWEET_TWEET, SAVE_TWEET, UNLIKE_COMMENT_FROM_TWEET, UN_LIKE_TWEET, UN_RETWEET_TWEET, UN_SAVE_TWEET } from "../Actions/postActions";


const tweetsReducer = (state = [], action) => {
    switch (action.type) {
        case SAVE_TWEET:
            return state.map(tweet => {
                if (tweet._id === action.payload._id||tweet.date===action.payload._id) {
                    let newSaves = tweet.saves = [...tweet.saves, action.payload._id]
                    return { ...tweet, saves: newSaves }
                } else {
                    return tweet
                }
            })
        case UN_SAVE_TWEET:
            return state.map((tweet,index) => {
                if (tweet._id+"" === action.payload._id+""||tweet.date===action.payload._id) {
                    let newSaves = tweet.saves.splice(index,index)
                    return { ...tweet, saves: newSaves }
                } else {
                    return tweet
                }
            })
        case LIKE_TWEET:
            return state.map(tweet => {
                if (tweet._id === action.payload._id) {
                    return action.payload
                } else {
                    return tweet
                }
            })
        case UN_LIKE_TWEET:
            return state.map(tweet => {
                if (tweet._id === action.payload._id) {
                    return action.payload
                } else {
                    return tweet
                }
            })
        case RETWEET_TWEET:
            return state.map(tweet => {
                if (tweet._id === action.payload.tweetToRetweetId||tweet.date===action.payload.tweetToRetweetId) {
                    tweet.retweets = [...tweet.retweets, action.payload._id]
                    let newRetweets = [...tweet.retweets, action.payload._id]

                    return { ...tweet, retweets: newRetweets.filter((item, pos) => newRetweets.indexOf(item) == pos) }
                } else {
                    return tweet
                }
            })
        case UN_RETWEET_TWEET:
            return state.map((tweet,index) => {
                if (tweet._id === action.payload._id||tweet.date===action.payload._id) {
                    let newRetweets = tweet.retweets.splice(index,index)
                    return { ...tweet, retweets: newRetweets }
                } else {
                    return tweet
                }
            })

        case GET_TWEETS:
            return action.payload
        case CREATE_TWEET:
            return [action.payload, ...state]
        case COMMENT_ONE_TWEET:
            return state.map(tweet => {
                if (tweet._id === action.payload.tweetToCommentId) {
                    return { ...tweet, comments: [action.payload.commentInfo, ...tweet.comments] }
                } else {
                    return tweet
                }
            })
        case LIKE_COMMENT_FROM_TWEET:
            return state.map(tweet => {
                if (tweet._id === action.payload.tweetId) {
                    const comm = tweet.comments.map(comment => {
                        if (comment._id === action.payload.commentId) {
                            return { ...comment, likes: [action.payload.likerId, ...comment.likes] }
                        } else {
                            return comment
                        }
                    })
                    return { ...tweet, comments: comm }
                } else {
                    return tweet;
                }
            })
        case UNLIKE_COMMENT_FROM_TWEET:
            return state.map(tweet => {
                if (tweet._id === action.payload.tweetId) {
                    const comm = tweet.comments.map(comment => {
                        if (comment._id === action.payload.commentId) {
                            let newLikes = comment.likes.filter(like => like !== action.payload.likerId)
                            return { ...comment, likes: newLikes }
                        } else {
                            return comment
                        }
                    })
                    return { ...tweet, comments: comm }
                } else {
                    return tweet;
                }
            })
        default:
            return state;
    }
}

export default tweetsReducer