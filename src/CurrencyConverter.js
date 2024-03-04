import React from "react";
import "./CurrencyConverter.css";
import { useState, useEffect } from "react";
import logo from "./pics/logo.png";
import star from "./pics/star.png";

const url =
  "https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=USD&to=EUR%2CGBP";

const CurrencyConverter = () => {
  useEffect(() => {
    fetch(url, {
      headers: {
        "X-RapidAPI-Key": "c6d0ac48dcmsh51514b0fadfde41p1c48fdjsned190d7ea281",
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
