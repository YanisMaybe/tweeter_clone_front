import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import bottomArrow from '../imports/bottomArrow.svg';
import logoutIcon from '../imports/logout.svg'

const Header = () => {
    const [now, setNow] = useState(true)
    const actuallyUser = useSelector(state => state.actuallyUserReducer)
    const [phtotoToUseForThePupup,setPhotoToUseForThePopup] = useState(bottomArrow)


    useEffect(()=>{
        //(document.body.clientWidth)
        //(document.body.width)
        if(document.body.clientWidth<=703){
            setPhotoToUseForThePopup(actuallyUser.profilePicture)
            //("image changé !")
        }
    },[])
    return (
        <div className="header">
            <NavLink to="/home">
                <svg fill="#1da1f2" width="40" heigth="40" viewBox="0 0 24 24" aria-hidden="true" class="r-k200y r-13gxpu9 r-4qtqp9 r-yyyyoo r-eu3ka r-dnmrzs r-bnwqim r-1plcrui r-lrvibr">
                    <g>
                        <path d="M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z">
                        </path>
                    </g>
                </svg>
                <h3 id="#twzeiterename1dzadaz">Tweeter</h3>
            </NavLink>
            <div className="pagesZone">
                <NavLink activeClassName="linkSelected" exact to="/home"><p>Home</p></NavLink>
                <NavLink activeClassName="linkSelected" to="/explore/tweets"><p>Explore</p></NavLink>
                <NavLink activeClassName="linkSelected" to="/i/bookmarks"><p>Bookmarks</p></NavLink>
            </div>
            <div className="profileZone">
                <div className="imageBloc">
                    <img src={actuallyUser.profilePicture} id="frudti2dza5azxéé" alt="profile" />
                    <img onClick={e=>{
                        if (now) {
                            let profilePopup = document.querySelector(".profilePopup")
                            profilePopup.classList.remove("none")
                            setNow(false)
                        } else {
                            let profilePopup = document.querySelector(".profilePopup")
                            profilePopup.classList.add("popupAnimReverse")
                            setTimeout(() => {
                                profilePopup.classList.remove("popupAnimReverse")
                                profilePopup.classList.add("none")
                            }, 200);
                            setNow(true)
                        }
                    }} src={actuallyUser.profilePicture} id="krusofa55456ééef" alt="profile" />
                </div>
                <a style = {{marginLeft: "5px"}} className = "aSpecific" href = {"/user/"+actuallyUser.pseudo}><p className = "name linkName">{actuallyUser.name}</p></a>
                <img onClick={e => {
                    if (now) {
                        let profilePopup = document.querySelector(".profilePopup")
                        profilePopup.classList.remove("none")
                        setNow(false)
                        e.target.style.transform = `rotateZ(180deg)`
                    } else {
                        let profilePopup = document.querySelector(".profilePopup")
                        profilePopup.classList.add("popupAnimReverse")
                        setTimeout(() => {
                            profilePopup.classList.remove("popupAnimReverse")
                            profilePopup.classList.add("none")
                        }, 200);
                        setNow(true)
                        e.target.style.transform = `rotateZ(0deg)`
                    }
                }} className="btn" src={bottomArrow} alt="bottom arrow" />
            </div>
            <div className="profilePopup none">
                <div className="logout">
                    <img src={logoutIcon} alt="logout" />
                    <button onClick={e => {
                        document.cookie = 'user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
                        window.location.reload()
                    }} style={{backgroundColor:"transparent"}} className="logoutP btn">logout</button>
                </div>
                <div className="profil3">
                    <svg viewBox="0 0 24 24" aria-hidden="true" class="r-18jsvk2 r-4qtqp9 r-yyyyoo r-lwhw9o r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g><path d="M12 11.816c1.355 0 2.872-.15 3.84-1.256.814-.93 1.078-2.368.806-4.392-.38-2.825-2.117-4.512-4.646-4.512S7.734 3.343 7.354 6.17c-.272 2.022-.008 3.46.806 4.39.968 1.107 2.485 1.256 3.84 1.256zM8.84 6.368c.162-1.2.787-3.212 3.16-3.212s2.998 2.013 3.16 3.212c.207 1.55.057 2.627-.45 3.205-.455.52-1.266.743-2.71.743s-2.255-.223-2.71-.743c-.507-.578-.657-1.656-.45-3.205zm11.44 12.868c-.877-3.526-4.282-5.99-8.28-5.99s-7.403 2.464-8.28 5.99c-.172.692-.028 1.4.395 1.94.408.52 1.04.82 1.733.82h12.304c.693 0 1.325-.3 1.733-.82.424-.54.567-1.247.394-1.94zm-1.576 1.016c-.126.16-.316.246-.552.246H5.848c-.235 0-.426-.085-.552-.246-.137-.174-.18-.412-.12-.654.71-2.855 3.517-4.85 6.824-4.85s6.114 1.994 6.824 4.85c.06.242.017.48-.12.654z"></path></g></svg>
                    <a id="prodifled251csq" href = {"/user/"+actuallyUser.pseudo} >Profil</a>
                </div>
            </div>
        </div>
    )
}

export default Header;