import React from "react";
import { Button, Form, Input, Checkbox, message } from "antd";
import { LockOutlined, UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import cat from "./assets/img/cat.jpg";
import "./Login.scss";
import { login } from './reducers/action';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect  } from 'react-router-dom';
import NProgress from 'nprogress';

function Login() {
  const isLogin = useSelector((state: any) => state.login.isLogin)
  const dispatch = useDispatch();
  const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
  };
  const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    const { username } = values;
    NProgress.start();
    setTimeout(() => {
      NProgress.done();
      if (username !== 'admin') {
        message.error('用户名或密码错误');
      } else {
        message.success('登陆成功');
        dispatch(login(true));
      }
    }, 1500)
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    dispatch(login(false));
  };
  return (
    <div className="login"> { isLogin && <Redirect to="/home" /> }
      <div className="img">
        <div className="title">Fine 数据中心平台</div>
        <img src={cat} alt="" />
      </div>
      <div className="login-form">
        <div className="form">
          <div className="welcome">
            <span>欢迎登陆</span>
          </div>
          <Form
            {...layout}
            layout="vertical"
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "请输入用户名" },
              ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="请输入用户名(admin)"/>
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "请输入密码" },
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="请输入密码(随意)"/>
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>记住密码</Checkbox>
            </Form.Item>

            <Form.Item {...{wrapperCol: { offset: 0, span: 24 }}}>
              <Button className="login-btn" type="primary" htmlType="submit">
                登陆
              </Button>
            </Form.Item>
          </Form>
        <div className="copy-right">Copyright @ 1999 - 2021 Fine. All Right Reserved.</div>
        </div>
      </div>
    </div>
  );
}

export default Login;
