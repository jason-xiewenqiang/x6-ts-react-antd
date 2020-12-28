import React from "react";
import "./index.scss";
import RightPanel from "./components/rightPanel";
import LeftBar from "./components/leftBar";
import CenterBox from "./components/centerBox";

function Flow() {
  return (<div className="Flow"> 
    <LeftBar />
    <CenterBox />
    <RightPanel />
  </div>);
}
export default Flow;
