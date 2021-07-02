import React from "react";
import "../Dropdown/index.css";



const Dropdown = (props) => {
  const { items, drop, query, arrow, status } = props;

  /**
   *
   * @param {Array} options
   * @returns Array of filtered names from items state
   */
  function filter(options) {
    return options.filter(
      (option) => option.name.toLowerCase().indexOf(query.toLowerCase()) > -1
    );
  }

  {
    if ((filter(items).length > 0 && arrow) || status === "loading") {
      return (
        <div className="Border">
          <div className="ScrollingDropdown">
            {status === "loading" ? (
              <div className="CenterDrop" style={{ paddingLeft: "10px" }}>
                loading ...
              </div>
            ) : null}
            {filter(items).map((item) => {
              if (!item.selected) {
                return (
                  <div
                    className="CenterDrop"
                    key={item._id}
                    onClick={() => drop(item._id)}
                  >
                    {item.name}
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      );
    } else return null;
  }
};

export default Dropdown;
