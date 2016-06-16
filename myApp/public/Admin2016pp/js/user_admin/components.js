import { Table,Icon,Button,QueueAnim} from 'antd';
import reqwest from 'reqwest';
import React,{findDOMNode,Component,PropTypes} from "react";
import {BtnRemove,BtnPass,BtnRecover} from "../global/cus_components";
var global_obj=require("../common");
function currentCreateTimeObj(){
    for(var i=1;i<=12;i++){
        var t={text: `${y}-${i}`, value: `${y}-${i}`};
        currentCreateTime.push(t)
    }
}
function currentStr(){
    var myDate = new Date();
    return {
        Y:myDate.getFullYear(), //获取完整的年份(4位,1970-????)
        M:myDate.getMonth()+1,
        Date:myDate.getDate(),
        W:myDate.getDate(),
        h:myDate.getHours(),       //获取当前小时数(0-23)
        m:myDate.getMinutes(),   //获取当前分钟数(0-59)
        s:myDate.getSeconds()
    }
}
function getDate(time){
    var date=global_obj.timeIntToTimeString(time);
    return date.Y+"-"+date.M+"-"+date.D+" "+date.h+":"+date.m+":"+date.s;
}
var y=currentStr().Y,m=currentStr().M,currentCreateTime=[];
currentCreateTimeObj();
//var type=parseInt(window.location.search.split("=").pop());

var SetIntervalMixin = {
    setLoading(status){
        this.setState({
            loading:status
        });
    },
    componentDidMount() {
        this.fetch();
    },
    setData(data){
        this.setState({
            data:data
        });
    }
};
/*
*
* 正常
* */
var data1 = [];
const columns1 = [{
    title: '编号',
    dataIndex: 'key',
    sorter: (a, b) =>{
        return a.key-b.key
    }
},{
    title: 'ID',
    dataIndex: 'uid',
    sorter: (a, b) =>{
        return a.uid-b.uid
    }
},{
    title: '用户名',
    dataIndex: 'username',
}, {
    title: '联系方式',
    dataIndex: 'phone',
},{
    title:'邮箱',
    dataIndex:'email'
},{
    title:"类型",
    dataIndex:"type",
    filters: [{
        text: '超级',
        value: '超级管理员'
    }, {
        text: '普通',
        value: '普通管理员'
    }],
    onFilter: (value, record) => {
        return record.type.indexOf(value) === 0
    }
},{
    title:'最近登录时间',
    dataIndex:"recent_login_time",
    filters: currentCreateTime,
    onFilter: (value, record) => {
        return record.recent_login_time.indexOf(value) === 0
    },
    sorter: (a, b) =>{
        return global_obj.getUnixTime(a.recent_login_time)-global_obj.getUnixTime(b.recent_login_time)
    }
},{
    title:'登录次数',
    dataIndex:'login_times',
    sorter: (a, b) =>{
        return a.login_times-b.login_times
    }
},{
    title:'注册时间',
    dataIndex:'register_time',
    filters: currentCreateTime,
    onFilter: (value, record) => {
        return record.register_time.indexOf(value) === 0
    },
    sorter: (a, b) =>{
        return global_obj.getUnixTime(a.register_time)-global_obj.getUnixTime(b.register_time)
    }
},{
    title:'操作',
    dataIndex:'do',
    render(text) {
        return <BtnRemove cid={text.uid} ctype={text.type} data={data1}  handleRemove={text.handleLi}>{text.remove}</BtnRemove>
    },
}];
var TableOne=React.createClass({
    mixins: [SetIntervalMixin],
    getInitialState() {
        return {
            data: [],
            loading: true
        };
    },
    fetch() {
        var type=window.location.search;
        var ty=type===""?"1":type.split("=")[1];
        setTimeout(()=> {
            reqwest({
                url: 'user_normal_list',
                method: 'post',
                data: {
                    type: ty
                },
                type: 'json'
            }).then(data => {
                data1 = [];
                var setData=this.setData;
                data.data.forEach(function (v, k) {
                    data1.push({
                        key: k + 1,
                        uid: v.uid,
                        username: v.username,
                        phone: v.phone,
                        email: v.email,
                        recent_login_time: v.recent_login_time == 0 ? "-" : getDate(v.recent_login_time),
                        login_times: v.login_times,
                        register_time: getDate(v.register_time),
                        type: v.type == 0 ? '超级管理员' : '普通管理员',
                        do: {
                            remove: '删除',
                            uid: v.uid,
                            type: v.type,
                            handleLi:setData
                        }
                    });
                });
                this.setState({
                    data: data1,
                    loading: false
                });
            });
        },1000);
    },

    render(){
        const pagination = {
            total: this.state.data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                //console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                //console.log('Current: ', current);
            }
        };
        return(
            <div>
                <QueueAnim className="demo-content"  type={['right', 'left']}
                           ease={['easeOutQuart', 'easeInOutQuart']}>
                    <div key="a">
                      <Table columns={columns1} dataSource={data1} pagination={pagination}
                             loading={this.state.loading} />
                    </div>
                </QueueAnim>
            </div>
        )
    }
});
/*
*
*
* 审核中
* */

var data2 = [];
function handleStatue(data){
    data2=data;
}
const columns2 = [{
    title: '编号',
    dataIndex: 'key',
    sorter: (a, b) =>{
        return a.key-b.key
    }
},{
    title: 'ID',
    dataIndex: 'uid',
    sorter: (a, b) =>{
        return a.uid-b.uid
    }
},{
    title: '用户名',
    dataIndex: 'username',
}, {
    title: '联系方式',
    dataIndex: 'phone',
},{
    title:'邮箱',
    dataIndex:'email'
},{
    title:"类型",
    dataIndex:"type",
    filters: [{
        text: '超级',
        value: '超级管理员'
    }, {
        text: '普通',
        value: '普通管理员'
    }],
    onFilter: (value, record) => {
        console.log(value,record);
        return record.type.indexOf(value) === 0
    }
},{
    title:'注册时间',
    dataIndex:'register_time',
    filters: currentCreateTime,
    onFilter: (value, record) => {
        return record.register_time.indexOf(value) === 0
    },
    sorter: (a, b) =>{
        return global_obj.getUnixTime(a.register_time)-global_obj.getUnixTime(b.register_time)
    }
},{
    title:'操作',
    dataIndex:'do',
    render(text) {
        return (
            <div>
                <BtnPass cid={text.uid} ctype={text.type} data={data2} handleInreview={text.handleLi}>{text.pass}</BtnPass>
                <BtnRemove cid={text.uid} ctype={text.type} data={data2} handleRemove={text.handleLi}>{text.remove}</BtnRemove>
            </div>
        )

    },
}];
var TableTwo=React.createClass({
    mixins: [SetIntervalMixin],
    getInitialState() {
        return {
            data: [],
            loading: true
        };
    },
    fetch() {
        var type=window.location.search;
        var ty=type===""?"1":type.split("=")[1];
        var setData=this.setData;
        setTimeout(()=>{
            reqwest({
                url: 'user_in_review_list',
                method: 'post',
                data:{
                    type:ty
                },
                type: 'json'
            }).then(data => {
                data2 = [];
                data.data.forEach(function(v,k){
                    data2.push({
                        key: k+1,
                        uid: v.uid,
                        username: v.username,
                        phone:v.phone,
                        email: v.email,
                        register_time: getDate(v.register_time),
                        type:v.type==0?'超级管理员':'普通管理员',
                        do: {
                            pass:'通过',
                            remove: '删除',
                            uid: v.uid,
                            type:v.type,
                            handleLi:setData
                        }
                    });
                });
                this.setState({
                    data:data2,
                    loading: false
                })
            });
        },1000);
    },
    render(){
        const pagination = {
            total: this.state.data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                //console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                //console.log('Current: ', current);
            }
        };
        return(
            <div>
                <QueueAnim className="demo-content"  type={['right', 'left']}
                           ease={['easeOutQuart', 'easeInOutQuart']}>
                    <div key="a">
                        <Table columns={columns2} dataSource={this.state.data} pagination={pagination} loading={this.state.loading}/>
                    </div>
                </QueueAnim>
            </div>
        )
    }
});
var data3=[];
const columns3 = [{
    title: '编号',
    dataIndex: 'key',
    sorter: (a, b) =>{
        return a.key-b.key
    }
},{
    title: 'ID',
    dataIndex: 'uid',
    sorter: (a, b) =>{
        return a.uid-b.uid
    }
},{
    title: '用户名',
    dataIndex: 'username',
}, {
    title: '联系方式',
    dataIndex: 'phone',
},{
    title:"类型",
    dataIndex:"type",
    filters: [{
        text: '超级',
        value: '超级管理员'
    }, {
        text: '普通',
        value: '普通管理员'
    }],
    onFilter: (value, record) => {
        return record.type.indexOf(value) === 0
    }
},{
    title:'操作',
    dataIndex:'do',
    render(text) {
        return <BtnRecover cid={text.uid} ctype={text.type} data={data3} handleRecover={text.handleLi}>{text.recover}</BtnRecover>
    }
}];
var TableThree=React.createClass({
    mixins: [SetIntervalMixin],
    getInitialState() {
        return {
            data: [],
            loading: true
        };
    },
    fetch() {
        var type=window.location.search;
        var ty=type===""?"1":type.split("=")[1];
        var setData=this.setData;
        setTimeout(()=>{
            reqwest({
                url: 'user_removed_list',
                method: 'post',
                data:{
                    type:ty
                },
                type: 'json'
            }).then(data => {
                data3 = [];
                data.data.forEach(function(v,k){
                    data3.push({
                        key: k+1,
                        uid: v.uid,
                        username: v.username,
                        phone:v.phone,
                        type:v.type==0?'超级管理员':'普通管理员',
                        do: {
                            recover: '恢复',
                            uid: v.uid,
                            type:v.type,
                            handleLi:setData
                        }
                    });
                });
                this.setState({
                    data:data3,
                    loading: false
                })
            });
        },1000);
    },
    render(){
        const pagination = {
            total: this.state.data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                //console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                //console.log('Current: ', current);
            }
        };
        return(
            <div>
                <QueueAnim className="demo-content"  type={['right', 'left']}
                           ease={['easeOutQuart', 'easeInOutQuart']}>
                    <div key="a">
                        <Table columns={columns3} dataSource={data3} pagination={pagination} loading={this.state.loading}/>
                    </div>
                </QueueAnim>
            </div>
        )
    }
});
var Tabs=React.createClass({
    showTabOne(){
        this.props.actions.toTabOne()
    },
    showTabTwo(){
        this.props.actions.toTabTwo()
    },
    showTabThree(){
        this.props.actions.toTabThree()
    },
    render(){
        var {actions,current_tab}=this.props,c1,c2,c3;
        switch (current_tab){
            case 1:
                c1='active';
                break;
            case 2:
                c2='active'
                break;
            case 3:
                c3='active'
                break;
        }
        return (
            <ul className="tabs clearfix">
                <li className={c1} onClick={this.showTabOne}>正常</li>
                <li className={c2} onClick={this.showTabTwo}>未审核</li>
                <li className={c3} onClick={this.showTabThree}>删除</li>
            </ul>
        )
    }
})
var PortletTitle=React.createClass({
    render(){
        return (
            <header className="portlet-title">
                <div className="search-input">
                    <input type="text"/>
                        <span className="search-icon">
                            <Icon type="search" />
                        </span>
                </div>
            </header>
        )
    }
});
var AllTable=React.createClass({
    render(){
        var {actions,current_tab}=this.props,tab;
        switch (current_tab){
            case 1:
                tab= <TableOne/>;
                break;
            case 2:
                tab= <TableTwo/>;
                break;
            case 3:
                tab= <TableThree/>;
                break;
        }
        return(
            <div>
                <PortletTitle/>
                <div className="table-data">
                    <Tabs actions actions={actions} current_tab={current_tab}/>
                    {tab}
                </div>
            </div>
        )
    }
});
export default AllTable;

//ReactDOM.render(<AllTable/>
//    , document.getElementById('table-data'));







