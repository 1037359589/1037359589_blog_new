/**
 * Created by bll on 16/6/1.
 */
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {render} from 'react-dom';
import AllTable  from "./components";
import * as action from "./actions";
var App=React.createClass({
    render(){
        const {current_tab,actions}=this.props;
        return (
            <div>
                <AllTable actions={actions} current_tab={current_tab} />
            </div>
        )
    }
});
function handleCurrentTab(state){
    return {
        current_tab:state.current_tab
    }
}
function mapActions(dispatch){
    return {
        actions:bindActionCreators(action,dispatch)
    }
}
export default connect(handleCurrentTab,mapActions)(App);