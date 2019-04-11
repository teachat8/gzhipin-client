/**
 *   包含n个reducer函数：根据老的state和指定的action返回一个新的state
 * 
 */
import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG,
    RECEIVE_MSG_LIST,
    MSG_READ
} from './action-types'

import {getRedirectTo} from '../utils'


const initUser = {
    username : '',        //   用户名
    type : '',                //    用户类型  dashen/laoban
    msg : '',                //     错误提示信息
    redirectTo : '',      //      需要自动重定向的路由路径
}
//   产生user状态的reducer
function user (state=initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS :     //  data是user
            const {type, header} = action.data
            return  { ...action.data, redirectTo : getRedirectTo(type, header)}
        case ERROR_MSG :           //   data是msg
            return {...state, msg : action.data}
        case RECEIVE_USER :      //   接收用户, data是user
            return action.data
        case RESET_USER :           //    重置用户, data是msg
            return {...initUser, msg : action.data}
        default : 
            return state
    }
}

const initUserList = [ ]
//    产生userList状态的reducer
function userList (state=initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST :        //   data为userList
            return action.data         
        default :
            return state
    }
}

// 初始 chat 对象
const initChat = {
    users : { },                  //  所有用户信息的对象{id1: user1, id2: user2}     属性名：userid， 属性值是：{username, header}
    chatMsgs : [ ],           //   当前用户所有相关消息数组[{from: id1, to: id2},{}]
    unReadCount : 0       //    总的未读数量
}
//    产生聊天状态的reducer
function chat (state=initChat, action) {
    switch (action.type) {
        case RECEIVE_MSG_LIST :         //  data: {users, chatMsgs}
            const {users, chatMsgs, userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount : chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userid ? 1 : 0),0)
            }
        case RECEIVE_MSG :                 //   data:  chatMsg
            const chatMsg = action.data
            return {
                users : state.users,
                chatMsgs : [...state.chatMsgs, chatMsg],
                unReadCount : state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
            }
        case MSG_READ :
            const {from, to, count} = action.data
            state.chatMsgs.forEach(msg => {
                if (msg.from ===from && msg.to ===to && !msg.read) {
                    msg.read = true
                }
            })
            return {
                users : state.users,
                chatMsgs : state.chatMsgs.map(msg => {
                    if (msg.from === from && msg.to ===to && !msg.read) {     //  需要更新
                        return {...msg, read : true}
                    } else {    //   不需要更新
                        return msg
                    }
                }),
                unReadCount : state.unReadCount - count
            }
        default : 
            return state
    }
}


function xxx (state=0, action) {
    return state
}

function yyy (state=0, action) {
    return state
}



//   返回合并后的reducer函数
export default combineReducers({
    xxx,
    yyy,
    user,
    userList,
    chat,
})
//     向外暴露的状态的结构： {xxx：0, yyy：0, user : {}, userList : [ ]}
