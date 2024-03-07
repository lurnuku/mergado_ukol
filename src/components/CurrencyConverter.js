import React, { useState, useEffect } from "react";
import Header from "./Header";
import Amount from "./Amount";
import Switch from "./Switch";
import Submit from "./Submit";
import Options from "./Options";

const CurrencyConverter = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [countriesData, setCountriesData] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/all`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok :(");
        }
        return response.json();
      })
      .then((data) => {
        //need to filter, because not all keys have currencies keys in them
        const filteredData = data.filter((item) => "currencies" in item);
        console.log(filteredData);
        const countriesData = filteredData.map((item) => {
          //we need to grab the key, so we are using Object.keys
          return `${Object.keys(item.currencies)[0]}-${item.name.common}`;
        });
        setCountriesData(countriesData);
      });
  }, []);

  const baseCurrency = "EUR";
  const currencies = "CZK";

  useEffect(() => {
    fetch(
      `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&basecurrency=${baseCurrency}&currencies=${currencies}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok :(");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
      <Header />
      <Amount />
      <Options myOptions={countriesData} />
      <Switch />
      <Submit />
    </div>
  );
};
export default CurrencyConverter;
