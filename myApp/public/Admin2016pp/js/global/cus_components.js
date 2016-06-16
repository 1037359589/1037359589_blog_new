/**
 * Created by bll on 16/6/1.
 */
import React,{findDOMNode,Component,PropTypes} from "react";
import reqwest from 'reqwest';
var adminUrl="/admin2016pp/";
var commonMixin = {
    //删除当前行
    removeTr(){
        var _self=this;
        this.state.user.data.forEach(function(v,k){
            if(v.uid==_self.state.user.uid){
                _self.state.user.data.splice(k,1);
            }
        });
        this.state.user.dataHandle(this.state.user.data);
    },
};
export var BtnPass=React.createClass({
    mixins:[commonMixin],
    getInitialState(){
        return {
            user:{
                uid:this.props.cid,
                type:this.props.ctype,
                dataHandle:this.props.handleInreview,
                data:this.props.data
            }
        }
    },
    handleClick(){
        var type=window.location.search,pathname=window.location.pathname;
        pathname=pathname.split("/").pop();
        switch(pathname){
            case 'users':
                this.handlePassUsers();
                break;
        }
    },
    //处理通过用户数据
    handlePassUsers(){
        setTimeout(()=> {
            reqwest({
                url: 'user_pass',
                method: 'post',
                data: {
                    uid: this.state.user.uid
                },
                type: 'json'
            }).then(data => {
                if(data.data.n >0){
                    this.removeTr();
                }
            });
        },200);
    },
    render(){
        return (
            <button onClick={this.handleClick} className="btn btn-pass">
                {this.props.children}
            </button>
        )
    }
});
export var BtnRemove=React.createClass({
    mixins:[commonMixin],
    getInitialState(){
        return {
            user:{
                uid:this.props.cid,
                type:this.props.ctype,
                dataHandle:this.props.handleRemove,
                data:this.props.data
            }
        }
    },
    handleClick(){
        console.log(this.state.cid,this.state.type);
        var type=window.location.search,pathname=window.location.pathname;
        pathname=pathname.split("/").pop();
        switch(pathname){
            case 'users':
                this.handleRemoveUsers();
                break;
        }
    },
    //处理删除用户数据
    handleRemoveUsers(){
        setTimeout(()=> {
            reqwest({
                url: 'user_remove',
                method: 'post',
                data: {
                    uid: this.state.user.uid
                },
                type: 'json'
            }).then(data => {
                console.log(data);
                if(data.data.n >0){
                    this.removeTr();
                }
            });
        },200);
    },
    render(){
        return (
            <button onClick={this.handleClick} className="btn btn-remove">
                {this.props.children}
            </button>
        )
    }
});
export var BtnRecover=React.createClass({
    mixins:[commonMixin],
    getInitialState(){
        return {
            user:{
                uid:this.props.cid,
                type:this.props.ctype,
                dataHandle:this.props.handleRecover,
                data:this.props.data
            }
        }
    },
    //处理回复用户数据
    handleRecoverUsers(){
        setTimeout(()=> {
            reqwest({
                url: 'user_pass',
                method: 'post',
                data: {
                    uid: this.state.user.uid
                },
                type: 'json'
            }).then(data => {
                console.log(data);
                if(data.data.n >0){
                    this.removeTr();
                }
            });
        },200);
    },
    handleClick(){
        console.log(this.state.cid,this.state.type);
        var type=window.location.search,pathname=window.location.pathname;
        pathname=pathname.split("/").pop();
        switch(pathname){
            case 'users':
                this.handleRecoverUsers();
                break;
        }
    },
    render(){
        return (
            <button onClick={this.handleClick} className="btn btn-recover">
                {this.props.children}
            </button>
        )
    }
});
export var BtnEdit=React.createClass({
    getInitialState(){
        return {
            cid:this.props.cid,
            type:this.props.ctype
        }
    },
    handleClick(){
        console.log(this.state.cid,this.state.type)
    },
    render(){
        return (
            <button onClick={this.handleClick} className="btn btn-edit">
                {this.props.children}
            </button>
        )
    }
});