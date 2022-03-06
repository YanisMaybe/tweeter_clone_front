import axios from 'axios';
import React, {useState,useEffect} from 'react';
import { NavLink } from 'react-router-dom';


const ProfileBloc = ({ posterId,name, date, setAnotherPounce,posterPseudo }) => {
    let days1 = Date.now() / 1000 / 60 / 60 / 24;
    let days2 = date / 1000 / 60 / 60 / 24;
    let theTime = ""

    let time = days1 - days2;
    
    if(typeof date === "string"){
        theTime = date
    }else{
        let theDate = new Date(date)
        if (time < 1) {
            let hourC = theDate.toLocaleString().split(",")[1].split(" ")[1].split(":")
            let hourR = hourC[0] + ":" + hourC[1]
    
            theTime = "today at " + hourR
        } else if (time >= 1) {
            let toDateString = theDate.toDateString().split(" ")
            let day = ""
            if (toDateString[0] === "Mon") {
                day = "Monday"
            } else if (toDateString[0] === "Tue") {
                day = "Tuesday"
            } else if (toDateString[0] === "Thu") {
                day = "Thursday"
            } else if (toDateString[0] === "Sat") {
                day = "Saturday"
            } else if (toDateString[0] === "Fri") {
                day = "Friday"
            } else if (toDateString[0] === "Sun") {
                day = "Sunday"
            } else if (toDateString[0] === "Wed") {
                day = "Wednesday"
            }
            let hourC = theDate.toLocaleString().split(",")[1].split(" ")[1].split(":")
            let hourR = hourC[0] + ":" + hourC[1]
    
            theTime = day + " " + toDateString[2] + " " + toDateString[1] + " at " + hourR
        }
     
    }

   
    return (
        <div className="profileBloc">
            <img onError={(e) => {e.target.onerror = null; e.target.src = 'https://abs.twimg.com/sticky/default_profile_images/default_profile_200x200.png'}} src={`https://tweeter-clone-back-22.onrender.com/images/${posterId}.jpg`} />
            <div className="userNameAndDate">
                <a onClick = {()=>{
                    if(setAnotherPounce!==null&&setAnotherPounce!==undefined){
                        setAnotherPounce(true);
                    }
                }} userName = {name} href = {"/user/"+posterPseudo}><p className="name linkName">{name}</p></a>
                <p className="date griser">{theTime}</p>
            </div>
        </div>
    )
}

export default ProfileBloc
