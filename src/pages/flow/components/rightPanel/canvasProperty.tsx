import React from "react";
import "./canvasProperty.scss";
import { Tabs } from 'antd';

const { TabPane } = Tabs;

function CanvasProperty() {
  function callback(key: string) {
    console.log(key);
  }
  return <div className="canvas-property">
     <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab="网格" key="1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane tab="背景" key="2">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  </div>;
}

export default CanvasProperty;
