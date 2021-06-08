import React, { useEffect, useState } from "react";
import Zingtouch from "zingtouch";
import Layer1 from "./Layer1";
import Layer2 from "./Layer2";

const Ipod = () => {
  let tempDistanceChange = 0,
    tempSelected = 0;
  const options = ["Games", "Music", "Settings", "Coverflow"];
  const [layer, setLayer] = useState(-1);
  const [optSelected, setOptSelected] = useState(0);
  const [changeInAngle, setChangeInAngle] = useState(0);
  const [mainMenu, setMainMenu] = useState(false);
  const songSubMenu = ["All Songs", "Artists", "Albums"];

  let changeSelectedOptionStyle = () => {
    let target = document.getElementsByClassName("first-menu");
    if (target.length) {
      for (let i = 0; i < target.length; i++) {
        if (i !== tempSelected) {
          target[i].classList.remove("selected");
        }
      }
      target[tempSelected].classList.add("selected");
    }
  };

  let changeSelectedOption = (dist) => {
    tempDistanceChange += dist;
    if (tempDistanceChange > 30) {
      tempSelected += 1;
      if (tempSelected > 3) tempSelected -= 4;
      setOptSelected(tempSelected);
      console.log({ tempSelected });
      tempDistanceChange = 0;
      changeSelectedOptionStyle();
    }
  };

  useEffect(() => {
    let zt = new Zingtouch.Region(
      document.getElementsByClassName("round-controls")[0]
    );
    zt.bind(
      document.getElementsByClassName("round-controls")[0],
      "rotate",
      (event) => {
        let dist = Math.abs(event.detail.distanceFromLast);
        changeSelectedOption(dist);
      }
    );
  }, []);

  const increaseLayerLevel = () => {
    if (layer > -1 && layer < 1) setLayer((prev) => prev + 1);
    console.log("optSelected", optSelected);
  };

  const decreaseLayerLevel = () => {
    setLayer((prev) => prev - 1);
  };

  const menuClick = () => {
    if (layer === -1) {
      setLayer((prev) => prev + 1);
      tempSelected = 0;
      setOptSelected(0);
    } else {
      decreaseLayerLevel();
    }
  };

  return (
    <div className="outer-container">
      <div className="screen-container">
        <div className="screen"></div>
        {layer === 0 && <Layer1 options={options} />}
        {layer === 1 && <Layer2 optSelected={optSelected} options={options} />}
      </div>
      <div className="control-container">
        <div className="round-controls">
          <div className="absolute-container">
            <p
              style={{ top: "-88px", left: "-20px", cursor: "default" }}
              onClick={(event) => menuClick(event)}
            >
              Menu
            </p>
            <div style={{ top: "-16px", left: "45px", fontSize: "30px" }}>
              <i class="fas fa-fast-forward"></i>
            </div>
            <div style={{ top: "-16px", left: "-76px", fontSize: "30px" }}>
              <i class="fas fa-fast-backward"></i>
            </div>
            <div style={{ top: "48px", left: "-11px", fontSize: "20px" }}>
              <i style={{ top: "6px", left: "-6px" }} class="fas fa-play"></i>
              <i style={{ top: "6px", left: "15px" }} class="fas fa-pause"></i>
            </div>
          </div>
          <div
            className="select-button"
            onClick={() => increaseLayerLevel()}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Ipod;
