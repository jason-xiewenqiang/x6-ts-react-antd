import React from "react";
import "./MainPage.scss";
import { Row, Col } from "antd";
import 'echarts-gl';
import * as Echarts from 'echarts';
import options from './data/d3-data';

class MainPage extends React.Component {
  box3d: React.RefObject<any>;
  box3dTwo: React.RefObject<any>;
  constructor(props: any) {
    super(props);
    this.box3d = React.createRef();
    this.box3dTwo = React.createRef();
    this.build3DChart.bind(this);
  }

  build3DChart() {
    Echarts.init(this.box3d.current).setOption(options, true);
    Echarts.init(this.box3dTwo.current).setOption(options, true);
  }

  componentDidMount() {
    this.build3DChart();
  }

  render() {
    return (
      <div className="main-page">
        <Row gutter={24}>
          <Col className="gutter-row" span={6}>
            <Row>
              <Col span={24}>col</Col>
            </Row>
            <Row>
              <Col span={24}>col</Col>
            </Row>
            <Row>
              <Col span={24}>col</Col>
            </Row>
          </Col>
          <Col className="gutter-row center" span={12}>
            <Row>
              <Col span={24} ref={this.box3d} className="d3-box"></Col>
            </Row>
            <Row>
              <Col span={24} ref={this.box3dTwo}></Col>
            </Row>
          </Col>
          <Col className="gutter-row" span={6}>
            <Row>
              <Col span={24}>col</Col>
            </Row>
            <Row>
              <Col span={24}>col</Col>
            </Row>
            <Row>
              <Col span={24}>col</Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainPage;
