import React, { useState, useEffect } from "react";

const CurrencyConverter = () => {
  const apiKey = process.env.REACT_APP_API_KEY;
  const [myData, setMyData] = useState(null);

  useEffect(() => {
    fetch(`https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}
    `)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }, []);

  return (
    <div>
      <p>Data:</p>
    </div>
  );
};
export default CurrencyConverter;
