import React from "react";
import "../Input/index.css";
import Chip from "../Chip";
import Arrow from "../DropArrow";

const Input = (props) => {
  const {
    items,
    chip,
    arrow,
    handleQuery,
    handleArrow,
    handleClear,
    handleInputClick,
  } = props;
  return (
    <div>
      <div className="Center">
        {items
          ? items.map((item) => {
              if (item.selected) {
                return (
                  <Chip
                    value={item.name}
                    key={item._id}
                    updateChip={chip}
                    id={item._id}
                  />
                );
              } else {
                return null;
              }
            })
          : null}

        <input
          className="Input"
          onChange={handleQuery}
          onClick={handleInputClick}
        />
        <span className="close-btn" onClick={handleClear}>
          &times;
        </span>
        <div
          style={{
            marginRight: "6px",
            paddingTop: "2px",
            color: "silver",
            fontWeight: "700",
          }}
        >
          |
        </div>
        <Arrow arrow={arrow} handleArrow={handleArrow} />
      </div>
    </div>
  );
};

export default Input;
