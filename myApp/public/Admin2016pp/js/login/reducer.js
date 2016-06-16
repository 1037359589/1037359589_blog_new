/**
 * Created by bll on 16/4/15.
 */
import {TO_REGISTER,TO_FORGET,GET_PHONE,SET_SEND} from "./actions";
import { combineReducers } from 'redux';
const initState={
    register:false,
    forget:false,
    phone:"",
    sendBtn:{
        disabled:"",
        text:"发送验证码"
    }
};
export default function changeForm(state=initState,action){
    switch(action.type){
        case TO_REGISTER:
            return {
                register:!state.register,
                forget:state.forget,
                phone:"",
                sendBtn:{
                    disabled:"",
                    text:"发送验证码"
                }
            };
        case TO_FORGET:
            return {
                forget:!state.forget,
                register:state.register,
                phone:"",
                sendBtn:{
                    disabled:"",
                    text:"发送验证码"
                }
            };
        case GET_PHONE:
            return {
                forget:state.forget,
                register:state.register,
                phone:action.phone,
                sendBtn:state.sendBtn
            };
        case SET_SEND:
            return {
                forget:state.forget,
                register:state.register,
                phone:state.phone,
                sendBtn:{
                    disabled:action.disabled,
                    text:action.time
                }
            };
        default:
            return {
                register:state.register,
                forget:state.forget,
                phone:state.phone,
                sendBtn:state.sendBtn
            }
    }
}