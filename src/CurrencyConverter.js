import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch(
          `https://currency-conversion-and-exchange-rates.p.rapidapi.com/latest?from=${baseCurrency}&to=${targetCurrency}`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": api_key,
              "X-RapidAPI-Host":
                "currency-conversion-and-exchange-rates.p.rapidapi.com",
            },
          }
        );
        const data = await response.json();
        setExchangeRate(data[targetCurrency]);
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, [api_key, baseCurrency, targetCurrency]);

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const handleTargetCurrencyChange = (event) => {
    setTargetCurrency(event.target.value);
  };

  return (
    <div>
      <h2>Currency Converter</h2>
      <div>
        <label htmlFor="baseCurrency">Base Currency:</label>
        <select
          id="baseCurrency"
          value={baseCurrency}
          onChange={handleBaseCurrencyChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more options as needed */}
        </select>
      </div>
      <div>
        <label htmlFor="targetCurrency">Target Currency:</label>
        <select
          id="targetCurrency"
          value={targetCurrency}
          onChange={handleTargetCurrencyChange}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          {/* Add more options as needed */}
        </select>
      </div>
      {exchangeRate && (
        <p>
          1 {baseCurrency} = {exchangeRate} {targetCurrency}
        </p>
      )}
    </div>
  );
};

export default CurrencyConverter;
