import React, { useState, useEffect } from 'react';
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Bookmarks from './pages/Bookmarks';
import Notfound from './pages/Notfound';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import jwt from 'jwt-decode';
import ProfileSettings from './pages/ProfileSettings';
import { useSelector } from "react-redux";
import Loading from './components/Loading';

const App = () => {

  const actuallyUsersReducer = useSelector(state => state.usersReducer)
  const actuallyUserReducer = useSelector(state => state.actuallyUserReducer)
  const actuallyHashtagsReducer = useSelector(state => state.hashtagsReducer)
  const tweetsReducer = useSelector(state => state.tweetsReducer)

  const [actuallyUser, setActuallyUser] = useState([])
  const [actuallyUsers, setActuallyUsers] = useState([])
  const [actuallyHashtags, setActuallyHashtags] = useState([])
  const [tweets, setTweets] = useState([])

  const [pounce, setPounce] = useState(true)
  const [canCharge, setCanCharge] = useState(false)

  let sortedUsers = [...actuallyUsersReducer];

  window.onload = () => {
    sortedUsers.sort(() => 0.5 - Math.random()).filter(user => user._id !== actuallyUser._id)
    setPounce(true)
  }
  let cooks = document.cookie.split(";")
  let id;
  for (let index = 0; index < cooks.length; index++) {
    try {
      let a = jwt(cooks[index])
      if (a) {
        id = a.id
        //("le cookie est valid")
      }
    } catch (err) {
      console.error("this cookie are not valide")
    }
  }

  useEffect(() => {
    if (pounce) {
      setActuallyUser(actuallyUserReducer)
      setActuallyUsers(actuallyUsersReducer)
      setActuallyHashtags(actuallyHashtagsReducer)
      setTweets(tweetsReducer)

      //("le use effect principale est lu attention")
      if(id){
        if (actuallyUsers.length > 0 && actuallyUser.pseudo !== undefined && actuallyHashtags.length > 0 && tweets.length > 0) {
          setTimeout(() => {
            //("tout est bon et prés a étre chargé")
            setCanCharge(true)
          }, 1100);
        } else {
          //("toujours pas bon a chargé")
          setCanCharge(false)
        }
      }else{
        setTimeout(() => {
          //("tout est bon et prés a étre chargé")
          setCanCharge(true)
        }, 1100);
      }
      //setPounce(false)
    }
  })
  const [verySpecialPounce,setVerySpecialPounce] = useState(false)
  useEffect(()=>{
    if(verySpecialPounce){
      setTweets(tweetsReducer)
      setVerySpecialPounce(false)
    }
  },[verySpecialPounce])

  return (
    <div className='containerOfAll' >
      {canCharge ? <BrowserRouter >
        <Switch>
          <Route path="/login" component={Signin} exact />
          <Route path="/signup" component={Signup} exact />
          <Route path="/home" exact ><Home setVerySpecialPounce = {setVerySpecialPounce} actuallyUser={actuallyUser} actuallyHashtags={actuallyHashtags} sortedUsers={sortedUsers} tweets={tweets} /></Route>
          <Route path="/" exact component={() => {
            window.location.replace("/home")
          }} />
          <Route path="/explore/tweets"><Explore setVerySpecialPounce = {setVerySpecialPounce} /></Route>
          <Route path="/explore/tweets/lastest"><Explore setVerySpecialPounce = {setVerySpecialPounce} /></Route>
          <Route path="/explore/tweets/people"><Explore setVerySpecialPounce = {setVerySpecialPounce} /></Route>
          <Route path="/explore/tweets/media"><Explore setVerySpecialPounce = {setVerySpecialPounce} /></Route>
          <Route path="/explore/tweets/top"><Explore setVerySpecialPounce = {setVerySpecialPounce} /></Route>
          <Route path="/i/bookmarks" component={Bookmarks} />
          <Route path="/user/:name" component={Profile} strict />
          <Route path="/user/:name/" component={Profile} strict />
          <Route path="/user/:name/with_replies" component={Profile} strict />
          <Route path="/user/:name/media" component={Profile} strict />
          <Route path="/user/:name/likes" component={Profile} strict />
          <Route path="/profile/settings/:name" strict exact component={ProfileSettings} />
          <Route component={Notfound} />
        </Switch>
      </BrowserRouter> : <Loading />}

    </div>
  )
}

export default App;
