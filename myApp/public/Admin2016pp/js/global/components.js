/**
 * Created by bll on 16/5/28.
 */
import { Menu, Icon,Dropdown } from 'antd';
import React,{findDOMNode,Component,PropTypes} from "react";
const SubMenu = Menu.SubMenu;

const Sider = React.createClass({
    getInitialState() {
        return {
            current: '1',
            openKeys: [],
        };
    },
    handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key,
            openKeys: e.keyPath.slice(1),
        });
    },
    onToggle(info) {
        console.log(info.keyPath);
        this.setState({
            openKeys: info.open ? info.keyPath : info.keyPath.slice(1),
        });
    },
    handleAlert(info){
        console.log(info);
    },
    componentDidMount(){
        var s=window.location.search.split("=");
        var type=s.pop();
        this.setState({
            current: type
        });
        if(type=="1"||type=="2"){
            this.setState({
                openKeys: ['sub1']
            });
        }else if(type=="3"||type=="4"||type=="5"){
            this.setState({
                openKeys: ['sub2']
            });
        }else{
            this.setState({
                openKeys: []
            });
        }
    },
    render() {
        return (
            <Menu onClick={this.handleClick}
                  style={{width:203}}
                  openKeys={this.state.openKeys}
                  defaultOpenKeys={this.setState.openKeys}
                  selectedKeys={[this.state.current]}
                  onOpen={this.onToggle}
                  onClose={this.onToggle}
                  mode="inline">
                <SubMenu key="sub1" title={<span><Icon type="user" /><span>用户</span></span>}>
                    <Menu.Item key="1"><a href="users?type=1">管理员</a></Menu.Item>
                    <Menu.Item key="2"><a href="users?type=2">会员</a></Menu.Item>
                </SubMenu>
                <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>全栈</span></span>}>
                    <Menu.Item key="3"><a href="tech?type=3">前端</a></Menu.Item>
                    <Menu.Item key="4"><a href="tech?type=4">后端</a></Menu.Item>
                    <Menu.Item key="5"><a href="tech?type=5">App</a></Menu.Item>
                </SubMenu>
                <SubMenu key="sub4" title={<span><Icon type="message" /><span>评论</span></span>}>
                    <Menu.Item key="6">前端</Menu.Item>
                </SubMenu>
            </Menu>
        );
    },
});
//ReactDOM.render(<Sider />, document.getElementById('app'));



const menu = (
    <Menu>
        <Menu.Item key="0">
            <a href="person_center">个人资料</a>
        </Menu.Item>
        <Menu.Item key="1">
            <a href="change_pass">修改密码</a>
        </Menu.Item>
        <Menu.Item key="2">
            <a href="login_out">退出</a>
        </Menu.Item>
    </Menu>
);

ReactDOM.render(
    <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" href="#">
            <img src="img/global/tx.jpeg" alt=""/>
        </a>
    </Dropdown>
    , document.getElementById('person'));
var ToggleSlider=React.createClass({
    //getInitialState() {
    //    return {
    //        current: '1',
    //        openKeys: [],
    //    };
    //},
    toggleSlider(){
        this.props.close?this.props.actions.openSlider():this.props.actions.closeSlider();
    },
    render(){
        var closeClass=this.props.close?"toggle-slider":'toggle-slider toggle-slider-close';
        return (
            <div className={closeClass} onClick={this.toggleSlider}>
                <span></span>
                <span></span>
                <span></span>
            </div>
        )
    }
});
var Slider=React.createClass({
    render(){
        var {actions,close}=this.props;
        var sliderClass=!close?"slider":"slider slide-hidden";
        var content=document.getElementById('content');
        if(close){
            content.setAttribute("class", "content content-active");
        }else{
            content.setAttribute("class", "content");
        }
       return(
           <div className={sliderClass}>
               <ToggleSlider actions={actions} close={close}/>
               <Sider close={close}/>
           </div>
           )
    }
});
export default Slider;
