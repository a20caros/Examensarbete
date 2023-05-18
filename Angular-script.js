// ==UserScript==
// @name     Angular-new
// @version  1
// @grant    none
// @run-at 	 document-idle
// @require  http://raw.githubusercontent.com/eligrey/FileSaver.js/master/src/FileSaver.js
// @require https://raw.githubusercontent.com/HGustavs/Random-Number-Generator/master/seededrandom.js
// ==/UserScript==

//Keeps track of which index it is on to click on the same products each time
//localStorage.setItem('indexNow', 0);
let indexNow = localStorage.getItem('indexNow') || 0;
const maximumIndex = 20000;

//If the index is greater than or equal to the maximum index, it becomes 0, so it starts over
if (indexNow >= maximumIndex) {
  indexNow = 0;
}

let addedProductsToCart = 0;
var firstClickedProduct = false;
//Is a mouseevent that simulates a click event on an html element
var clickEvent = new MouseEvent('click', {
   view: window,
   bubbles: true,
   cancelable: true
});

//A function that makes the hole process
function functionality(){

  //Set the indexNow to localstorage
  localStorage.setItem('indexNow', indexNow);
  //Get the produkts from localstorage
	const myObject = JSON.parse(localStorage.getItem('WomenProducts'));
  //Get the index array from localstorage
  const indexArray = JSON.parse(localStorage.getItem('Arrayssssssssssss'));
  
  let numberClicks = 20;
  //sets the value of the endInd variable to indexNow + as many times as you want.
  let endInd = parseInt(indexNow) + numberClicks;
  //If this value exceeds maximumIndex, the code sets endInd to maximumIndex to avoid trying to process indexes outside the range.
  if (endInd > maximumIndex) {
    endInd = maximumIndex;
  }
  
  //Loops through as many times as you want times to add products to the cart
  for (let i = parseInt(indexNow); i < endInd; i++) {
    //Extracts the index from the index array and the product it belongs to and assigns it to the element variable
    const indexProduct = indexArray[i];
    const element = myObject[indexProduct];


    //Get the produkt (elements) id
    const id = element.id;
    //Get the produkt (elements) name
    var addedProductName = element.name;

    //Check if addedproduct already is in localstorage
    if (!localStorage.getItem('addedProducts')) {
        //If not the array is created
        var addedProducts = [];
        //The added products pushes to the array
        addedProducts.push(addedProductName);
        //Set it in localstorage
        localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
    } else {
        //Get the addedproducts array
        var addedProducts = JSON.parse(localStorage.getItem('addedProducts'));
        //Push new addedproducts name 	
        addedProducts.push(addedProductName);
        //set it in localstorage
        localStorage.setItem('addedProducts', JSON.stringify(addedProducts));
    }

    //Wait sekunds and then click on the button
    setTimeout(function() {
      const goToWomenPerfume = document.querySelector('#womenPerfumeSite');
      goToWomenPerfume.click(); 
     }, 2800);

   
     setTimeout(function() {
         if (!firstClickedProduct) {
          //Take the data time now
          const startTime= Date.now();
          window.localStorage.setItem("startTime", startTime);
          // Update the variable when the first product is clicked to true
          firstClickedProduct = true; 
        }
        //Interact with the products width the same id thats comes from indexNow
        const inputElement = document.getElementById(id);
        if (addedProductsToCart <= numberClicks) {
        //Add value 1 in the input element so the product adds to the shopping cart page
        inputElement.value = 1;
        const event = new Event('input');
        inputElement.dispatchEvent(event);
        }
        addedProductsToCart++;
         //If maximum products have been added, click on the cart
        if (addedProductsToCart === numberClicks) {
          setTimeout(function() {
            //Click on the cart button to get to the shopping cart page
            const goToCart = document.querySelector('#cartButton');
            goToCart.click(); 
          }, 1000);
        } 
    }, 3000);
  }
   //Pluses on indexNow so it gets to the next index next turn
  indexNow = endInd;
  //Set the indexNow to localstorage
  localStorage.setItem('indexNow', indexNow);
}


//A function that retrieves the start and stop time from local storage and calculates the time the measurement took
function storeResultTime(){
   var startTime =window.localStorage.getItem("startTime");
   var endTime =window.localStorage.getItem("stopTime");
   var resultTime = '\n'  + (endTime - startTime);
  	//If finishtime is not in localstorage add it
		if (window.localStorage.getItem('finishTime') == null){
         window.localStorage.setItem('finishTime','[]');
     }

    // Store the delta time in localstorage for one round
    timeData = JSON.parse(window.localStorage.getItem('finishTime'));
  	//pushes the result into the array
    timeData.push(resultTime);

    window.localStorage.setItem('finishTime', JSON.stringify(timeData));
}

// a function the save the data from localstorage to a text-file
function saveDataToFile() {
    var addedProducts = JSON.parse(localStorage.getItem('addedProducts'));
   	var timeResult = JSON.parse(window.localStorage.getItem('finishTime'));
  	
    var productNameString = "";
  	//Loops through all the names of the products that are clicked on to be able to print the same products each time
    for (var i = 0; i < addedProducts.length && i < 301; i++) {
      const productName = addedProducts[i];
      productNameString += "Produkt Name: " + productName + "\n";
    }
  	//Creates the text file and its contents
    var textFile = new Blob([productNameString,'\n\n\nfinishTime:',timeResult], { type: "text/plain;charset=utf-8" });
    saveAs(textFile, "ScripttResult.txt"); 
}

// a variable that store seed
let seedStore;

// a variable that set the numbers of rounds
var rounds = 1000;
//Get the seed from localstorage
var seedCountStr = window.localStorage.getItem("seedStore");
seedStore = window.localStorage.getItem("seedStore");
var seedCounter = parseInt(seedCountStr);

Math.setSeed(seedCounter*50);
//Check if seedCounter is bigger than the number of rounds 
if(seedCounter < rounds){	
  	//increase the seedCounter variable width 1 
  	seedCounter++;
  	//Set the seedstore in localstorage
  	window.localStorage.setItem("seedStore", seedCounter);
  	//Run the function functionality to run the whole script 
  	functionality();
  	//A setTimout to wait untill the products have rendered out in cart
  	setTimeout(function() {
      	//Run the funktion StoreResultTime to calculate the finishtime
    		storeResultTime();
      	//Take the webbsite back to startpage
      	window.location.href = "http://localhost:4200";
  	}, 5000);


}else{
  //If seedCounter is not bigger than the number of rounds, the seedstore is set to 0
  window.localStorage.setItem("seedStore", 0);
}
//If seedCounter is equal with number of rounds make the textfile and save the data. 
if(seedCounter == rounds){
   saveDataToFile();
  //This lines needs to run if you want to have a emty textfile
  /*finishTime = [];
  localStorage.setItem('finishTime', JSON.stringify(finishTime)); 
   addedProducts = [];
   localStorage.setItem('addedProducts', JSON.stringify(addedProducts));*/
   
   
}