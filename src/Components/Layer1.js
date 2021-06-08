import React, { useEffect } from "react";

const Layer1 = ({ options }) => {
  useEffect(() => {
    let target = document.getElementsByClassName("first-menu");
    target[0].classList.add("selected");
  }, []);
  return (
    <div className="screen-overlay">
      <h4 style={{ paddingLeft: "6px" }}>Ipod.js</h4>
      {options.map((item, index) => (
        <p className="first-menu" key={index}>
          {item}
        </p>
      ))}
    </div>
  );
};

export default Layer1;
