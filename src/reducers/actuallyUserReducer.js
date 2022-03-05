import { LIKE_TWEET, SAVE_TWEET, UN_LIKE_TWEET, UN_SAVE_TWEET } from "../Actions/postActions";
import { FOLLOW_USER, GET_USER, UN_FOLLOW_USER } from "../Actions/usersAction";

const actuallyUserReducer = (state = {}, action) => {
    switch (action.type) {
        case GET_USER:
            return { ...state, ...action.payload }
        case FOLLOW_USER:
            //("nous somme dans le reducer du follow")
            return { ...state, followings: [...state.followings, action.payload._id] }
        case UN_FOLLOW_USER:
            let a = state.followings.filter((following) => following !== action.payload._id)
            return { ...state, followings: a }
        case UN_LIKE_TWEET:
            let b = state.likes.filter(lks => lks !== action.payload._id)
            return { ...state, likes: b }
        case LIKE_TWEET:
            return { ...state, likes: [...state.likes, action.payload._id] }
        case SAVE_TWEET:
            return { ...state, saves: [...state.saves, action.payload._id] }
        case UN_SAVE_TWEET:
            let c = state.saves.filter(svs => svs !== action.payload._id)
         
            return { ...state, saves: c }
        default:
            return state
    }
}

export default actuallyUserReducer;