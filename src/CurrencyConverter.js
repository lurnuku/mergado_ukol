import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const apiKey = process.env.REACT_APP_API_KEY;

  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.freecurrencyapi.com/v1/latest",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              apikey: apiKey,
            },
          }
        );

        const result = await response.json();
        setData(result);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data :(", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <p>Data:</p>
    </div>
  );
};
export default CurrencyConverter;
