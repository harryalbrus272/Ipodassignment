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
  const Games = () => {
    return (
      <div style={{ fontSize: "50px" }}>
        <img width="150px" src="https://images.unsplash.com/photo-1551431009-a802eeec77b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=667&q=80" alt="games" />
      </div>
    );
  };

  return (
    <div className="layer-2-screen">
      {optSelected === 2 && <Settings />}
      {optSelected === 0 && <Games />}
      <h3>{options[optSelected]}</h3>
    </div>
  );
};

export default Layer2;
