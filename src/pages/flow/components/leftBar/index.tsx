import React from "react";
import "./leftBar.scss";
import userSvg from '../../../../assets/svg/user.svg';
import startSvg from '../../../../assets/svg/start.svg';
import countersignSvg from '../../../../assets/svg/countersign.svg';
import condition from '../../../../assets/svg/condition.svg';

function leftBar() {
  const nodes = [
    { name: '起始节点', key: 'start' },
    { name: '用户节点', key: 'approver' },
    { name: '条件节点', key: 'condition' },
    { name: '会签节点', key: 'countersign' },
  ]
  return <div className="left-bar">
    <div className="title">组件库</div>
    <div className="component">
      <div className="component-item">
        <div className="node start-node">开始</div>
      </div>
      <div className="component-item">
        <div className="node start-node">结束</div>
      </div>
      <div className="component-item">
        <div className="node user-node">用户任务</div>
      </div>
      <div className="component-item">
        <div className="node user-node">同步子流程</div>
      </div>
      <div className="component-item">
        <div className="node user-node">异步子流程</div>
      </div>
      <div className="component-item">
        <div className="node condition-node">
          <span>用户节点</span>
        </div>
      </div>
      <div className="component-item">
        <div className="node countersign-node">会签任务</div>
      </div>
      {/* <div className="component-item">
        <img src={userSvg} alt=""/>
      </div>
      <div className="component-item">
        <img src={startSvg} alt=""/>
      </div>
      <div className="component-item">
        <img src={countersignSvg} alt=""/>
      </div>
      <div className="component-item">
        <img src={condition} alt=""/>
      </div> */}
    </div>
  </div>;
}

export default leftBar;
