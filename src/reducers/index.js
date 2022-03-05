import { combineReducers } from "redux";
import actuallyUserReducer from './actuallyUserReducer';
import tweetsReducer from "./tweetsReducer";
import hashtagsReducer from "./hashtagsReducer";
import usersReducer from './usersReducer';

export const allReducers = combineReducers({
    actuallyUserReducer,
    tweetsReducer,
    hashtagsReducer,
    usersReducer
})