import React, { useEffect, useState } from "react";
import Zingtouch from "zingtouch";

const Ipod = () => {
  let tempDistanceChange = 0,
    tempSelected = 0;
  const options = ["Games", "Music", "Settings", "Coverflow"];
  const [changeInAngle, setChangeInAngle] = useState(0);
  const [mainMenu, setMainMenu] = useState(false);
  const songSubMenu = ["All Songs", "Artists", "Albums"];

  let changeSelectedOptionStyle = () => {
    console.log(tempSelected);
    let target = document.getElementsByClassName("first-menu");
    for (let i = 0; i < target.length; i++) {
      if (i !== tempSelected) {
        target[i].classList.remove("selected");
      }
    }
    target[tempSelected].classList.add("selected");
  };

  let changeSelectedOption = (dist) => {
    tempDistanceChange += dist;
    if (tempDistanceChange > 30) {
      tempSelected += 1;
      if (tempSelected > 3) tempSelected -= 4;
      tempDistanceChange = 0;
      changeSelectedOptionStyle();
    }
  };

  useEffect(() => {
    let zt = new Zingtouch.Region(
      document.getElementsByClassName("round-controls")[0]
    );
    changeSelectedOptionStyle();
    zt.bind(
      document.getElementsByClassName("round-controls")[0],
      "rotate",
      (event) => {
        let dist = Math.abs(event.detail.distanceFromLast);
        changeSelectedOption(dist);
      }
    );
  }, []);

  const menuClick = () => {
    let targetElement = document.getElementsByClassName("screen-overlay")[0];
    if (mainMenu === false) {
      setMainMenu(true);
      targetElement.style.display = "flex";
    } else {
      setMainMenu(false);
      targetElement.style.display = "none";
    }
  };

  return (
    <div className="outer-container">
      <div className="screen-container">
        <div className="screen"></div>
        <div className="screen-overlay">
          <h4 style={{paddingLeft: '6px'}}>Ipod.js</h4>
          {options.map((item, index) => (
            <p className="first-menu" key={index}>
              {item}
            </p>
          ))}
        </div>
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
            <img
              width="30px"
              style={{ top: "-16px", left: "45px" }}
              src="https://image.flaticon.com/icons/png/512/37/37700.png"
              alt="fast-forward"
            />
            <img
              width="30px"
              style={{
                transform: "rotate(180deg)",
                top: "-16px",
                left: "-76px",
              }}
              src="https://image.flaticon.com/icons/png/512/37/37700.png"
              alt="fast-backward"
            ></img>
            <img
              width="30px"
              style={{ top: "48px", left: "-15px" }}
              src="https://as2.ftcdn.net/v2/jpg/02/33/13/17/1000_F_233131743_n4HZ9683V4Zt4E5PP8XVK2efwPnVu3BY.jpg"
              alt="play-pause"
            ></img>
          </div>
          <div className="select-button" onClick={}></div>
        </div>
      </div>
    </div>
  );
};

export default Ipod;
