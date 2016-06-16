/**
 * Created by bll on 16/5/31.
 */
import {OPEN_SLIDER,CLOSE_SLIDER} from "./actions";
import { combineReducers } from 'redux';
const initState={
    close_slider:false
};
export default function toggleSlider(state=initState,action){
    switch(action.type){
        case OPEN_SLIDER:
            return {
                close_slider:false
            };
        case CLOSE_SLIDER:
            return {
                close_slider:true
            };
        default:
            return {
                close_slider:state.close_slider
            }
    }
}