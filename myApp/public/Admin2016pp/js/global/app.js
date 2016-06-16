/**
 * Created by bll on 16/5/31.
 */
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {render} from 'react-dom';
import Slider from "./Components";
import * as action from "./actions";
var App=React.createClass({
    render(){
        const {close_slider,actions}=this.props;
        return (
            <div>
                <Slider actions={actions} close={close_slider}/>
            </div>
        );
    }
});
function handleToggleSlider(state){
    return {
        close_slider:state.close_slider
    }
}
function mapActions(dispatch){
    return {
        actions:bindActionCreators(action,dispatch)
    }
}
export default connect(handleToggleSlider,mapActions)(App);
