import React from 'react';
import { NavLink } from 'react-router-dom';

const TrendUser = ({user}) => {

    return (
        <NavLink to = {"/user/"+user.pseudo} className="trendsForUser">
            <div className="userBlocOfTrends btn">
                <div className="containerOfUserBlocOfTrends">
                    <p className="griser">Trending</p>
                    <div className="nameOfTrend">
                        <p className="bolder">{user.pseudo}</p>
                    </div>
                    <div className="subNumbers">
                        <p className="griser">{user.followers.length} followers</p>
                    </div>
                </div>
            </div>
        </NavLink>
    )
}

export default TrendUser;