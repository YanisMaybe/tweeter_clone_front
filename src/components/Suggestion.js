import React, { useState } from 'react'
import FriendSug from './FriendSug'
import { memo } from 'react'
import { useSelector } from 'react-redux'

const Suggestion = ({ }) => {

    const userPicture = useSelector(state => state.actuallyUserReducer.profilePicture);
    const hashtags = useSelector(state => state.hashtagsReducer)
    const users = useSelector(state => state.usersReducer)
    const TheUser = useSelector(state => state.actuallyUserReducer)
    const userId = TheUser._id;
    const [realUsers,setRealUsers] = useState([...users])

    hashtags.length = 6
    realUsers.length = 2
    return (
        <>
            <div className="TrendsAndFriends">
                <div className="trends">
                    <div className="intro">
                        <p>Tendances pour vous</p>
                        <div className="transistor"></div>
                    </div>
                    <div className="hashtags">
                        {hashtags && hashtags.sort((a, b) => b.numberOfTimes.length - a.numberOfTimes.length).map((hash, index) => {
                            return <div key={index} className="hashtag">
                                <h3 className="nameOfHashtag">{hash.nameOfHashtag}</h3>
                                <p className="numberOfUser griser">{hash.numberOfTimes.length} tweets</p>
                            </div>
                        })}
                    </div>
                </div>
                <div className="whoToFollow">
                    <div className="intro">
                        <p>Qui suivre</p>
                    </div>
                    <div className="friendSuggestions">
                        {users.filter(user => user._id !== TheUser._id).map((user, index) => {
                            if(index<2){
                                return <FriendSug covImage = {user.coverPicture} actuallyUser={TheUser._id} user={user} key={index} userId={userId} friendSugId={user._id} userPicture={user.profilePicture} name={user.pseudo} bio={user.bio} subs={user.followers} />
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(Suggestion)