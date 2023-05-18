// ==UserScript==
// @name     index array new test
// @version  1
// @grant    none
// @require https://cdnjs.cloudflare.com/ajax/libs/seedrandom/3.0.5/seedrandom.min.js
// ==/UserScript==

function shuffle(indexArray, minDist) {
  //Creates a copy of the indexArray using the spread operator ([...array]).                                
  const shuffleResult = [...indexArray];
  const len = shuffleResult.length;
  //Traverses the array from the back and randomly selects an index (j) from the current index (i) upwards. Then it shuffles the elements
  for (let i = len - 1; i > 0; i--) {
    const j = Math.floor(pserng() * (i + 1));
    // Byt plats på elementen
    [shuffleResult[i], shuffleResult[j]] = [shuffleResult[j], shuffleResult[i]];
    //After each move of the elements, it checks if the new index is far enough away from the previous index
    if (i > minDist && Math.abs(j - i) < minDist) {
      //If it is not, it calculates a new index
      const k = i - minDist;
      //swaps the current index and the new index
      [shuffleResult[i], shuffleResult[k]] = [shuffleResult[k], shuffleResult[i]];
    }
  }
  //returns the new randomly reordered array of indices with no two indices closer than minDist.
  return shuffleResult;
}

//Get the productarray from localstorage
const myObject = JSON.parse(localStorage.getItem('WomenProducts'));

//Set a seed
const randomSeedValue = 'my-random-seed';

//Assign the variable a new seed to be able to generate a random sequence of numbers based on the seed
const pserng = new Math.seedrandom(randomSeedValue);

//Create a array 
const indexArray = [];

//The smallest distance to the same index
const minDist = 20;

//For each loop, a new index is added to the array. The loop runs as many times as the developer specifies that there should be indexes
for (let i = 0; i < 20000; i++) {
  const randomIndex = Math.floor(pserng() * myObject.length);
  indexArray.push(randomIndex);
}

//Calling the function shuffle with indexArrays as an argument to randomly order the elements in the array
const shuffleIndexes = shuffle(indexArray, minDist);
//The shuffleIndexes are converted to a JSON string using JSON.stringify and saved in the jsonIndex variable.
const jsonIndex = JSON.stringify(shuffleIndexes);

//Set the array to localstorage 
localStorage.setItem('Arrays', jsonIndex);