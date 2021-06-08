import React, { useEffect, useState } from "react";
import Zingtouch from "zingtouch";
import Layer1 from "./Layer1";
import Layer2 from "./Layer2";

const Ipod = () => {
  //variables to add the and subtract the values globally
  let tempDistanceChange = 0,
    tempSelected = 0;
  //Array for the constant values
  const options = ["Games", "Music", "Settings", "Coverflow"];
  const songSubMenu = ["All Songs", "Artists", "Albums"];
  //state variables
  const [layer, setLayer] = useState(-1);
  const [optSelected, setOptSelected] = useState(0);

  //Function for changing the style of the options that has been selected
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

  //Function to calculate the distance and storing the state of the option selected to be passed on to layer2
  let changeSelectedOption = (dist) => {
    tempDistanceChange += dist;
    if (tempDistanceChange > 30) {
      tempSelected += 1;
      if (tempSelected > 3) tempSelected -= 4;
      setOptSelected(tempSelected);
      tempDistanceChange = 0;
    } else if (tempDistanceChange < -30) {
      tempSelected -= 1;
      if (tempSelected < 0) tempSelected = 3;
      setOptSelected(tempSelected);
      tempDistanceChange = 0;
    }
    changeSelectedOptionStyle();
  };

  //The code block that is to be run once when the component has been rendered
  useEffect(() => {
    let zt = new Zingtouch.Region(
      document.getElementsByClassName("round-controls")[0]
    );
    zt.bind(
      document.getElementsByClassName("round-controls")[0],
      "rotate",
      (event) => {
        let dist = event.detail.distanceFromLast;
        changeSelectedOption(dist);
      }
    );
  }, []);

  //function to increase the layer level when middle button is pressed
  const increaseLayerLevel = () => {
    if (layer > -1 && layer < 1) setLayer((prev) => prev + 1);
  };

  //function to decrease the layer level when middle button is pressed
  const decreaseLayerLevel = () => {
    setLayer((prev) => prev - 1);
  };

  //To recognize the menu button is clicked. It reset to the topmost selection on closing the drawer on the home screen
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
            <div style={{ top: "-76px", left: "-13px", fontSize: "30px" }} onClick={(event) => menuClick(event)}>
              <i class="fas fa-bars"></i>
            </div>
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
