window.onload = function(){
  
  var calculator = document.getElementById("calculator");
  var buttons = calculator.querySelector("#buttons");
  buttons.addEventListener('click', function(e){
    console.log(e);
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
        if (display.innerHTML === "0" || display.innerHTML.includes("+") ||display.innerHTML.includes("-")||display.innerHTML.includes("*")||display.innerHTML.includes("/")){
          display.innerHTML = e.target.innerHTML;
        }
        else {
          display.innerHTML += e.target.innerHTML;}
        };
    });
  
  function hello() {};
  
  //numbers
  var display = document.getElementById("display");
 
  var decimal = document.getElementById("decimal");
  
  //display
  var clear = document.getElementById("clear");
  var currentNumber = 0;
  
  //operations
  var add = document.getElementById("add");
  var equals = document.getElementById("equal");
	var multiply = document.getElementById("multiply");
	var divide = document.getElementById("divide");
	var subtract = document.getElementById("subtract");
  var squared = document.getElementById("squared");
  var squareroot = document.getElementById("squareroot");
  var operation = "";
  
  display.innerHTML = 0;
  
  
  
  clear.onclick = function() {
    display.innerHTML = 0;
    currentNumber = 0;
    operation = "";
  }

  decimal.onclick = function(){
    display.innerHTML += ".";
  }
  
  
  //operations
  add.onclick = function() {
    currentNumber = display.innerHTML;
    display.innerHTML += "+";
    operation = "add";
  }
  
	subtract.onclick = function() {
    currentNumber = display.innerHTML;
    display.innerHTML += "-";
    operation = "subtract";
  }
	
	multiply.onclick = function() {
    currentNumber = display.innerHTML;
    display.innerHTML += "*";
    operation = "multiply";
  }
	
	divide.onclick = function() {
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
    currentNumber = display.HTML;
  }
	
  equals.onclick = function() {
    switch (operation) {
        case "add": 
          display.innerHTML = parseFloat(currentNumber) + parseFloat(display.innerHTML);
          currentNumber = display.innerHTML;
          break;
				case "multiply":
					display.innerHTML = parseFloat(currentNumber) * parseFloat(display.innerHTML);
          currentNumber = display.innerHTML;
          break;
				case "subtract":
					display.innerHTML = parseFloat(currentNumber) - parseFloat(display.innerHTML);
          currentNumber = display.innerHTML;
          break;
        case "divide":
					display.innerHTML = parseFloat(currentNumber) / parseFloat(display.innerHTML);
          currentNumber = display.innerHTML;
          break;
    }
  }
    
    
    
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
  
  
  */