import React from "react";
import "./index.scss";
import { Graph, Dom, Addon, Shape } from "@antv/x6";
import { nodes } from "./nodes";
import { Drawer, Button } from 'antd';

const { Dnd } = Addon;

class Flow extends React.Component {
  private graph: any;
  private container: HTMLDivElement | any;
  private dnd: any;
  state = { visible: false, placement: 'left' };

  componentDidMount() {
    const graph = new Graph({
      container: this.container,
      grid: {
        visible: true,
        size: 10,
        type: "dot",
      },
      connecting: {
        anchor: "center",
        connectionPoint: "anchor",
        allowBlank: false,
        highlight: true,
        snap: true,
        createEdge() {
          return new Shape.Edge({
            attrs: {
              line: {
                stroke: "red",
                strokeWidth: 1,
                targetMarker: {
                  name: "classic",
                  size: 8,
                },
              },
            },
            router: {
              name: "manhattan",
            },
          });
        },
        validateConnection({
          sourceView,
          targetView,
          sourceMagnet,
          targetMagnet,
        }) {
          if (sourceView === targetView) return false;
          if (!sourceMagnet) return false;
          if (!targetMagnet) return false;
          return true;
        },
      },
      highlighting: {
        magnetAvailable: {
          name: "stroke",
          args: {
            padding: 4,
            attrs: {
              strokeWidth: 4,
              stroke: "rgba(223,234,255,1)",
            },
          },
        },
      },
      history: {
        enabled: true,
      },
      keyboard: {
        enabled: true,
        global: true,
        format(key) {
          console.log(key);
          return key;
        },
      },
      clipboard: {
        enabled: true,
      },
      selecting: {
        enabled: true,
        showNodeSelectionBox: true,
        movable: true,
        rubberband: true,
        className: "x6-selection-box",
      },
      snapline: {
        enabled: true,
      },
      scroller: {
        enabled: true,
        pageVisible: false,
        pageBreak: false,
        pannable: true,
      },
      mousewheel: {
        enabled: true,
        modifiers: ["ctrl", "meta"],
      },
    });

    graph.centerContent();
    this.dnd = new Dnd({
      target: graph,
      scaled: false,
      animation: true,
      validateNode(droppingNode, options) {
        return droppingNode.shape === "html"
          ? new Promise<boolean>((resolve) => {
              const { draggingNode, draggingGraph } = options;
              const view = draggingGraph.findView(draggingNode)!;
              const contentElem = view.findOne("foreignObject > body > div");
              Dom.addClass(contentElem, "validating");
              setTimeout(() => {
                Dom.removeClass(contentElem, "validating");
                resolve(true);
              }, 1000);
            })
          : true;
      },
    });
    graph.on("node:selected", () => {
      const selected = graph.getSelectedCells();
      selected.forEach((sel) => {
        this.showDrawer();
        console.log(sel.data);
        console.log(sel.attrs);
      });
    });

    graph.bindKey("backspace", () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.removeCells(cells);
      }
    });

    this.graph = graph;

    graph.bindKey("ctrl+c", () => {
      const cells = graph.getSelectedCells();
      if (cells.length) {
        graph.copy(cells);
      }
      return false;
    });
    graph.bindKey("ctrl+v", () => {
      if (graph.isClipboardEmpty()) {
        const cells = graph.paste({ offset: 32 });
        graph.cleanSelection();
        graph.select(cells);
      }
      return false;
    });
    const changePortsVisible = (visible: boolean) => {
      const ports = this.container.querySelectorAll(
        ".x6-port-body"
      ) as NodeListOf<SVGAElement>;
      for (let i = 0, len = ports.length; i < len; i = i + 1) {
        ports[i].style.visibility = visible ? "visible" : "hidden";
      }
    };
    graph.on("node:mouseenter", () => {
      changePortsVisible(true);
    });
    graph.on("node:mouseleave", () => {
      changePortsVisible(false);
    });
    graph.on("node:selected", () => {
      changePortsVisible(false);
    });
  }

  startDrag = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.currentTarget;
    const type = target.getAttribute("data-type");
    let node;
    switch (type) {
      case "rect":
        node = this.graph.createNode({
          width: 120,
          height: 60,
          attrs: {
            label: {
              text: "Rect",
              fill: "#6a6c8a",
            },
            body: {
              stroke: "#31d0c6",
              strokeWidth: 1,
              fillOpacity: 0.1,
              fill: "#31d0c6",
            },
          },
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
            },
            items: [
              {
                id: "port1",
                group: "top",
              },
              {
                id: "port3",
                group: "bottom",
              },
              {
                id: "port2",
                group: "left",
              },
              {
                id: "port4",
                group: "right",
              },
            ],
          },
          data: {
            type: "用户任务节点",
            id: "abdcf",
          },
        });
        break;
      case "ellipse":
        node = this.graph.createNode({
          width: 140,
          height: 80,
          shape: "ellipse",
          label: "开始节点",
          attrs: {
            body: {
              fill: "#efdbff",
              stroke: "#9254de",
              fillOpacity: 0.1,
            },
          },
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
            },
            items: [
              {
                id: "port1",
                group: "top",
              },
              {
                id: "port3",
                group: "bottom",
              },
              {
                id: "port2",
                group: "left",
              },
              {
                id: "port4",
                group: "right",
              },
            ],
          },
        });
        break;
      case "polygon":
        node = this.graph.createNode({
          width: 100,
          height: 100,
          shape: "polygon",
          label: "条件分支",
          attrs: {
            body: {
              fill: "#efdbff",
              stroke: "#9254de",
              refPoints: "0,10 10,0 20,10 10,20",
              fillOpacity: 0.1,
            },
          },
          ports: {
            groups: {
              top: {
                position: "top",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
              bottom: {
                position: "bottom",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
              left: {
                position: "left",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
              right: {
                position: "right",
                attrs: {
                  circle: {
                    r: 6,
                    magnet: true,
                    stroke: "#31d0c6",
                    strokeWidth: 1,
                    fill: "#fff",
                    style: {
                      visibility: "hidden",
                    },
                  },
                },
              },
            },
            items: [
              {
                id: "port1",
                group: "top",
              },
              {
                id: "port3",
                group: "bottom",
              },
              {
                id: "port2",
                group: "left",
              },
              {
                id: "port4",
                group: "right",
              },
            ],
          },
        });
        break;
    }

    this.dnd.start(node, e.nativeEvent as any);
  };

  refContainer = (container: HTMLDivElement) => {
    this.container = container;
  };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onExport = () => {
    const json = this.graph.toJSON();
    const blobContent = new Blob(
      [JSON.stringify(json, null, 2)],
      {type : 'application/json'}
    );
    const blobUrl = window.URL.createObjectURL(blobContent)
    downloadFileByBlob(blobUrl, 'config.json');
    window.URL.revokeObjectURL(blobUrl);
    function downloadFileByBlob(blobUrl: string, filename: string) {
      const eleLink = document.createElement('a')
      eleLink.download = filename
      eleLink.style.display = 'none'
      eleLink.href = blobUrl
      // 触发点击
      document.body.appendChild(eleLink)
      eleLink.click()
      // 然后移除
      document.body.removeChild(eleLink)
    }
    
  }

  render() {
    const { placement, visible } = this.state;
    return (
      <div className="Flow">
        <div className="dnd-wrap">
          <Button type="primary" onClick={this.onExport}>导出画布JSON</Button>
          {nodes.map((node: any, index: number) => (
            <div
              data-type={node.shape}
              className={"dnd-" + node.shape}
              onMouseDown={this.startDrag}
              key={index}
            >
              <span>{node.attrs.label.text}</span>
            </div>
          ))}
        </div>
        <div className="app-content" ref={this.refContainer} />
        <Drawer
          title="Basic Drawer"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key={placement}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </div>
    );
  }
}
export default Flow;
