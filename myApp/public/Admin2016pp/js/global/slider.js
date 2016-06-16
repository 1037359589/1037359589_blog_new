/**
 * Created by bll on 16/5/31.
 */
import {render} from "react-dom";
import {createStore,bindActionCreators,combineReducers,compose} from "redux";
import {Provider} from "react-redux";
import devTools from 'remote-redux-devtools';
import toggleSlider from "./reducer";
import App from "./app";
let store=compose(window.devToolsExtension?window.devToolsExtension():f=>f)(createStore)(toggleSlider);
render(
    <Provider store={store}>
        <App />
    </Provider>,document.getElementById("slider")
);
