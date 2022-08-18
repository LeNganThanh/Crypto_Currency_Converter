"use strict";

//common setup
document.body.style.fontSize = "1.3rem";
const heading = document.querySelector("h1");
heading.style.margin = "3rem 0";

const convertBtn = document.querySelector(".btn");
convertBtn.addEventListener("click", () => {
  const crypto = document.getElementById("inputGroupSelect01");
  const cryptoVal = crypto.options[crypto.selectedIndex].text;

  const currency = document.getElementById("inputGroupSelect02");
  const currencyVal = currency.options[currency.selectedIndex].text;

  const cryptoAmt = document.querySelector(".crypto-amt").value;
  const currencyAmt = document.querySelector(".currency-amt");

  // const currencyConvert = "https://api.coinbase.com/v2/prices/LTC-EUR/spot";
  const currencyConvert = `https://api.coinbase.com/v2/prices/${cryptoVal}-${currencyVal}/spot`;
  fetch(currencyConvert)
    .then(response => response.json())
    .then(data => {
      const getDataVal = data.data.amount;
      currencyAmt.value = getDataVal * cryptoAmt;
      console.log(data.data.amount);
    })
    .catch(err => {
      alert("Invalid base currency!");
      location.reload();
    });
});
