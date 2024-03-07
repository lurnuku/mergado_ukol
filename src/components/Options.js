import React from "react";
import { useState } from "react";

const Options = ({ myOptions }) => {
  const [inputValueFrom, setInputValueFrom] = useState("");
  const [inputValueTo, setInputValueTo] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

  //handles from currency
  const handleInputFromChange = (e) => {
    setInputValueFrom(e.target.value);
    setFilteredOptions(
      myOptions.filter((item) => {
        //returns an object with items that include the inputValue
        return item.toLowerCase().includes(inputValueFrom.toLowerCase());
      })
    );
  };

  //handles to currency
  const handleInputToChange = (e) => {
    setInputValueTo(e.target.value);
    setFilteredOptions(
      myOptions.filter((item) => {
        //returns an object with items that include the inputValue
        return item.toLowerCase().includes(inputValueTo.toLowerCase());
      })
    );
  };

  //handles from currency
  const handleOptionFromClick = (item) => {
    setInputValueFrom(item);
    setFilteredOptions([]);
  };

  //handles to currency
  const handleOptionToClick = (item) => {
    setInputValueTo(item);
    setFilteredOptions([]);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValueFrom}
        onChange={handleInputFromChange}
        placeholder="Type to search..."
      />
      <ul>
        {filteredOptions.map((option, index) => (
          <li key={index} onClick={() => handleOptionFromClick(option)}>
            {option}
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValueTo}
        onChange={handleInputToChange}
        placeholder="Type to search..."
      />
      <ul>
        {filteredOptions.map((option, index) => (
          <li key={index} onClick={() => handleOptionToClick(option)}>
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Options;
