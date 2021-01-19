import React, { useEffect } from "react";
import "./centerBox.scss";
import { Graph } from '@antv/x6';

function CenterBox() {
  let container: any;
  const data = {
    // 节点
    nodes: [
      {
        id: 'node1', // String，可选，节点的唯一标识
        x: 40,       // Number，必选，节点位置的 x 值
        y: 40,       // Number，必选，节点位置的 y 值
        width: 80,   // Number，可选，节点大小的 width 值
        height: 40,  // Number，可选，节点大小的 height 值
        label: 'hello', // String，节点标签
      },
      {
        id: 'node2', // String，节点的唯一标识
        x: 160,      // Number，必选，节点位置的 x 值
        y: 180,      // Number，必选，节点位置的 y 值
        width: 80,   // Number，可选，节点大小的 width 值
        height: 40,  // Number，可选，节点大小的 height 值
        label: 'world', // String，节点标签
      },
    ],
    // 边
    edges: [
      {
        source: 'node1', // String，必须，起始节点 id
        target: 'node2', // String，必须，目标节点 id
      },
    ],
  };
  useEffect(() => {
    const rectBox = document.querySelector('.center-box')?.getBoundingClientRect();
    container = document.querySelector('#view-root-box');
    const graph = new Graph({
      container,
      width: rectBox?.width,
      height: rectBox?.height,
      grid: {
        size: 15,
        visible: true,
        type: 'doubleMesh',
        args: [
          {
            color: '#cccccc',
            thickness: 1,
          },
          {
            color: 'rgb(229,229,229)',
            thickness: 1,
            factor: 4,
          },
        ],
      },
      snapline: true,
      highlighting: {
        magnetAvailable: {
          name: 'stroke',
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: 'rgba(223, 234, 255)',
            },
          },
        },
      },
    });
    graph.fromJSON(data)
    console.log(Graph)
  }, [])  
  return <div className="center-box">
    <div className="tool-bar"></div>
    <div id="view-root-box"></div>
  </div>;
}
export default CenterBox;
