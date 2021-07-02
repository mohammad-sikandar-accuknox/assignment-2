import "./App.css";
import Input from "./components/Input";
import React, { useState, useEffect } from "react";
import Dropdown from "./components/Dropdown";
import { useQuery } from "react-query";
import axiosInstance from "./components/helpers/axios";

function App() {
  const [arrow, setArrow] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([
    // {
    //   id: "1",
    //   item: "Android",
    //   selected: false,
    // },
    // {
    //   id: "2",
    //   item: "IOS",
    //   selected: false,
    // },
    // {
    //   id: "3",
    //   item: "Windows",
    //   selected: false,
    // },
    // {
    //   id: "4",
    //   item: "Linux",
    //   selected: false,
    // },
  ]);

  /**
   *
   * @returns response data from api
   */
  const fetchUser = async () => {
    const response = await axiosInstance
      .get("passenger?page=0&size=4")
      .catch((err) => {
        console.log(err);
      });
    return response.data.data;
  };

  const { data, status } = useQuery("user", fetchUser, { enabled: arrow }); // useQuery hook to get response data

  useEffect(() => {
    if (status === "success") {
      handleArrow();
    }
  }, [status]);
  /**
   *
   * @param {Array} data
   * @returns updated objects array
   */
  const createData = (data) => {
    const updatedData = data;
    for (var i in updatedData) {
      updatedData[i].selected = false; // add property selected to each object in an array
    }
    return updatedData;
  };

  /**
   * update the items state property value
   * @param {String} id
   * @param {Object} itemAttributes
   */
  function updateItem(id, itemAttributes) {
    console.log(id);
    var index = items.findIndex((x) => x._id === id);
    if (index === -1) {
    }
    // handle error
    else
      setItems([
        ...items.slice(0, index),
        Object.assign({}, items[index], itemAttributes),
        ...items.slice(index + 1),
      ]);
  }
  /**
   * update all selected property in lists array
   * @param {Array} lists
   * @param {boolean} value
   * @returns updated objects array
   */
  function changeDesc(lists, value) {
    for (var i in lists) {
      lists[i].selected = value;
    }
    return lists;
  }
  /**
   * update the state items property
   * @param {String} e
   */
  const handleDropdown = (e) => {
    updateItem(e, { selected: true });
  };
  /**
   * update the state items selected property
   * @param {String} e
   */
  const handleChip = (e) => {
    updateItem(e, { selected: false });
  };
  /**
   * update the setQuery state to input value
   * @param {Event} e
   */
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  const handleArrow = () => {
    setArrow((arrow) => !arrow); //toggle dropdown arrow
    if (items && !items.length > 0) {
      setItems(createData(data));
    }
    if (status === "success" && !items) {
      setItems(createData(data));
      setArrow((arrow) => true);
    }
  };

  /**
   * handler to clear all selected value from dropdown
   */
  const handleClear = () => {
    if (items) {
      const lists = [...items];
      setItems(changeDesc(lists, false));
    }
  };
  const handleInputClick = () => {
    setArrow((arrow) => true);
    if (items && !items.length > 0) {
      setItems(createData(data));
    }
  };
  return (
    <>
      <Input
        items={items}
        chip={handleChip}
        arrow={arrow}
        handleQuery={handleQuery}
        handleArrow={handleArrow}
        handleClear={handleClear}
        handleInputClick={handleInputClick}
      />
      <div style={{ margin: "3px" }}></div>
      <Dropdown
        items={items}
        drop={handleDropdown}
        query={query}
        arrow={arrow}
        status={status}
      />
    </>
  );
}

export default App;
