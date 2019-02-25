window.onload = function(){
  var operation;
  var calculator = document.getElementById("calculator");
  var buttons = calculator.querySelector("#buttons");
  buttons.addEventListener('click', function(e){
    console.log(e.target.innerHTML)
    switch (e.target.innerHTML){
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        if (display.innerHTML === "0" || display.innerHTML.includes("+") ||display.innerHTML.includes("-")||display.innerHTML.includes("*")||display.innerHTML.includes("/")){
          display.innerHTML = e.target.innerHTML;
        }
        else {
          display.innerHTML += e.target.innerHTML;}
        break;
      case "+":
        addition();
        break;
      case "-":
        subtraction();
        break;
      case "*":
        multiplication();
        break;
      case "=":
        equal();
        break;
      case "/":
        division();
        break;
      case "C":
        clearScreen();
        break;
  }
});

  window.addEventListener('keydown', function(e){
    switch (e.key){
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
      case ".":
        if (display.innerHTML === "0" || display.innerHTML.includes("+")     ||display.innerHTML.includes("-")||display.innerHTML.includes("*")||display.innerHTML.includes("/")){
          display.innerHTML = e.key;
        }
        else {
          display.innerHTML += e.key;}
        break;
      case "+":
        addition();
        break;
      case "-":
        subtraction();
        break;
      case "*":
        multiplication();
        break;
      case "/":
        division();
        break;
      case "Enter":
        equal();
        break;
      case 'Escape':
        clearScreen();
        break;
    }
  });

  function hello() {};

  //numbers
  var display = document.getElementById("display");

  //display
  var currentNumber = 0;

  //operations

  var squared = document.getElementById("squared");
  var squareroot = document.getElementById("squareroot");

  display.innerHTML = 0;

function clearScreen() {
    display.innerHTML = 0;
    currentNumber = 0;
    operation = "";
  }

  //operations
function addition() {
    currentNumber = display.innerHTML;
    display.innerHTML += "+";
    operation = "add";
  }

function subtraction() {
    currentNumber = display.innerHTML;
    display.innerHTML += "-";
    operation = "subtract";
  }

function multiplication() {
    currentNumber = display.innerHTML;
    display.innerHTML += "*";
    operation = "multiply";
  }

function division() {
    currentNumber = display.innerHTML;
    display.innerHTML += "/";
    operation = "divide";
  }

  squared.onclick = function() {
    display.innerHTML = parseFloat(display.innerHTML) * parseFloat(display.innerHTML)
    currentNumber = display.innerHTML;
  }

  squareroot.onclick = function() {
    display.innerHTML = Math.sqrt(parseFloat(display.innerHTML));
    currentNumber = display.innerHTML;
  }

function equal() {
    switch (operation) {
        case "add":
          display.innerHTML = parseFloat(currentNumber) + parseFloat(display.innerHTML);
          operation = "equal";
          break;
				case "multiply":
					display.innerHTML = parseFloat(currentNumber) * parseFloat(display.innerHTML);
          operation = "equal";
          break;
				case "subtract":
					display.innerHTML = parseFloat(currentNumber) - parseFloat(display.innerHTML);
          operation = "equal";
          break;
        case "divide":
					display.innerHTML = parseFloat(currentNumber) / parseFloat(display.innerHTML);
          operation = "equal";
          break;
        case "equal":
          break;
    }
  }

  document.buttons

}

/*

 var numberOne = document.getElementById("numberOne");
  var numberTwo = document.getElementById("numberTwo");
  var numberThree = document.getElementById("numberThree");
  var numberFour = document.getElementById("numberFour");
  var numberFive = document.getElementById("numberFive");
  var numberSix = document.getElementById("numberSix");
  var numberSeven = document.getElementById("numberSeven");
  var numberEight = document.getElementById("numberEight");
  var numberNine = document.getElementById("numberNine");
  var numberZero = document.getElementById("numberZero");
 numberOne.onclick = function(){
    if (display.innerHTML === "0" || operation != ""){
      display.innerHTML = 1;
    }
    else {
    display.innerHTML += 1;}
  }

  numberTwo.onclick = function(){
    if (display.innerHTML === "0" || operation != ""){
      display.innerHTML = 2;
    }
    else {
    display.innerHTML += 2;}
  }

  numberThree.onclick = function(){
    if (display.innerHTML === "0" || operation != ""){
      display.innerHTML = 3;
    }
    else {
    display.innerHTML += 3;}
  }

  numberFour.onclick = function(){
    if (display.innerHTML === "0" || operation != ""){
      display.innerHTML = 4;
    }
    else {
    display.innerHTML += 4;}
  }

  numberFive.onclick = function(){
    if (display.innerHTML === "0" || operation != ""){
      display.innerHTML = 5;
    }
    else {
    display.innerHTML += 5;}
  }

  numberSix.onclick = function(){
    if (display.innerHTML === "0" || operation != ""){
      display.innerHTML = 6;
    }
    else {
    display.innerHTML += 6;}
  }

  numberSeven.onclick = function(){
    if (display.innerHTML === "0" || operation != ""){
      display.innerHTML = 7;
    }
    else {
    display.innerHTML += 7;}
  }

  numberEight.onclick = function(){
    if (display.innerHTML === "0" || operation != ""){
      display.innerHTML = 8;
    }
    else {
    display.innerHTML += 8;}
  }

  numberNine.onclick = function(){
    if (display.innerHTML === "0" || operation != ""){
      display.innerHTML = 9;
    }
    else {
    display.innerHTML += 9;}
  }

  numberZero.onclick = function(){
    if (display.innerHTML === "0" || operation != ""){
      display.innerHTML = 0;
    }
    else {
    display.innerHTML += 0;}
  }



    var add = document.getElementById("add");
  var equals = document.getElementById("equal");
	var multiply = document.getElementById("multiply");
	var divide = document.getElementById("divide");
	var subtract = document.getElementById("subtract");

  */
