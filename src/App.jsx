import React from "react";
import GiftCardReveal from "./GiftCardReveal";

export default function App() {
  return (
    <div className="page">
      <GiftCardReveal
        brand="Reward"
        amount={100.0}
        currency="USD"
        cardNumber="6318 4960 4959 4794"
        pin="71787689"
        asOf={new Date()}
        balanceUrl="#"
        message="Thank you for your loyalty!"
      />
    </div>
  );
}
