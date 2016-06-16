/**
 * Created by bll on 16/6/1.
 */
import  {render} from 'react-dom';
import {createStore,bindActionCreators,combineReducers,compose} from 'redux';
import {Provider} from "react-redux";
import {devTools} from 'remote-redux-devtools';
import changeTab from './reducer';
import App from "./app";
console.log(1);
let store=compose(window.devToolsExtension?window.devToolsExtension():f=>f)(createStore)(changeTab);
render(
    <Provider store={store}>
        <App/>
    </Provider>,document.getElementById('table-data')
);
