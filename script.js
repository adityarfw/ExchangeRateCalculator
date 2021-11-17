const currency1 = document.getElementById('currency1');
const amount1 = document.getElementById('amount1');
const currency2 = document.getElementById('currency2');
const amount2 = document.getElementById('amount2');

const exRate = document.getElementById('exRate');
const swap = document.getElementById('swapBtn');


//Fetch exchange rate and update DOM
function calculate(){
    const currencyOne = currency1.value;
    const currencyTwo = currency2.value;

    if(currency1 < 0 || currency2 < 0){
        
    } else{
   // console.log(currencyOne, currencyTwo);

    fetch(`https://v6.exchangerate-api.com/v6/71345f372db7a630d460318c/latest/${currencyOne}`)
        .then(res => res.json())
        .then(data => {
        console.log(data);
        const rate = data.conversion_rates[currencyTwo];
        
        exRate.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;
        amount2.value = amount1.value * rate.toFixed(2); 
    });
    }
}

//Event Listener
currency1.addEventListener('change', calculate);
amount1.addEventListener('input', calculate);
currency2.addEventListener('change', calculate);
amount2.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currency1.value;
    currency1.value = currency2.value;
    currency2.value = temp;
    calculate();
});

calculate();


