import React from "react";
import { Layout, Menu } from 'antd';
import "./App.scss";
function App() {
  const { Header, Content } = Layout;
  return (
    <div className="App">
        <Layout className="layout">
          <Header>
            <div className="logo">Xbrother</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1">流程编辑器</Menu.Item>
              <Menu.Item key="2">表单编辑器</Menu.Item>
              <Menu.Item key="3">个人工作台</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ height: '100%' }}>
            <div className="site-layout-content">Content</div>
          </Content>
        </Layout>
    </div>
  );
}

export default App;
