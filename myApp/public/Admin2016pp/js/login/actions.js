/**
 * Created by bll on 16/4/15.
 */
export const TO_REGISTER="toRegister";
export const TO_FORGET="toForget";
export const GET_PHONE="getPhone";
export const SET_SEND="setSendBtn";
export function toRegister(disabled,time){
    return {
        type:TO_REGISTER,
        disabled:disabled,
        time:time
    }
}
export function toForget(disabled,time){
    return {
        type:TO_FORGET,
        disabled:disabled,
        time:time
    }
}
export function getPhone(phone){
    return {
        type:GET_PHONE,
        phone:phone
    }
}
export function setSendBtn(disabled,time){
    return {
        type:SET_SEND,
        disabled:disabled,
        time:time
    }
}
