import React from "react";
import "./nodeProperty.scss";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function NodeProperty() {
  function callback(key: string) {
    console.log(key);
  }
  return <div className="node-property">
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="节点" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="文本" key="2">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  </div>;
}

export default NodeProperty;
