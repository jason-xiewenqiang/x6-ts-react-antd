/* eslint-disable import/no-anonymous-default-export */
import { Chart, registerShape } from "@antv/g2";

function splitData(data: any) {
  const marker = data.length - Math.floor(data.length * 0.4);
  const data1 = [];
  const data2 = [];
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    if (i <= marker) {
      data1.push(d);
    } else {
      data2.push(d);
    }
  }
  data1.push(data2[0]);

  return [data1, data2];
}

const registry = () => {
  registerShape("line", "split-line", {
    draw(cfg: any, container) {
      const type = cfg.data[0].date;
      // 自定义 Shape 需要将图形绘制在自己的 Shape/Group 里，并返回之
      const group = container.addGroup();

      if (type === "today") {
        const pointArrs = splitData(cfg.points);
        const path1 = [];
        for (let i = 0; i < pointArrs[0].length; i++) {
          let pre = "L";
          if (i === 0) {
            pre = "M";
          }
          path1.push([pre, pointArrs[0][i].x, pointArrs[0][i].y]);
        }
        group.addShape("path", {
          attrs: {
            path: path1,
            stroke: "#1890ff",
            lineWidth: 2,
          },
        });
        const path2 = [];
        for (let i = 0; i < pointArrs[1].length; i++) {
          let pre = "L";
          if (i === 0) {
            pre = "M";
          }
          path2.push([pre, pointArrs[1][i].x, pointArrs[1][i].y]);
        }
        group.addShape("path", {
          attrs: {
            path: path2,
            stroke: "#1890ff",
            lineWidth: 2,
            lineDash: [5, 2],
            opacity: 0.7,
          },
        });
      } else {
        const path = [];
        for (let i = 0; i < cfg.points.length; i++) {
          let pre = "L";
          if (i === 0) {
            pre = "M";
          }
          path.push([pre, cfg.points[i].x, cfg.points[i].y]);
        }
        group.addShape("path", {
          attrs: {
            path,
            stroke: "#ced4d9",
            lineWidth: 2,
          },
        });
      }

      return group;
    },
  });

  registerShape("point", "breath-point", {
    draw(cfg: any, container) {
      const data = cfg.data;
      const point = { x: cfg.x, y: cfg.y };
      const group = container.addGroup();
      if (data.time === "14.20" && data.date === "today") {
        const decorator1 = group.addShape("circle", {
          attrs: {
            x: point.x,
            y: point.y,
            r: 10,
            fill: "#1890ff",
            opacity: 0.5,
          },
        });
        const decorator2 = group.addShape("circle", {
          attrs: {
            x: point.x,
            y: point.y,
            r: 10,
            fill: "#1890ff",
            opacity: 0.5,
          },
        });
        const decorator3 = group.addShape("circle", {
          attrs: {
            x: point.x,
            y: point.y,
            r: 10,
            fill: "#1890ff",
            opacity: 0.5,
          },
        });
        decorator1.animate(
          {
            r: 20,
            opacity: 0,
          },
          {
            duration: 1800,
            easing: "easeLinear",
            repeat: true,
          }
        );
        decorator2.animate(
          {
            r: 20,
            opacity: 0,
          },
          {
            duration: 1800,
            easing: "easeLinear",
            repeat: true,
            delay: 600,
          }
        );
        decorator3.animate(
          {
            r: 20,
            opacity: 0,
          },
          {
            duration: 1800,
            easing: "easeLinear",
            repeat: true,
            delay: 1200,
          }
        );
        group.addShape("circle", {
          attrs: {
            x: point.x,
            y: point.y,
            r: 6,
            fill: "#1890ff",
            opacity: 0.7,
          },
        });
        group.addShape("circle", {
          attrs: {
            x: point.x,
            y: point.y,
            r: 1.5,
            fill: "#1890ff",
          },
        });
      }

      return group;
    },
  });
};

const cpuData = [
  { date: "yesterday", time: "13.00", cpu: 63.93689627294421 },
  { date: "yesterday", time: "13.05", cpu: 65.06585239044342 },
  { date: "yesterday", time: "13.10", cpu: 66.42719381417056 },
  { date: "yesterday", time: "13.15", cpu: 63.060669399125935 },
  { date: "yesterday", time: "13.20", cpu: 64.04639809297761 },
  { date: "yesterday", time: "13.25", cpu: 64.45117682728456 },
  { date: "yesterday", time: "13.30", cpu: 63.35488066344804 },
  { date: "yesterday", time: "13.35", cpu: 65.2969449309885 },
  { date: "yesterday", time: "13.40", cpu: 66.35014444552017 },
  { date: "yesterday", time: "13.45", cpu: 66.198378961063 },
  { date: "yesterday", time: "13.50", cpu: 66.85520134738813 },
  { date: "yesterday", time: "13.55", cpu: 65.05419984325125 },
  { date: "yesterday", time: "14.00", cpu: 66.62243229531435 },
  { date: "yesterday", time: "14.05", cpu: 66.77808066603122 },
  { date: "yesterday", time: "14.10", cpu: 66.9144977524293 },
  { date: "yesterday", time: "14.15", cpu: 65.05499508303669 },
  { date: "yesterday", time: "14.20", cpu: 66.36871158902638 },
  { date: "yesterday", time: "14.25", cpu: 63.973903073723044 },
  { date: "yesterday", time: "14.30", cpu: 64.92585536363889 },
  { date: "yesterday", time: "14.35", cpu: 65.17145801764055 },
  { date: "yesterday", time: "14.40", cpu: 64.42516834555609 },
  { date: "yesterday", time: "14.45", cpu: 63.701363912573775 },
  { date: "yesterday", time: "14.50", cpu: 66.11568649665543 },
  { date: "yesterday", time: "14.55", cpu: 64.0474592964878 },
  { date: "yesterday", time: "15.00", cpu: 64.25676632707459 },
  { date: "yesterday", time: "15.00", cpu: 65 },
  { time: "13.00", cpu: 100, date: "today" },
  { time: "13.05", cpu: 100, date: "today" },
  { time: "13.10", cpu: 100, date: "today" },
  { time: "13.15", cpu: 100, date: "today" },
  { time: "13.20", cpu: 100, date: "today" },
  { time: "13.25", cpu: 100, date: "today" },
  { time: "13.30", cpu: 100, date: "today" },
  { time: "13.35", cpu: 100, date: "today" },
  { time: "13.40", cpu: 100, date: "today" },
  { time: "13.45", cpu: 100, date: "today" },
  { time: "13.50", cpu: 100, date: "today" },
  { time: "13.55", cpu: 100, date: "today" },
  { time: "14.00", cpu: 65, date: "today" },
  { time: "14.05", cpu: 72.16886580736812, date: "today" },
  { time: "14.10", cpu: 68.57230489482068, date: "today" },
  { time: "14.15", cpu: 71.43150028596347, date: "today" },
  { time: "14.20", cpu: 78.14636866352923, date: "today" },
  { time: "14.25", cpu: 68.36883432160218, date: "today" },
  { time: "14.30", cpu: 75.39521675212667, date: "today" },
  { time: "14.35", cpu: 75.27433214647408, date: "today" },
  { time: "14.40", cpu: 82.10189835378893, date: "today" },
  { time: "14.45", cpu: 84.7261454369566, date: "today" },
  { time: "14.50", cpu: 78.96269733695286, date: "today" },
  { time: "14.55", cpu: 86.43607929073264, date: "today" },
  { time: "15.00", cpu: 85, date: "today" },
];

export default (el: HTMLElement) => {
  registry();
  const chart = new Chart({
    container: el,
    autoFit: true,
    height: (el.getBoundingClientRect() as any).height,
  });

  chart.data(cpuData);

  chart.scale({
    cpu: {
      max: 100,
      min: 0,
    },
  });

  chart
    .line()
    .position("time*cpu")
    .color("date", ["#1890ff", "#ced4d9"])
    .shape("split-line");
  chart.point().position("time*cpu").shape("breath-point");
  chart.annotation().regionFilter({
    top: true,
    start: ["min", 105],
    end: ["max", 85],
    color: "#ff4d4f",
  });
  chart.annotation().line({
    start: ["min", 85],
    end: ["max", 85],
    style: {
      stroke: "#ff4d4f",
      lineWidth: 1,
      lineDash: [3, 3],
    },
    text: {
      position: "start",
      style: {
        fill: "#8c8c8c",
        fontSize: 15,
        fontWeight: "normal",
      },
      content: "预警线 85%",
      offsetY: -5,
    },
  });

  chart.render();
};
