import axios from 'axios';

export const GET_ALL_HASHTAGS = "GET_ALL_HASHTAGS"

const getHashtags = () => {
    return dispatch => {
        axios.get("https://tweeter-clone-back-22.onrender.com/app/gethashtags").then(res=>{
            if(!res.data.error){
                //("les hashtags ont été recuperé")
                dispatch({type:GET_ALL_HASHTAGS,payload:res.data})
            }else{
                console.error(res.data.error)
            }
        }).catch(err=>{
            console.error(err)
        })
    }
}

export default getHashtags