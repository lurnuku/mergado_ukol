import React from "react";
import "./CurrencyConverter.css";
import { useState, useEffect } from "react";
import moment from "moment";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "./pics/logo.png";
import star from "./pics/star.png";

const CurrencyConverter = () => {
  const date = new Date();
  //použila som moment.js aby som dostala požadovaný formát aktuálneho dátumu pre API
  let currentDate = moment(date).format("MMMM Do YYYY, h:mm:ss a");
  let formattedDate = moment(date).format("YYYYMMDD");

  const [currency, setCurrency] = useState([]);
  const [selectedValue1, setSelectedValue1] = useState("");
  const [selectedValue2, setSelectedValue2] = useState("");

  const desiredCurrencies = ["AUD", "DKK", "EUR", "GBP", "BGN"];

  const [amountValue, setAmountValue] = useState(1);

  const handleAmountChange = (e) => {
    //zaistí, že user nemôže zadať negatívne číslo, nulu alebo viac ako 999999999999
    /* if (e.target.value < 1) {
      e.target.value = 1;
    } else if (e.target.value > 999999999999) {
      e.target.value = 999999999999;
    } */
    e.target.value =
      e.target.value < 1
        ? 1
        : e.target.value > 999999999999
        ? 999999999999
        : e.target.value;

    setAmountValue(e.target.value);
  };
  console.log(amountValue);
  const handleChange1 = (e) => {
    setSelectedValue1(e.target.value);
  };
  const handleChange2 = (e) => {
    setSelectedValue2(e.target.value);
  };

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

        //reduce premení array na objekt kde key bude název meny a value bude ich dev_stred, teda kurz na Českú korunu (dufam)
        const devProdejValues = currencies.reduce((acc, obj) => {
          acc[obj.kratky_nazev] = obj.dev_stred;
          return acc;
        }, {});
        setCurrency(currencies);
        console.log(devProdejValues);

        /* musíš previesť všetky desiredCurrencies na české koruny 
        a potom sa s tým už bude dať pracovať, 
        tie následne zmeníš na tú jednu desired currency zo selectu */

        //pre každú value z objektu to vydeliť (?)
        const premeneneValues = {};

        Object.entries(devProdejValues).forEach(([key, value]) => {
          premeneneValues[key] = amountValue / value;
        });
        console.log(premeneneValues);

        // príklad: vieš, že 1 AUD je 16.37kc a 1 EUR je 26.22kc, kolko je potom 1 AUD v EUR?
      });
  }, [formattedDate]);

  return (
    <div className="mainContainer">
      <div className="logoContainer">
        <img src={logo} className="logo" alt="logo"></img>
      </div>
      <div className="container">
        <div className="grafy">
          <div className="obrazok1"></div>
          <div className="obrazok2"></div>
          <div className="obrazok3"></div>
          <div className="obrazok4"></div>
          <div className="obrazok5"></div>
        </div>
        <form>
          <div className="">
            <label htmlFor="amount" className="form-label">
              <h5>Amount</h5>
            </label>
            <input
              type="number"
              max="999999999999"
              className="form-control"
              onChange={handleAmountChange}
            />
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
          <input type="submit" value="Convert" className="btn"></input>
        </form>
        <br />
        <div className="bottomContainer">
          <div className="conversionContainer">
            <img src={star} alt="star"></img>
            <h5>Conversion result:</h5>
            <h4>{amountValue}</h4>
          </div>
          <div className="infoContainer">
            <p>
              Zdroj dat: <a href="https://www.kurzy.cz/">kurzy.cz</a> /
            </p>
            <p>/ Aktuálne kurzy k dátumu: {currentDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyConverter;
