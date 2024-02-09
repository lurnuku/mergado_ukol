import React from "react";
import "./CurrencyConverter.css";
import { useState, useEffect } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";

const CurrencyConverter = () => {
  const date = new Date();
  //použila som moment.js aby som dostala požadovaný formát aktuálneho dátumu pre API
  let currentDate = moment(date).format("MMMM Do YYYY, h:mm:ss a");
  let formattedDate = moment(date).format("YYYYMMDD");

  const [currency, setCurrency] = useState([]);
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");

  const desiredCurrencies = ["AUD", "DKK", "EUR", "GBP", "BGN"];

  useEffect(() => {
    fetch(`https://data.kurzy.cz/json/meny/b[2]den[${formattedDate}].json`)
      .then((response) => response.json())
      .then((data) => {
        //manipulácia s dátami aby sa s tým lepšie pracovalo
        const currencies = [];
        for (const currencyName of desiredCurrencies) {
          const currencyItem = {
            kratky_nazev: currencyName,
            ...data.kurzy[currencyName],
          };
          currencies.push(currencyItem);
        }
        /* console.log(currencies[0].dev_stred); */
        /* console.log(currencies); */

        //reduce premení array na objekt kde key bude název meny a value bude ich dev_stred, teda kurz
        const devProdejValues = currencies.reduce((acc, obj) => {
          acc[obj.kratky_nazev] = obj.dev_stred;
          return acc;
        }, {});
        console.log(devProdejValues);
        setCurrency(currencies);
        console.log(devProdejValues);
      });
  }, [formattedDate]);

  const handleChange1 = (e) => {
    setSelectedValue1(e.target.value);
  };
  const handleChange2 = (e) => {
    setSelectedValue2(e.target.value);
  };

  return (
    <div className="container">
      <div className="infoContainer">
        <h6>
          Zdroj dat: <a href="https://www.kurzy.cz/">kurzy.cz</a>
        </h6>
        <p>Aktuálne kurzy k dátumu: {currentDate}</p>
      </div>
      <form>
        <div className="">
          <label htmlFor="amount" className="form-label">
            <h5>Amount</h5>
          </label>
          <input type="number" className="form-control" placeholder={1} />
        </div>
        <div>
          <label htmlFor="value1" className="form-label">
            <h5>From</h5>
          </label>
          <select
            className="form-select"
            name="value1"
            value={selectedValue1}
            onChange={handleChange1}
          >
            <option value="AUD">AUD</option>
            <option value="GBP">GBP</option>
            <option value="BGN">BGN</option>
            <option value="DKK">DKK</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <label htmlFor="value2" className="form-label">
            <h5>To</h5>
          </label>
          <select
            className="form-select"
            name="value2"
            value={selectedValue2}
            onChange={handleChange2}
          >
            <option value="AUD">AUD</option>
            <option value="GBP">GBP</option>
            <option value="BGN">BGN</option>
            <option value="DKK">DKK</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <br />
        <input type="submit" value="Convert" className="btn btn-dark"></input>
      </form>
      <br />
      <h5>Conversion result:</h5>
    </div>
  );
};

export default CurrencyConverter;
