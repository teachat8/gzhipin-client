/**
 * 老板的主路由组件
 */

import React, {Component} from 'react'
import UserList from '../../components/user-list/user-list'
import {connect} from 'react-redux'

import {getUserList} from '../../redux/actions'

class Laoban extends Component {
    componentDidMount ( ) {
        //  获取userList
        this.props.getUserList('dashen')
    }

    render ( ) {
        return (
            <UserList userList={this.props.userList} />
        )
    }
}

export default connect(
    state => ({userList : state.userList}),
    {getUserList}
) (Laoban)