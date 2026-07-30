import React from "react";
import GiftCardReveal from "./GiftCardReveal";

export default function App() {
  return (
    <div className="page">
      <GiftCardReveal
        brand="Reward"
        amount={100.0}
        currency="USD"
        cardNumber="6318 4960 4965 8285"
        pin="29039387"
        asOf={new Date()}
        balanceUrl="#"
        message="Thank you for your loyalty!"
      />
    </div>
  );
}
