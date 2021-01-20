import React from "react";
import "./MainPage.scss";
import { Row, Col } from "antd";
import "echarts-gl";
import * as Echarts from "echarts";
import options from "./data/d3-data";
import pieOptions from "./data/pie-data";
import dynamicOptions from "./data/dynamic-data";
import sampleOption from './data/sample-data';
import renderChart from "./data/line-spure";
import renderRain from "./data/rain-data";
import { Scene } from "@antv/l7";
import { DrillDownLayer } from "@antv/l7-district";
import { Mapbox } from "@antv/l7-maps";

class MainPage extends React.Component {
  box3d: React.RefObject<any>;
  box3dTwo: React.RefObject<any>;
  boxRain: React.RefObject<any>;
  loadingMap: boolean;
  constructor(props: any) {
    super(props);
    this.box3d = React.createRef();
    this.boxRain = React.createRef();
    this.box3dTwo = React.createRef();
    this.loadingMap = true;
    this.build3DChart.bind(this);
    this.buildMap.bind(this);
  }

  build3DChart() {
    Echarts.init(this.box3d.current).setOption(options, true);
  }

  buildPie() {
    const dom: any = document.getElementById("container");
    const myChart = Echarts.init(dom);
    setInterval(function () {
      pieOptions.series[0].data[0].value =
        +(Math.random() * 100).toFixed(2) - 0;
      myChart.setOption(pieOptions, true);
    }, 2000);
    myChart.setOption(pieOptions, true);
  }

  buildDynamicLineChart() {
    var dom: any = document.getElementById("dynamic");
    var myChart = Echarts.init(dom);
    var app = { count: 0 };
    app.count = 11;
    setInterval(function () {
      var axisData: string = new Date().toLocaleTimeString().replace(/^\D*/, "");

      var data0 = dynamicOptions.series[0].data;
      var data1 = dynamicOptions.series[1].data;
      data0.shift();
      data0.push(Math.round(Math.random() * 1000));
      data1.shift();
      data1.push(+(Math.random() * 10 + 5).toFixed(1) - 0);

      dynamicOptions.xAxis[0].data.shift();
      (dynamicOptions.xAxis[0].data as Array<any>).push(axisData);
      dynamicOptions.xAxis[1].data.shift();
      (dynamicOptions.xAxis[1].data as Array<any>).push(app.count++);
      myChart.setOption((dynamicOptions as any));
    }, 2100);
    if (dynamicOptions && typeof dynamicOptions === "object") {
      myChart.setOption((dynamicOptions as any), true);
    }
  }

  buildSample() {
    var dom:any = document.getElementById("sample");
    var myChart = Echarts.init(dom);
    myChart.setOption((sampleOption as any), true);
  }

  buildMap(id: string) {
    const colors = ["#B8E1FF", "#7DAAFF", "#3D76DD", "#0047A5", "#001D70"];
    const scene = new Scene({
      id,
      map: new Mapbox({
        center: [116.2825, 39.9],
        pitch: 0,
        style: "blank",
        zoom: 3,
        minZoom: 3,
        maxZoom: 10,
      }),
    });
    scene.on("loaded", () => {
      new DrillDownLayer(scene, {
        data: [],
        viewStart: "Country",
        viewEnd: "City",
        fill: {
          color: {
            field: "NAME_CHN",
            values: colors,
          },
        },
        popup: {
          enable: true,
          Html: (props: any) => {
            return `<span style="color: #000;">${props.NAME_CHN}</span>`;
          },
        },
      });
    });
  }

  componentDidMount() {
    this.build3DChart();
    this.buildMap("map");
    this.buildPie();
    this.buildSample();
    this.buildDynamicLineChart();
    renderChart(this.box3dTwo.current);
    renderRain(this.boxRain.current);
  }

  render() {
    return (
      <div className="main-page">
        <Row gutter={24}>
          <Col className="gutter-row left" span={6}>
            <Row>
              <Col span={24} ref={this.box3d}></Col>
            </Row>
            <Row>
              <Col span={24} ref={this.boxRain}></Col>
            </Row>
            <Row>
              <Col span={24} ref={this.box3dTwo}></Col>
            </Row>
          </Col>
          <Col className="gutter-row center" span={12}>
            <Row className="title">
              <Col span={24}>Fine 数据中心平台</Col>
            </Row>
            {/* <Row>
              <Col span={24} ref={this.box3d} className="d3-box"></Col>
            </Row> */}
            <Row>
              <Col span={24} className="textCenter">
                <div id="map"></div>
              </Col>
            </Row>
          </Col>
          <Col className="gutter-row right" span={6}>
            <Row>
              <Col span={24} id="container">
              </Col>
            </Row>
            <Row>
              <Col span={24} id="dynamic">
              </Col>
            </Row>
            <Row>
              <Col span={24} id="sample"></Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default MainPage;
