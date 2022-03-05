import React, { useEffect, useState } from "react";
import jwt from 'jwt-decode';
import Header from '../components/Header';
import Tweets from "../components/Tweets";
import Suggestion from "../components/Suggestion";

import { memo } from 'react';
import HeaderInTheBottom from "../components/HeaderInTheBottom";

const Home = ({actuallyUser,tweets,sortedUsers,actuallyHashtags,setVerySpecialPounce}) => {

    let cooks = document.cookie.split(";")
    let id;
    for (let index = 0; index < cooks.length; index++) {
        try {
            let a = jwt(cooks[index])
            if (a) {
                id = a.id
            }
        } catch (err) {
            console.error("this cookie are not valide")
        }
    }




    return (
        <>
            {!id ? window.location.replace("/login") :
                <div className="HomePage">
                    <div className="principaleContainer">
                        <Header />
                        <div className="content">
                            <Tweets setVerySpecialPounce = {setVerySpecialPounce} user={actuallyUser} tweets={tweets} />
                            <Suggestion userId={actuallyUser._id} users={sortedUsers} hashtags={actuallyHashtags} userPicture={actuallyUser.profilePicture} />
                        </div>
                        <HeaderInTheBottom/>
                    </div>
                </div>}
        </>
    )
}

export default memo(Home)