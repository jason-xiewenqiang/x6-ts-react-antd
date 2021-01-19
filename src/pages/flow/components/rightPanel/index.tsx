import React from "react";
import "./rightPanel.scss";
import CanvasPanel from './canvasProperty';
import NodePanel from './nodeProperty';

function RightPanel() {
  return <div className="right-panel">
    <CanvasPanel/>
  </div>;
}
export default RightPanel;
