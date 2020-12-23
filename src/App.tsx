import React from "react";
import { Layout, Menu } from 'antd';
import Flow from './pages/flow';
import Form from './pages/form';
import Workbench from './pages/workbench';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.scss";
function App() {
  const { Header, Content } = Layout;
  return (
    <div className="App">
        <Layout className="layout">
        <Router>
          <Header>
            <div className="logo">Xbrother</div>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
              <Menu.Item key="1"><Link to="/flow">流程编辑器</Link></Menu.Item>
              <Menu.Item key="2"><Link to="/form">表单编辑器</Link></Menu.Item>
              <Menu.Item key="3"><Link to="/workbench">个人工作台</Link></Menu.Item>
            </Menu>
          </Header>
          <Content style={{ height: '100%' }}>
             <Route path="/flow" component={Flow}></Route>
             <Route path="/form" component={Form}></Route>
             <Route path="/workbench" component={Workbench}></Route>
          </Content>
            </Router>
        </Layout>
    </div>
  );
}

export default App;
