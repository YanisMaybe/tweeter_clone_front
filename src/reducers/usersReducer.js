import { FOLLOW_USER, FOLLOW_USER_TYPE_TWO, GET_USERS, UN_FOLLOW_USER, UN_FOLLOW_USER_TYPE_TWO } from "../Actions/usersAction";


const usersReducer = (state=[],action)=>{
    switch (action.type) {
        case GET_USERS:
            return action.payload
            
        case FOLLOW_USER:
            return state.map(user=>{
                if(user._id===action.payload._id){
                    console.error("euh bonjour je suis le another log 1")
                    //(action.payload._id)
                    const list = [...user.followers,action.payload._id]
                    //(list)
                    return {...user,followers:list}
                }else{
                    //("l'autr log")
                    return user
                }
            })
        case UN_FOLLOW_USER:
            return state.map((user,index)=>{
                if(user._id===action.payload._id){
                    console.error("euh bonjour je suis le log")
                    let newFollowers = user.followers.splice(index,index)
                    return {...user,followers:newFollowers}
                }else{
                    //("l'autr log")
                    return user
                }
            })
        case FOLLOW_USER_TYPE_TWO:
            return state.map(user=>{
                if(user._id===action.payload._id){
                    console.error("euh bonjour je suis le log 1")
                    //(action.payload._id)
                    const list = [...user.followers,action.payload._id]
                    //(list)
                    return {...user,followers:list}
                }else{
                    //("l'autr log")
                    return user
                }
            })
        case UN_FOLLOW_USER_TYPE_TWO:
            return state.map((user,index)=>{
                if(user._id===action.payload._id){
                    console.error("euh bonjour je suis le log")
                    let newFollowers = user.followers.splice(index,index)
                    return {...user,followers:newFollowers}
                }else{
                    //("l'autr log")
                    return user
                }
            })
        default:
            return state;
    }
}

export default usersReducer