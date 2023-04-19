// ==UserScript==
// @name     index array
// @version  1
// @grant    none
// @require https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js
// ==/UserScript==

//Get the productarray from localstorage
const myObject = JSON.parse(localStorage.getItem('WomenProducts'));
//Create a array 
const randomIndexArrays = [];
//Set a seed
const randomSeedValuee = 'my-random-seed';

//Assign the variable a new seed to be able to generate a random sequence of numbers based on the seed
const pserng =new Math.seedrandom(randomSeedValuee);

//For each loop, a new index is added to the array. The loop runs as many times as the developer specifies that there should be indexes
for (let i = 0; i < 301; i++) {
  const randomIndexs = Math.floor(pserng() * myObject.length);
  randomIndexArrays.push(randomIndexs);
}


const indexArrays = randomIndexArrays;
const jsonIndexs =JSON.stringify(indexArrays);
//Set the array to localstorage 
localStorage.setItem('productsIndexArraysssss', jsonIndexs);