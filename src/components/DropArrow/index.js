import React from "react";
import "./index.css";

function Arrow(props) {
  const { arrow, handleArrow } = props;
  console.log(arrow);
  return (
    <div onClick={handleArrow}>
      {arrow ? (
        <div className={"arrow down"}></div>
      ) : (
        <div className={"arrow right"}></div>
      )}
    </div>
  );
}

export default Arrow;
