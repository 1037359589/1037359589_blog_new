/**
 * Created by bll on 16/4/13.
 */
import { Button, Form, Input, Row, Col,Checkbox,QueueAnim,Select,Menu,RadioGroup,Radio,Cascader } from 'antd';
import React,{findDOMNode,Component,PropTypes} from "react";
import reqwest from 'reqwest';
const createForm = Form.create;
const FormItem = Form.Item;
const InputGroup = Input.Group;
function noop() {
    return false;
}
var t;
//var LoginForm = React.createClass({
class LoginForm extends Component{
    constructor(props){
        super(props);
        this.onHidden=this.onHidden.bind(this);
        this.isShowForget=this.isShowForget.bind(this);
    }

    getValidateStatus(field) {
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;
        if (isFieldValidating(field)) {
            return 'validating';
        } else if (!!getFieldError(field)) {
            return 'error';
        } else if (getFieldValue(field)) {
            return 'success';
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                //console.log('Errors in form!!!');
                return;
            }
            setTimeout(()=>{
                this.fetch(values);
            },300);

        });
    }
    fetch(params){
        reqwest({
            url: 'admin_login',
            method: 'post',
            data:params,
            type: 'json'
        }).then(data => {
            if(data.status=="1"&&data.data.length>0){
                setTimeout(()=>{
                    window.location.href="http://localhost:3000/admin2016pp/users";
                },1000);
            }else{
                alert('账户名不存在/密码错误,或者账户正在审核中!!');
            }
        });
    }
    onHidden(){
        this.props.actions.toRegister();
    }

    isShowForget(){
        this.props.actions.toForget();
    }
    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('username', {
            rules: [
                { required: true, min: 5, message: '请填写用户名!!' }
            ]
        });
        const passProps = getFieldProps('password', {
            rules: [
                { required: true,  min: 6,max:18,whitespace: true, message: '密码长度为6-18位!!'}
            ]
        });
        const formItemLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 }
        };
        return (
            <div>
                <div className="logo-p">
                    <header>管理员登陆</header>
                </div>
                <p>曹操来了!!</p>
                <QueueAnim component={Form} horizontal  delay={300}
                          type="bottom" leaveReverse form={this.props.form}
                >
                    <div key="a">
                        <Row>
                            <Col span="24">
                                <FormItem  help={isFieldValidating('username') ? '校验中...' : (getFieldError('username') || []).join(', ')}
                                    {...formItemLayout} hasFeedback>
                                    <Input  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                           autoComplete="off"  placeholder="请输入管理员用户名" {...nameProps}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div key="b">
                        <Row>
                            <Col span="24">
                                <FormItem help={isFieldValidating('password') ? '校验中...' : (getFieldError('password') || []).join(', ')}
                                    {...formItemLayout} hasFeedback>
                                    <Input  type="password" onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                        {...passProps}   autoComplete="off"  placeholder="请输入密码"
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div key="c">
                        <Row>
                            <Col span="24">
                                <Col span="24">
                                    <Button type="primary"  onClick={this.handleSubmit.bind(this)}>登陆</Button>
                                </Col>
                            </Col>
                        </Row>
                    </div>
                    <div key="d">
                        <Row>
                            <Col span="12">
                                <label>
                                    <Checkbox defaultChecked={false}  />
                                    记住我
                                </label>
                            </Col>
                            <Col span="12">
                                <a href="javascript:;" className="link-one" onClick={this.isShowForget} >忘记密码?</a>
                            </Col>
                        </Row>
                    </div>
                    <div key="e">
                        <Row>
                            <Col span="24">
                                <Col span="24" >
                                    <Button type="ghost" className="sub-cus-2" onClick={this.onHidden}>创建账户</Button>
                                </Col>
                            </Col>
                        </Row>
                    </div>
                </QueueAnim>
            </div>
        );
    }
}
LoginForm = createForm()(LoginForm);

class RegisterFrom extends Component{
    constructor(props){
        super(props);
        this.onHidden=this.onHidden.bind(this);
        this.sendCode=this.sendCode.bind(this);
        this.getPhone=this.getPhone.bind(this);
    }
    onHidden(){
        this.props.actions.toRegister();
        clearInterval(t);
    }
    getValidateStatus(field) {
        const { isFieldValidating, getFieldError, getFieldValue } = this.props.form;
        if (isFieldValidating(field)) {
            return 'validating';
        } else if (!!getFieldError(field)) {
            return 'error';
        } else if (getFieldValue(field)) {
            return 'success';
        }
    }

    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                //console.log('Errors in form!!!');
                return;
            }
            this.fetch(values);
        });
    }
    fetch(params){
        reqwest({
            url: 'http://localhost:3000/admin2016pp/account_add_api',
            method: 'post',
            data:params,
            type: 'json'
        }).then(data => {
            if(data.status=="1"){
                window.location.href="http://localhost:3000/admin2016pp/users";
            }else{
                alert('账户名已存在或者网络请求失败!!');
            }
        });
    }
    userExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            if(value.length>=5) {
                setTimeout(() => {
                    reqwest({
                        url: 'http://localhost:3000/admin2016pp/isset_admin',
                        method: 'post',
                        data: {username:value},
                        type: 'json'
                    }).then(data => {
                        if(data.status=="1"){
                             if(data.data.length>0){
                                 callback([new Error('抱歉，该用户名已被占用。')]);
                             }else{
                                 callback();
                             }
                        }
                    });
                },300);
            }
        }
    }
    phoneExists(rule, value, callback){
        if (!value) {
            callback();
        } else {
            if(value.length==11){
                setTimeout(() => {
                    reqwest({
                        url: 'http://localhost:3000/admin2016pp/isset_phone',
                        method: 'post',
                        data:{
                            phone:value
                        },
                        type: 'json'
                    }).then(data => {
                        if(data.status=="1"){
                            if(data.data.length>0){
                                callback([new Error('抱歉，该手机号码已存在。')]);
                            }else{
                                callback();
                            }
                        }
                    });
                }, 100);
            }
        }
    }

    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePasswd']);
        }
        callback();
    }

    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('passwd')) {
            callback('两次输入密码不一致！');
        } else {
            callback();
        }
    }

    componentDidMount(){
        var input=ReactDOM.findDOMNode(this.refs.inputCus);
        //console.log(input);
    }

    validateCode(rule,value,callback){
        callback();
    }
    sendCode(){
        if(this.props.phone==undefined||this.props.phone.length!=11)return;
        var time=60;
        var sp=this.props;
        t=setInterval(function(){
            time--;
            var text='重新发送('+time+'s)';
            if(time<=0){
                sp.actions.setSendBtn('','发送验证码');
                clearInterval(t);
                return;
            }
            sp.actions.setSendBtn('true',text);
        },1000);
        var params={
            phone:this.props.phone
        };
        //reqwest({
        //    url: 'send_code_api',
        //    method: 'post',
        //    data:params,
        //    type: 'json'
        //}).then(data => {
        //    console.log(data,'phone');
        //    //if(data.status=="1"){
        //    //    window.location.href="http://localhost:3000/admin2016pp/users";
        //    //}else{
        //    //    alert('注册失败,请重新注册!!')
        //    //}
        //});
    }
    getPhone(e){
        this.props.actions.getPhone(e.target.value);
    }
    render(){
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [
                { required: true, min: 5, message: '用户名至少5个字符' },
                { validator: this.userExists }
            ],
            trigger: ['onBlur', 'onChange'],
        });
        const phoneProps = getFieldProps('phone', {
            validate: [ {
                rules: [
                    { type: 'string',required: true,message: '请输入正确的手机号码' ,pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/},
                    { validator: this.phoneExists }
                ],
                trigger: ['onBlur', 'onChange'],
            }]
        });
        const passwdProps = getFieldProps('passwd', {
            rules: [
                { required: true,  min: 6,max:18,whitespace: true, message: '密码长度为6-18位'},
                { validator: this.checkPass.bind(this)},
            ],
            trigger: ['onBlur', 'onChange']
        });
        const rePasswdProps = getFieldProps('rePasswd', {
            rules: [{
                required: true,
                whitespace: true,
                message: '两次密码不一致',
            }, {
                validator: this.checkPass2.bind(this)
            }],
            trigger: ['onBlur', 'onChange']
        });
        const codeProps = getFieldProps('code', {
            rules: [{
                required: true,
                message: '验证码不正确'
            }, {
                validator: this.validateCode.bind(this)
            }],
            trigger: ['onBlur', 'onChange'],
        });
        const formItemLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 },
        };
        //console.log(isFieldValidating('name'));
        var cn=this.props.sendBtn.disabled=="true"?"btn-send-code disabled":"btn-send-code";
     return (
         <div>
             <div className="logo-p">
                 <header>管理员注册</header>
             </div>
             <p>如果,你是屌丝!!</p>
             <QueueAnim component={Form} horizontal  delay={300}
                        className="ant-form ant-form-horizontal" type="bottom" leaveReverse  form={this.props.form}>
                 <div key="a">
                     <Row>
                         <Col span="24">
                             <FormItem  {...formItemLayout}
                                 hasFeedback
                                 help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}>
                                 <Input onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} ref="inputCuss"
                                         autoComplete="off" id="pass" placeholder="请输入管理员用户名"
                                     {...nameProps}
                                 />
                             </FormItem>
                         </Col>
                     </Row>
                 </div>
                 <div key="b">
                     <Row>
                         <Col span="24">
                             <FormItem {...formItemLayout}
                                 help={isFieldValidating('phone') ? '校验中...' : (getFieldError('phone') || []).join(', ')}
                                 hasFeedback>
                                 <Input type="text" {...phoneProps} ref="inputCus"
                                        autoComplete="off"  placeholder="请输入手机号码"  value={this.props.phone}
                                        onChange={this.getPhone}
                                 />
                             </FormItem>
                         </Col>
                     </Row>
                 </div>
                 <div key="c">
                     <Row>
                         <Col>
                             <FormItem
                                 {...formItemLayout}
                                 hasFeedback>
                                 <div className="ant-search-input-wrapper">
                                     <InputGroup >
                                         <Input type="text" placeholder="请填写正确的验证码" className="input-code" {...codeProps}/>
                                         <div className="ant-input-group-wrap ">
                                             <Button type="primary" className={cn} onClick={this.sendCode} ref="send_code"
                                                     disabled={this.props.sendBtn.disabled}
                                             >{this.props.sendBtn.text}</Button>
                                         </div>
                                     </InputGroup>
                                 </div>
                             </FormItem>
                         </Col>
                     </Row>
                 </div>
                 <div key="d">
                     <Row>
                         <Col span="24">
                             <FormItem {...formItemLayout} hasFeedback
                                 help={isFieldValidating('passwd') ? '校验中...' : (getFieldError('passwd') || []).join(', ')}>
                                 <Input  type="password"  autoComplete="off" ref="inputCus"  {...passwdProps}
                                         onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop} autoComplete="off"
                                         placeholder="请输入密码"
                                 />
                             </FormItem>
                         </Col>
                     </Row>
                 </div>
                 <div key="e">
                     <Row>
                         <Col span="24">
                             <FormItem {...formItemLayout} hasFeedback
                                 help={isFieldValidating('rePasswd') ? '校验中...' : (getFieldError('rePasswd') || []).join(', ')}>
                                 <Input  type="password"  autoComplete="off" ref="inputCus"  {...rePasswdProps}
                                         onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                                         autoComplete="off" placeholder="两次输入的密码保持一致"
                                 />
                             </FormItem>
                         </Col>
                     </Row>
                 </div>
                 <div key="f">
                     <Row>
                         <Col span="12">
                             <label>
                                 <Checkbox defaultChecked={false}  />
                                 我同意
                                 <a href="">LOL协议</a>
                             </label>
                         </Col>
                     </Row>
                 </div>
                 <div key="g">
                     <Row>
                         <Col span="7">
                             <Button type="ghost" className="sub-cus-2" onClick={this.onHidden}>返回登陆</Button>
                         </Col>
                         <Col span="7" offset="10">
                             <Button type="primary"  className="sub-cus" onClick={this.handleSubmit.bind(this)}>注册</Button>
                         </Col>
                     </Row>
                 </div>
             </QueueAnim>
         </div>
     )
    }
}
RegisterFrom = createForm()(RegisterFrom);

class ForgetPassword extends Component{
    constructor(props){
        super(props);
        this.onHidden=this.onHidden.bind(this);
        this.sendCode=this.sendCode.bind(this);
        this.getPhone=this.getPhone.bind(this);
    }
    onHidden(){
        this.props.actions.toForget();
        clearInterval(t);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                //console.log('Errors in form!!!');
                return;
            }
        });
    }
    validateCode(rule,value,callback){
        callback();
    }
    getPhone(e){
        this.props.actions.getPhone(e.target.value);
    }
    sendCode(){
        if(this.props.phone==undefined||this.props.phone.length!=11)return;
        var time=60;
        var sp=this.props;
        t=setInterval(function(){
            time--;
            var text='重新发送('+time+'s)';
            if(time<=0){
                sp.actions.setSendBtn('','发送验证码');
                clearInterval(t);
                return;
            }
            sp.actions.setSendBtn('true',text);
        },1000);
        var params={
            phone:this.props.phone
        };
        //reqwest({
        //    url: 'send_code_api',
        //    method: 'post',
        //    data:params,
        //    type: 'json'
        //}).then(data => {
        //    console.log(data,'phone');
        //    //if(data.status=="1"){
        //    //    window.location.href="http://localhost:3000/admin2016pp/users";
        //    //}else{
        //    //    alert('注册失败,请重新注册!!')
        //    //}
        //});
    }
    render(){
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 0 },
            wrapperCol: { span: 24 },
        };
        const phoneProps = getFieldProps('phone', {
            validate: [ {
                rules: [
                    { type: 'string',required: true,message: '请输入正确的手机号码' ,pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/},
                ],
                trigger: ['onBlur', 'onChange'],
            }]
        });
        const codeProps = getFieldProps('code', {
            rules: [{
                required: true,
                whitespace: true,
                message: '验证码不正确',
            }, {
                validator: this.validateCode
            }],
            trigger: ['onBlur', 'onChange']
        });
        var cn=this.props.sendBtn.disabled=="true"?"btn-send-code disabled":"btn-send-code";
        return (
            <div>
                <div className="logo-p">
                    <header>忘记密码??</header>
                </div>
                <p>什么记性!!</p>
                <QueueAnim component={Form} horizontal form={this.props.form}  delay={300}
                           className="ant-form ant-form-horizontal" type="bottom" leaveReverse>
                    <div key="b">
                        <Row>
                            <Col span="24">
                                <FormItem {...formItemLayout} hasFeedback>
                                    <Input type="text" {...phoneProps} ref="inputCus"
                                           autoComplete="off"  placeholder="请输入手机号码" value={this.props.phone}
                                           onChange={this.getPhone}
                                    />
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div key="c">
                        <Row>
                            <Col>
                                <FormItem
                                    {...formItemLayout}
                                    hasFeedback>
                                    <div className="ant-search-input-wrapper">
                                        <InputGroup >
                                            <Input type="text" placeholder="请填写正确的验证码" className="input-code" {...codeProps}/>
                                            <div className="ant-input-group-wrap ">
                                                <Button type="primary" className={cn} onClick={this.sendCode} ref="send_code"
                                                        disabled={this.props.sendBtn.disabled}
                                                >{this.props.sendBtn.text}</Button>
                                            </div>
                                        </InputGroup>
                                    </div>
                                </FormItem>
                            </Col>
                        </Row>
                    </div>
                    <div key="d">
                        <Row>
                            <Col span="7">
                                <Button type="ghost" className="sub-cus-2" onClick={this.onHidden}>返回登陆</Button>
                            </Col>
                            <Col span="7" offset="10">
                                <Button type="primary"  className="sub-cus" onClick={this.handleSubmit}>手机登陆</Button>
                            </Col>
                        </Row>
                    </div>
                </QueueAnim>
            </div>
        )
    }
};
ForgetPassword = createForm()(ForgetPassword);

var LoginAll=React.createClass({
    render(){
        var {actions,register,forget,phone,sendBtn}=this.props;
        var formOne=register?<RegisterFrom actions={actions} phone={phone} sendBtn={sendBtn}/>
            :<LoginForm actions={actions} />;
        var form=forget?<ForgetPassword actions={actions}  phone={phone} sendBtn={sendBtn}/>:formOne;
       return(
           <div>
               {form}
           </div>
       )
    }
});

export default LoginAll;



//ReactDOM.render(<App />, document.getElementById('app'));