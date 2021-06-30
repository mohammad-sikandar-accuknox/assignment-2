import React from "react";

const Chip = (props) => {
  const { value, updateChip, id } = props;
  console.log(id);
  return (
    <div
      style={{
        display: "flex",
        border: "1px solid blue",
        margin: "2px",
        paddingRight: "4px",
        background: "lightGray",
        paddingLeft: "2px",
      }}
    >
      <span style={{width:'max-content'}}>{value}</span>
      <span
        style={{ paddingLeft: "10px", cursor: "pointer" }}
        onClick={() => updateChip(id)}
      >
        x
      </span>
    </div>
  );
};

export default Chip;
