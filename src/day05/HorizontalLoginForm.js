import React from 'react'
import { Form, Icon, Input, Button, Select } from 'antd'
import $ from 'jquery'

const { Option } = Select;

function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field])
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        // 开始时禁用提交按钮。
        this.props.form.validateFields()
    }
    update() {
        alert('123')
        this.forceUpdate();
    }
    handleSubmit = e => {
        e.preventDefault()
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // 调用后台代码完成保存
                let url = "http://203.195.246.58:8888/user/saveOrUpdate?id=&realname=" + values.realname + "&gender=" + values.gender + "&username=" + values.username + "&password=" + values.password + "&type=" + values.type + "&status=" + values.status;
                $.ajax({
                    type: "post",
                    url: url,
                    contentType: "application/json",
                    // dataType: 'json',
                    data: JSON.stringify(values),
                    success: function () {
                        alert('success');
                        //重新加载数据
                        alert('请手动刷新页面');
                    },
                    error: function () {
                        alert('失败');
                    },
                });
            }
        })
        
    };

    render() {
        const {
            getFieldDecorator,
            getFieldsError,
        } = this.props.form


        return (
            <Form layout='inline' onSubmit={this.handleSubmit}>
                <Form.Item>
                    {getFieldDecorator('realname', {
                        rules: [{ required: true, message: '请输入你的真实姓名' }]
                    })(
                        <Input
                            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='realname'
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('gender', {
                        initialValue: "男",
                    })(
                        <Select
                            onChange={this.handleSelectChange}
                        >
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入你的昵称' }]
                    })(
                        <Input
                            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                            placeholder='username'
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入你的密码' }]
                    })(
                        <Input
                            prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
                            type='password'
                            placeholder='Password'
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('type', {
                        initialValue: "老师"
                    })(
                        <Input
                            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                            disabled='true'
                            placeholder='type'
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('status', {
                        initialValue: "正常"
                    })(
                        <Input
                            prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
                            disabled='true'
                            placeholder='status'
                        />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={hasErrors(getFieldsError())}
                    >新增</Button>
                </Form.Item>
            </Form>
        )
    }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'horizontal_login' })(
    HorizontalLoginForm
)

export default WrappedHorizontalLoginForm