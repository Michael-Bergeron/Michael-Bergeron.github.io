window.onload = function(){
//weight conversions
  var weightInput = document.querySelector('.inputUser');
  var weightOutput = document.querySelector('.weightOutput');
  var weightButton = document.querySelector('.weightButton');
  var inputUnit = document.querySelector('.inputUnit');
  var outputUnit = document.querySelector('.outputUnit');

  weightButton.addEventListener('click', function(e){
    if (inputUnit.value === outputUnit.value){
      weightOutput.innerHTML = (weightInput.value + " " +inputUnit.value);
    }

    weightOutput.classList.toggle('animate');
    switch (inputUnit.value){
      case "Pounds":
        switch (outputUnit.value){
          case "Kilograms":
            weightOutput.innerHTML = ((weightInput.value) / 2.2046).toFixed(5) + " kg";
            break;
          case "Grams":
            weightOutput.innerHTML = ((weightInput.value) / .0022046).toFixed(2) + " mg";
            break;
          case "Ounces":
            weightOutput.innerHTML = ((weightInput.value) * 16).toFixed(2) + " oz";
            break;

        }
        break;
      case "Kilograms":
        switch (outputUnit.value){
          case "Pounds":
            weightOutput.innerHTML = ((weightInput.value) * 2.2046).toFixed(5) + " lb";
            break;
          case "Grams":
            weightOutput.innerHTML = ((weightInput.value) * 1000).toFixed(2) + " mg";
            break;
          case "Ounces":
            weightOutput.innerHTML = ((weightInput.value) * 35.274).toFixed(4) + " oz";
            break;
      }
      break;
      case "Grams":
        switch (outputUnit.value){
          case "Kilograms":
            weightOutput.innerHTML = ((weightInput.value) /1000).toFixed(5) + " kg";
            break;
          case "Pounds":
            weightOutput.innerHTML = ((weightInput.value) /453592.37).toFixed(5) + " lb";
            break;
          case "Ounces":
            weightOutput.innerHTML = ((weightInput.value) /28349.523).toFixed(5) + " oz";
            break;
      }
      break;
      case "Ounces":
        switch (outputUnit.value){
          case "Kilograms":
            weightOutput.innerHTML = ((weightInput.value) /35.274).toFixed(5) + " kg";
            break;
          case "Grams":
            weightOutput.innerHTML = ((weightInput.value) *28.35).toFixed(2) + " kg";
            break;
          case "Pounds":
            weightOutput.innerHTML = ((weightInput.value) *16).toFixed(2) + " kg";
            break;
      }
      break;
    }

  })

//length conversions

var distanceInput = document.querySelector('.distanceInputUser');
var distanceOutput = document.querySelector('.distanceOutput');
var distanceButton = document.querySelector('.distanceButton');
var distanceInputUnit = document.querySelector('.distanceInputUnit');
var distanceOutputUnit = document.querySelector('.distanceOutputUnit');


distanceButton.addEventListener('click', function(e){
  if (distanceInputUnit.value === distanceOutputUnit.value){
    distanceOutput.innerHTML = (distanceInput.value+ " " +distanceInputUnit.value);
  }

  distanceOutput.classList.toggle('animate');
  switch (distanceInputUnit.value){
    case "Inches":
      switch (distanceOutputUnit.value){
        case "Feet":
          distanceOutput.innerHTML = ((distanceInput.value) / 12).toFixed(5) + " ft";
          break;
        case "Miles":
          distanceOutput.innerHTML = ((distanceInput.value) / 63360).toFixed(5) + " mi";
          break;
        case "Meters":
          distanceOutput.innerHTML = ((distanceInput.value) / 39.37).toFixed(4) + " m";
          break;
        case "Centimeters":
          distanceOutput.innerHTML = ((distanceInput.value) * 2.54).toFixed(2) + " cm";
          break;
        case "Kilometers":
          distanceOutput.innerHTML = ((distanceInput.value) /39370.079).toFixed(5) + " km";
          break;
      }
      break;
    case "Feet":
      switch (distanceOutputUnit.value){
        case "Inches":
          distanceOutput.innerHTML = ((distanceInput.value) * 12).toFixed(3) + " in";
          break;
        case "Miles":
          distanceOutput.innerHTML = ((distanceInput.value) / 5280).toFixed(5) + " mi";
          break;
        case "Meters":
          distanceOutput.innerHTML = ((distanceInput.value) / 3.281).toFixed(2) + " m";
          break;
        case "Centimeters":
          distanceOutput.innerHTML = ((distanceInput.value) * 30.48).toFixed(2) + " cm";
          break;
        case "Kilometers":
          distanceOutput.innerHTML = ((distanceInput.value) /3280.84).toFixed(5) + " km";
          break;
    }
    break;
    case "Miles":
      switch (distanceOutputUnit.value){
        case "Inches":
          distanceOutput.innerHTML = ((distanceInput.value) *63360).toFixed(1) + " in";
          break;
        case "Feet":
          distanceOutput.innerHTML = ((distanceInput.value) *5280).toFixed(5) + " ft";
          break;
        case "Meters":
          distanceOutput.innerHTML = ((distanceInput.value) *1609.344).toFixed(1) + " m";
          break;
        case "Centimeters":
          distanceOutput.innerHTML = ((distanceInput.value) /160934.4).toFixed(5) + " cm";
          break;
        case "Kilometers":
          distanceOutput.innerHTML = ((distanceInput.value) * 1.609344).toFixed(2) + " km";
          break;
    }
    break;
    case "Meters":
      switch (distanceOutputUnit.value){
        case "Inches":
          distanceOutput.innerHTML = ((distanceInput.value) *39.37).toFixed(2) + " in";
          break;
        case "Feet":
          distanceOutput.innerHTML = ((distanceInput.value) *3.281).toFixed(2) + " ft";
          break;
        case "Miles":
          distanceOutput.innerHTML = ((distanceInput.value) *1609.344).toFixed(1) + " mi";
          break;
        case "Centimeters":
          distanceOutput.innerHTML = ((distanceInput.value) * 100).toFixed(1) + " cm";
          break;
        case "Kilometers":
          distanceOutput.innerHTML = ((distanceInput.value) /1000).toFixed(5) + " km";
          break;
    }
    break;
    case "Centimeters":
      switch (distanceOutputUnit.value){
        case "Inches":
          distanceOutput.innerHTML = ((distanceInput.value) /2.54).toFixed(3) + " in";
          break;
        case "Feet":
          distanceOutput.innerHTML = ((distanceInput.value) /30.48).toFixed(4) + " ft";
          break;
        case "Miles":
          distanceOutput.innerHTML = ((distanceInput.value) /160934.4).toFixed(6) + " mi";
          break;
        case "Meters":
          distanceOutput.innerHTML = ((distanceInput.value) / 100).toFixed(2) + " m";
          break;
        case "Kilometers":
          distanceOutput.innerHTML = ((distanceInput.value) / 100000).toFixed(6) + " km";
          break;
    }
    break;
    case "Kilometers":
      switch (distanceOutputUnit.value){
        case "Inches":
          distanceOutput.innerHTML = ((distanceInput.value) *39370.079).toFixed(1) + " in";
          break;
        case "Feet":
          distanceOutput.innerHTML = ((distanceInput.value) *3280.84).toFixed(2) + " ft";
          break;
        case "Miles":
          distanceOutput.innerHTML = ((distanceInput.value) /1.609).toFixed(3) + " mi";
          break;
        case "Centimeters":
          distanceOutput.innerHTML = ((distanceInput.value) / 100000).toFixed(6) + " cm";
          break;
        case "Meters":
          distanceOutput.innerHTML = ((distanceInput.value) /1000).toFixed(4) + " m";
          break;
    }
    break;
  }

})



}
