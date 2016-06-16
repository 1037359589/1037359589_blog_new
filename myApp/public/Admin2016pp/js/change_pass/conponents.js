/**
 * Created by bll on 16/6/6.
 */
import { Button, Form, Input , Upload, Icon, Modal,QueueAnim,Radio,Switch } from 'antd';
import {BtnPass,BtnRecover,BtnRemove,BtnEdit} from '../global/cus_components';
const InputGroup = Input.Group;
var PortletTitle=React.createClass({
    render(){
        return (
            <header className="portlet-title">
                <h3>用户资料完善/修改</h3>
            </header>
        )
    }
});
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
    return false;
}

let BasicDemo = React.createClass({
    getInitialState() {
        return {
            sex: '男',
        };
    },
    handleReset(e) {
        e.preventDefault();
        this.props.form.resetFields();
    },

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            console.log('Submit!!!');
            console.log(values);
        });
    },

    userExists(rule, value, callback) {
        if (!value) {
            callback();
        } else {
            setTimeout(() => {
                if (value === 'JasonWood') {
                    callback([new Error('抱歉，该用户名已被占用。')]);
                } else {
                    callback();
                }
            }, 800);
        }
    },

    checkPass(rule, value, callback) {
        const { validateFields } = this.props.form;
        if (value) {
            validateFields(['rePasswd'], { force: true });
        }
        callback();
    },

    checkPass2(rule, value, callback) {
        const { getFieldValue } = this.props.form;
        if (value && value !== getFieldValue('passwd')) {
            callback('两次输入密码不一致!');
        } else {
            callback();
        }
    },
    onChange() {
        this.setState({
            sex: this.state.sex=="男"?"女":"男"
        });
    },

    render() {
        const { getFieldProps, getFieldError, isFieldValidating } = this.props.form;
        const phoneProps=getFieldProps('phone', {
            validate: [ {
                rules: [
                    { type: 'string',required: true,message: '请输入正确的手机号码' ,pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/},
                ],
                trigger: ['onBlur', 'onChange'],
            }]
        });
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 8 },
        };

        return (
            <Form horizontal form={this.props.form}>
                <QueueAnim delay={500} style={{ height: 150 }}>
                    <div key="a">
                        <FormItem
                            {...formItemLayout}
                            label="手机号码"
                            hasFeedback>
                            <Input {...phoneProps} type="text" placeholder="请填写正确的手机号码" />
                        </FormItem>
                    </div>
                    <div key="b">
                        <FormItem
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 8 }}
                            label="验证码"
                            hasFeedback>
                            <div className="ant-search-input-wrapper">
                                <InputGroup >
                                    <Input type="text" placeholder="请填写正确的验证码" className="input-code"/>
                                    <div className="ant-input-group-wrap ">
                                        <Button type="primary" className="btn-send-code">发送验证码</Button>
                                    </div>
                                </InputGroup>
                            </div>
                        </FormItem>
                    </div>
                    <div key="c">
                        <FormItem wrapperCol={{ span: 12, offset: 4 }}>
                            <Button type="primary" onClick={this.handleSubmit}>修改密码</Button>
                            &nbsp;&nbsp;&nbsp;
                            <Button type="ghost" onClick={this.handleReset}>重置</Button>
                        </FormItem>
                    </div>
                </QueueAnim>
            </Form>
        );
    },
});
BasicDemo = createForm()(BasicDemo);

const ImageUploadList = React.createClass({
    getInitialState() {
        return {
            priviewVisible: false,
            priviewImage: '',
        };
    },
    handleCancel() {
        this.setState({
            priviewVisible: false,
        });
    },
    render() {
        const props = {
            action: '/upload.do',
            listType: 'picture-card',
            //defaultFileList: [{
            //    uid: -1,
            //    name: 'xxx.png',
            //    //status: 'done',
            //    //url: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
            //    //thumbUrl: 'https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png',
            //}],
            onPreview: (file) => {
                this.setState({
                    priviewImage: file.url,
                    priviewVisible: true,
                });
            },
        };
        return (
            <div className="clearfix">
                <Upload {...props}>
                    <Icon type="plus" />
                    <div className="ant-upload-text">上传照片</div>
                </Upload>
                <Modal visible={this.state.priviewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" src={this.state.priviewImage} />
                </Modal>
            </div>
        );
    },
});
var PersonCenter=React.createClass({
    render(){
        var {actions,current_tab}=this.props,tab;
        return(
            <div>
                <PortletTitle/>
                <div className="table-data">
                    <BasicDemo/>
                </div>
            </div>
        )
    }
});

ReactDOM.render(
    <PersonCenter/>,document.getElementById('table-data')
)
