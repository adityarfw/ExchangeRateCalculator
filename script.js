const currency1 = document.getElementById("currency1");
const amount1 = document.getElementById("amount1");
const currency2 = document.getElementById("currency2");
const amount2 = document.getElementById("amount2");

const exRate = document.getElementById("exRate");
const swap = document.getElementById("swapBtn");

const year = document.getElementById("year");
const month = document.getElementById("month");
const day = document.getElementById("day");
const lookUpDate = document.getElementById("lookUpDate");
const histRate = document.getElementById("histRate");





//Fetch exchange rate and update DOM
function calculate() {
  const currencyOne = currency1.value;
  const currencyTwo = currency2.value;
  // console.log(currencyOne, currencyTwo);

  fetch(
    `https://v6.exchangerate-api.com/v6/71345f372db7a630d460318c/latest/${currencyOne}`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const rate = data.conversion_rates[currencyTwo];

      exRate.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
      amount2.value = amount1.value * rate.toFixed(2);
    });
}



function checkHistory() {
  const currOne = currency1.value;
  const currTwo = currency2.value;

  // Get the value of Year, Month and Day, Add zeros for month a day if single digit
  const checkYear = year.value;
  const checkMonth = month.value.padStart(2, '0');
  const checkDay = day.value.padStart(2, '0');

//   console.log(checkYear,checkMonth,checkDay);
//   console.log(currOne, currTwo);

  fetch(
    `https://exchange-rates.abstractapi.com/v1/historical?api_key=606511a0bdaa441eab6fda620611d738&base=${currOne}&target=${currTwo}&date=${checkYear}-${checkMonth}-${checkDay}`
  )
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const historicalRate = data.exchange_rates[currTwo];
        console.log(historicalRate);
        histRate.innerText = `The exchange rate for ${currOne}/${currTwo} on ${checkYear}-${checkMonth}-${checkDay} was $${historicalRate.toFixed(2)}`;
    }).catch((error) => {
        console.log(error);
        console.log("Found Error");
        histRate.innerText = `Enter or select an Year, Month and Date`
    });
}






//Event Listener
currency1.addEventListener("change", calculate);
amount1.addEventListener("input", calculate);
currency2.addEventListener("change", calculate);
amount2.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currency1.value;
  currency1.value = currency2.value;
  currency2.value = temp;
  calculate();
});

lookUpDate.addEventListener("click", checkHistory);

calculate();
