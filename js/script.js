const inputTipCustom = document.getElementById("customPercent");
const inputBill = document.getElementById("bills");
const inputPeople = document.getElementById("peoples");
const amountTip = document.getElementById("amount");
const totalTip = document.getElementById("total");
const buttonreset = document.querySelector(".result__reset");
const tipButtons = document.querySelectorAll(".tip__button");
const errors = {
   tip: document.querySelector(".tip__error"),
   bill: document.querySelector(".bill__error"),
   people: document.querySelector(".people__error")
};

let tip, bill, person;

//Check Input above zero and not empty
function checkInputValue(inputElement, errorType) {
   const value = inputElement.value;
   if (value > 0 || value === '') {
      inputElement.classList.remove(`${errorType}__input--error`);
      errors[errorType].classList.remove(`${errorType}__error--active`);
      return value;
   } else {
      inputElement.classList.add(`${errorType}__input--error`);
      errors[errorType].classList.add(`${errorType}__error--active`);
      return 0;
   }
}

//Calculate tips and add value in result display
function calculate() {
   if (tip > 0 && bill > 0 && person > 0) {
      amountTip.innerHTML = ((bill * tip / 100) / person).toFixed(2);
      totalTip.innerHTML = ((+bill + (bill * tip / 100)) / person).toFixed(2);
      buttonreset.removeAttribute('disabled');
   }
}

//reset all
function reset() {
   disableButtons();
   buttonreset.setAttribute('disabled', '');
   amountTip.innerHTML = totalTip.innerHTML = '0.00';
   inputTipCustom.value = inputBill.value = inputPeople.value = '';
   tip = bill = person = 0;
}

//disable active class for tip buttons
function disableButtons() {
   tipButtons.forEach(button => button.classList.remove("tip__button--active"));
   inputTipCustom.classList.remove('tip__custom--error');
   errors['tip'].classList.remove('tip__error--active');
}

// Get value after checkInputValue
inputBill.addEventListener("change keyup input click", function (event) {
   bill = checkInputValue(inputBill, 'bill');
   calculate();
});

// Get value after checkInputValue
inputPeople.addEventListener("change", function (event) {
   person = checkInputValue(inputPeople, 'people');
   calculate();
});

//Get value after checkInputValue
inputTipCustom.addEventListener("change", function (event) {
   disableButtons();
   tip = checkInputValue(inputTipCustom, 'tip');
   calculate()
});

buttonreset.addEventListener("click", function (event) {
   reset();
})

//Animate Tip Buttons and get tip value
document.querySelector(".tip__grid").addEventListener("click", function (event) {
   const tips = {
      '5percent': 5,
      '10percent': 10,
      '15percent': 15,
      '25percent': 25,
      '50percent': 50
   };

   disableButtons();
   inputTipCustom.value = '';

   //Check if target id equals one of the key 
   if (tips[event.target.id]) {
      tip = tips[event.target.id];
      document.getElementById(event.target.id).classList.add("tip__button--active");
   }

   calculate();
});




