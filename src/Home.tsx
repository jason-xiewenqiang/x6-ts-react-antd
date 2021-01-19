import React from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import { PoweroffOutlined, UserOutlined, BugOutlined } from '@ant-design/icons';
import Flow from "./pages/flow";
import Form from "./pages/form";
import Workbench from "./pages/workbench";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from './reducers/action';
import NProgress from 'nprogress';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./Home.scss";

function Home() {
  const { Header, Content } = Layout;
  const history = useHistory();
  const dispacth = useDispatch();
  const handleMenuClick = (e:any) => { 
    console.log(e)
    const {key} = e;
    if (key === '1') {
      NProgress.start()
      setTimeout(() => {
        NProgress.done()
        dispacth(login(false))
      }, 800)
    }
    if (key === '2') {
      history.push('/person');
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={ <PoweroffOutlined />}>
        退出登陆
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        个人主业
      </Menu.Item>
      <Menu.Item key="3" icon={<BugOutlined />}>
        关于
      </Menu.Item>
    </Menu>
  )
  return (
    <div className="Home">
      <Layout className="layout">
        <Router>
          <Header>
            <div className="logo">数据中心</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="0">
                <Link to="/home/workbench">首页</Link>
              </Menu.Item>
              <Menu.Item key="1">
                <Link to="/home/flow">拖拽编辑器</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/home/form">布局编辑器</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/home/workbench">个人工作台</Link>
              </Menu.Item>
            </Menu>
            <div className="logout">
              <Avatar size={32} icon={<UserOutlined />} />
              <Dropdown overlay={menu} placement="bottomLeft">
                <span className="user-name">admin</span>
              </Dropdown>
            </div>
          </Header>
          <Content style={{ height: "100%" }}>
            <Route
              exact
              path="/home"
              render={() => <Redirect to="/home/flow" />}
            ></Route>
            <Route path="/home/flow" component={Flow}></Route>
            <Route path="/home/form" component={Form}></Route>
            <Route path="/home/workbench" component={Workbench}></Route>
          </Content>
        </Router>
      </Layout>
    </div>
  );
}

export default Home;
