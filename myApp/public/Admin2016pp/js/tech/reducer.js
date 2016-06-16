/**
 * Created by bll on 16/6/1.
 */
import {TAB_ONE,TAB_THREE,TAB_TWO} from "./actions";
//import {combineReducers} from 'redux';
const initState={
    current_tab:1
};
export default function changeTab(state=initState,action){
    switch(action.type){
        case TAB_ONE:
            return {
                current_tab:1
            };
        case TAB_TWO:
            return {
                current_tab:2
            };
        case TAB_THREE:
            return {
                current_tab:3
            }
        default:
            return {
                current_tab:1
            }
    }
}