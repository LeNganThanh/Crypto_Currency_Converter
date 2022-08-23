"use strict";
//Variables declare
const crypto = document.getElementById("inputGroupSelect01");
const currency = document.getElementById("inputGroupSelect02");
const cryptoInput = document.querySelector(".crypto-amt");
const currencyAmt = document.querySelector(".currency-amt");
const convertBtn = document.querySelector(".btn");

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
    alert("Invalid base currency!");
    location.reload();
  }
  return responseVal;
}

//catch the "click" event of the button
convertBtn.addEventListener("click", e => {
  const cryptoVal = crypto.value;
  const cryptoAmt = cryptoInput.value;

  const currencyVal = currency.options[currency.selectedIndex].text;

  //get data from async function
  getData(cryptoVal, currencyVal).then(result => {
    const amountData = +result;
    currencyAmt.value = Number(
      (amountData * cryptoAmt).toFixed(2)
    ).toLocaleString();
  });
});

//solution
/* 
const apiUrl = 'https://api.coinbase.com/v2/prices';
const convert = function() {
     const url = `${apiUrl}/${crypto.value}-${currency.value}/spot`;
     fetch(url)
     .then(response => response.json())
     .then(data => {
         currencyAmt.value = ((Number(cryptoInput.value) * Number(data.data.amount)).toFixed(2));
     });
 }

submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    convert();
});
*/
