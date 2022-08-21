"use strict";

//common setup
document.body.style.fontSize = "1.3rem";
const heading = document.querySelector("h1");
heading.style.margin = "3rem 0";
/* 
  const currencyConvert = `https://api.coinbase.com/v2/prices/${cryptoVal}-${currencyVal}/spot`;
  fetch(currencyConvert)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then(result => {
      const getDataVal = result.data.amount;
      currencyAmt.value = getDataVal * cryptoAmt;
    })
    .catch(err => {
      alert("Invalid base currency!");
      location.reload();
    });
*/

//async function to get fetch data from coinbase
async function getData(cry, curr) {
  const currencyConvertUrl = `https://api.coinbase.com/v2/prices/${cry}-${curr}/spot`;
  let responseVal;
  try {
    const getVal = await fetch(currencyConvertUrl);
    const response = await getVal.json();
    responseVal = response.data.amount;
  } catch (error) {
    alert(error);
    location.reload();
  }
  console.log(responseVal);
  return responseVal;
}

const convertBtn = document.querySelector(".btn");

//catch the "click" event of the button
convertBtn.addEventListener("click", e => {
  const crypto = document.getElementById("inputGroupSelect01");
  const cryptoVal = crypto.options[crypto.selectedIndex].text;

  const currency = document.getElementById("inputGroupSelect02");
  const currencyVal = currency.options[currency.selectedIndex].text;

  const cryptoAmt = document.querySelector(".crypto-amt").value;
  const currencyAmt = document.querySelector(".currency-amt");

  //get data from async function
  getData(cryptoVal, currencyVal).then(result => {
    const amountData = +result;
    currencyAmt.value = amountData * cryptoAmt;
  });
});
