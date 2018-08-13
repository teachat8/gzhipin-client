/**
 * 大神信息完善路由容器组件
 */

 import React, {Component} from 'react'
 import {NavBar, InputItem, Button, TextareaItem} from 'antd-mobile'
 import HeaderSelector from '../../components/header-selector/header-selector'
 import {Redirect} from 'react-router-dom'
 import {updateUser} from '../../redux/actions'
 import {connect} from 'react-redux'

class DashenInfo extends Component {

    state = {
        header : '',                //  头像名称
        post : '',                   //    职位   
        info : '',                   //     个人或职位简介
    }

    handleChange = (name, value) => {
        this.setState({
            [name] : value
        })
    }
    //   更新header状态
    setHeader = (header) => {
        this.setState({
            header
        })
    }

    save = ( ) => {
        // console.log(this.state)
        this.props.updateUser(this.state)
    }

     render ( ) {
         console.log(this.state)
        //如果信息已经完善，自动重定向到对应的主界面
        const {header, type} = this.props.user
        if (header) {   //    header有值，说明信息已经完善
            const path = type === 'dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path} />
        }

         return (
             <div>
                 <NavBar>大神信息完善</NavBar>
                 <HeaderSelector setHeader={this.setHeader} />
                <InputItem placeholder='请输入求职岗位' onChange={val =>{ this.handleChange('post', val)}}>求职岗位:</InputItem>
                <TextareaItem title="个人介绍:" 
                                        rows={3} onChange={val =>{ this.handleChange('info', val)}}  />
                <Button type='primary' onClick={this.save}>保&nbsp;&nbsp;&nbsp;存</Button>
             </div>
         )
     }
 }

 export default connect(
     state => ({user : state.user}),
     {updateUser}
 )(DashenInfo)