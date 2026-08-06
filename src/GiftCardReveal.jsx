import React, { useState } from "react";

export default function GiftCardReveal({
  brand = "Reward",
  amount = 100.0,
  currency = "USD",
  cardNumber = "6318 4960 4959 4794",
  pin = "71787689",
  asOf = new Date(),
  balanceUrl = "#",
  message = "Enjoy this reward — just for you!",
}) {
  const [copied, setCopied] = useState({ number: false, pin: false });

  const formattedAmount = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(asOf instanceof Date ? asOf : new Date(asOf));

  const handleCopy = async (value, key) => {
    try {
      await navigator.clipboard.writeText(value.replace(/\s/g, ""));
      setCopied((prev) => ({ ...prev, [key]: true }));
      setTimeout(() => setCopied((prev) => ({ ...prev, [key]: false })), 1800);
    } catch (_) {
      // Clipboard unavailable — fail silently
    }
  };

  return (
    <div className="card-shell">

      {/* ── Header: logo + brand label ── */}
      <div className="card-header">
        <img
          src="/logo.png"
          alt="Brand logo"
          className="header-logo"
        />
        <div className="header-divider" />
        <p className="header-brand">{brand} eGift Card</p>
      </div>

      {/* ── Perforation seam ── */}
      <div className="seam" />

      {/* ── Body ── */}
      <div className="card-body">

        {/* Amount */}
        <div className="amount-section">
          <p className="amount-value">${formattedAmount}</p>
          <p className="amount-currency">{currency}</p>
        </div>

        {/* Balance date only */}
        <div className="balance-section">
          <p className="balance-date">Balance as of {formattedDate}</p>
          <p className="balance-note">
            Balance updates may be delayed and may not reflect recent purchases.
          </p>
        </div>

        {/* Copy rows */}
        <div className="copy-rows">
          <CopyRow
            label="eGift Card Number"
            value={cardNumber}
            copied={copied.number}
            onCopy={() => handleCopy(cardNumber, "number")}
          />
          <CopyRow
            label="PIN"
            value={pin}
            copied={copied.pin}
            onCopy={() => handleCopy(pin, "pin")}
          />
        </div>

        {/* Message */}
        <div className="card-message">
          <p>{message}</p>
        </div>

      </div>
    </div>
  );
}

function CopyRow({ label, value, copied, onCopy }) {
  return (
    <div className="copy-row">
      <div className="copy-row-info">
        <p className="copy-row-label">{label}</p>
        <p className="copy-row-value">{value}</p>
      </div>
      <button
        type="button"
        onClick={onCopy}
        aria-label={`Copy ${label}`}
        className={`copy-btn${copied ? " copied" : ""}`}
      >
        {copied ? (
          <>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Copied
          </>
        ) : (
          <>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="1" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
            Copy
          </>
        )}
      </button>
    </div>
  );
}
