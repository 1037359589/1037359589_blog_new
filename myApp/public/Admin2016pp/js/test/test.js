var css=require("../../css/style.css");
//var React=require("react");
//var ReactDOM=require("react-dom");
//var $=require('jquery');
var App=React.createClass({
    render:function(){
        return (
            <div>
                我的AppApp么么么大啊实打实的
            </div>
        )
    }
});
var Container=React.createClass({
    render:function(){
        return (
            <div>
                <App/>
            </div>
        )
    }
});
ReactDOM.render(
    <Container/>,
    document.getElementById("main")
);
//$("#main").text("你好啊 !!!");
console.log(1);
console.log(2323423);
