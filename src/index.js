import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { allReducers } from './reducers';
import jwt from 'jwt-decode';
import { getUser, getUsers } from './Actions/usersAction';
import { getAllTweets } from './Actions/postActions';
import getHashtags from './Actions/hashtagsActions';

const store = createStore(
  allReducers,
  composeWithDevTools(applyMiddleware(thunk))
)

let cooks = document.cookie.split(";")
let id;
for (let index = 0; index < cooks.length; index++) {
  try {
    let a = jwt(cooks[index])
    if (a) {
      id = a.id
      //("le cookie est valid", { color: 'green' })
    }
  } catch (err) {
    console.error("this cookie are not valide")
  }
}
if(id){
  //("l'id est la")
  store.dispatch(getUser(id))
  store.dispatch(getAllTweets())
  store.dispatch(getHashtags())
  store.dispatch(getUsers())
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}><App /></Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
