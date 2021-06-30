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
  const fetchUser = async () => {
    const response = await axiosInstance
      .get("passenger?page=0&size=4")
      .catch((err) => {
        console.log(err);
      });
    return response.data.data;
  };
  const { data, status } = useQuery("user", fetchUser);
  const createData = (data) => {
    const updatedData = data;
    for (var i in updatedData) {
      updatedData[i].selected = false;
    }
    return updatedData;
  };

  console.log(createData(data));

  function updateItem(id, itemAttributes) {
    console.log(id);
    var index = items.findIndex((x) => x._id == id);
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
  function changeDesc(lists, value) {
    for (var i in lists) {
      lists[i].selected = value;
    }
    return lists;
  }
  const handleDropdown = (e) => {
    console.log(e);
    updateItem(e, { selected: true });
  };
  const handleChip = (e) => {
    updateItem(e, { selected: false });
  };
  const handleQuery = (e) => {
    setQuery(e.target.value);
  };
  const handleArrow = () => {
    setArrow((arrow) => !arrow);
    console.log(arrow);
    if (!items.length > 0) {
      setItems(createData(data));
    }
  };
  const handleClear = () => {
    const lists = [...items];
    setItems(changeDesc(lists, false));
  };
  const handleInputClick = () => {
    console.log("input clicked");
    console.log(items);
    setArrow((arrow) => true);
    if (!items.length > 0) {
      setItems(createData(data));
    }
    // setItems(createData(data));
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
      />
    </>
  );
}

export default App;
