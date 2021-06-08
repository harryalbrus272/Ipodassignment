import React from "react";

const Layer2 = ({ optSelected, options }) => {
  console.log(optSelected);

  const Settings = () => {
    return (
      <div style={{ fontSize: "50px" }}>
        <i className="fas fa-cogs"></i>
      </div>
    );
  };

  return (
    <div className="layer-2-screen">
      {optSelected === 2 && <Settings />}
      <h3>{options[optSelected]}</h3>
    </div>
  );
};

export default Layer2;
