import React from "react";
import { useState } from "react";

const Amount = () => {
  const [myAmount, setMyAmount] = useState(1);

  return (
    <div>
      <input
        type="number"
        value={myAmount}
        onChange={(e) => setMyAmount(e.target.value)}
        min={1}
      />
      {console.log(myAmount)}
    </div>
  );
};

export default Amount;
