import React from "react";
import "./CurrencyConverter.css";
import { useState, useEffect } from "react";
import logo from "./pics/logo.png";
import star from "./pics/star.png";

const api_key = process.env.REACT_APP_API_KEY;
const url =
  "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP";

const CurrencyConverter = () => {
  useEffect(() => {
    fetch(url, {
      headers: {
        "X-RapidAPI-Key": api_key,
        "X-RapidAPI-Host":
          "currency-conversion-and-exchange-rates.p.rapidapi.com",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  });
};

export default CurrencyConverter;
