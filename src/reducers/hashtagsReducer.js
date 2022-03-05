import { GET_ALL_HASHTAGS } from "../Actions/hashtagsActions";


const hashtagsReducer = (state=[],action)=>{
    switch (action.type) {
        case GET_ALL_HASHTAGS:
            return action.payload
        default:
            return state;
    }
}

export default hashtagsReducer