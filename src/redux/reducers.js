/**
 *   包含n个reducer函数：根据老的state和指定的action返回一个新的state
 * 
 */
import {combineReducers} from 'redux'
import {
    AUTH_SUCCESS,
    ERROR_MSG
} from './action-types'


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
            return  { ...action.data, redirectTo : '/'}
        case ERROR_MSG :           //   data是msg
            return {...state, msg : action.data}
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
    user
})
//     向外暴露的状态的结构： {xxx：0, yyy：0, user : {}}
