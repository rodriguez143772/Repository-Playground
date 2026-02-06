/**
 * ============================================================
 * PROJECT: Number Guessing Game
 * Required Knowledge: Lessons 1-4 (Variables, Operators, Control Flow, Loops)
 * ============================================================
 * 
 * Build a number guessing game that:
 * - Generates a random target number
 * - Tracks guesses and provides hints
 * - Calculates score based on attempts
 * - Maintains game statistics
 * 
 * This project practices:
 * - Loops (for, while)
 * - Arrays for tracking history
 * - Conditionals for hints
 * - Random number generation
 */

import { number } from "zod/v4";

// ============================================================
// GAME CONFIGURATION
// ============================================================

const minNumber: number = 1;
const maxNumber: number = 100;
const maxAttempts: number = 10;

// Generate random target (this is done for you)
const targetNumber: number = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

// Simulated player guesses (in a real game, these would come from user input)
const playerGuesses: number[] = [50, 75, 60, 65, 63, 64];

// ============================================================
// TODO: Game State Tracking
// ============================================================

// TODO: Track game progress
let attemptsUsed: number = 0;
let gameWon: boolean = false;
let winningGuess: number = 0;

// TODO: Track guess history with hints
const guessHistory: string[] = [];  // Store formatted guess results

// ============================================================
// TODO: Process Each Guess
// ============================================================

/**
 * Loop through playerGuesses and for each guess:
 * 1. Increment attempts
 * 2. Compare to target
 * 3. Add to history with hint ("too low", "too high", or "correct!")
 * 4. If correct, set gameWon and break
 */
  for(let i = 0; i < playerGuesses.length; i++){
    let guess = playerGuesses[i];

    if(guess === targetNumber){
      attemptsUsed++;
      gameWon = true;
      guessHistory[i] = "correct!";
      break;
    }
    else if(guess < targetNumber){
      attemptsUsed++;
      guessHistory[i] = "too low"
    }
    else if(guess > targetNumber){
      attemptsUsed++;
      guessHistory[i] = "too high"

    }
    else {
      attemptsUsed++;
      guessHistory[i] = "Unknown"

    }

    }

// TODO: Implement the game loop


// ============================================================
// TODO: Calculate Score
// ============================================================

/**
 * Scoring system:
 * - Base score: 1000 points
 * - Deduct 100 points per attempt used
 * - Bonus: +200 if won in 3 or fewer attempts
 * - If not won: 0 points
 */

let score: number = 0;
let penalty: number = (playerGuesses.length * 100);
  
    if(gameWon == false){
      score = 0;
    } 
    if(gameWon == true){
      if(playerGuesses.length <= 3){
        score += 200;
      }
      score -= penalty;
    }



// TODO: Calculate the score based on attempts and whether game was won

// ============================================================
// TODO: Guess Analysis
// ============================================================

// TODO: Find the closest guess that wasn't correct
let closestGuess: number = 0;
let currGuess: number = Infinity;
let closestDifference: number = Infinity;

for (let i = 0; i < playerGuesses.length; i++){
  currGuess = playerGuesses[i];
  let distFromGuess: number = Math.abs(targetNumber - currGuess); 
  if(distFromGuess < closestGuess){

    closestGuess = currGuess;
    closestDifference = distFromGuess;
  
  }
}



// TODO: Count how many guesses were too low vs too high
let tooLowCount: number = 0;
let tooHighCount: number = 0;

for (let i = 0; i < playerGuesses.length; i++){
  let currGuess: number = playerGuesses[i]; 
  if(currGuess === targetNumber){
    break;
  }
  if(currGuess < targetNumber){
    tooLowCount += 1;
  }
  if(currGuess > targetNumber){
    tooHighCount += 1;
  }
}

// TODO: Calculate average guess
let averageGuess: number = NaN;
let sumOfGuess: number = 0;
let attemptsToWin: number;


if(!gameWon){
  for(let i = 0; i < playerGuesses.length; i++){
    let currGuess: number = playerGuesses[i];
    sumOfGuess += currGuess;
  }
  averageGuess = sumOfGuess / playerGuesses.length;
}

if(gameWon){

  for(let i = 0; i < playerGuesses.length; i++){
    if(playerGuesses[i] === winningGuess){
      break;
    }
  }
  for(let i = 0; i < attemptsToWin; i++){
    let currGuess: number = playerGuesses[i];
    sumOfGuess += currGuess;
  }
  averageGuess = sumOfGuess/attemptsToWin;
}


// ============================================================
// TODO: Generate Hint Messages
// ============================================================

// TODO: Create a hint based on remaining attempts
let hintMessage: string = "";
// Examples:
// - 1 attempt left: "Last chance! The number is [even/odd]"
// - 3 attempts left: "Getting close! Try between X and Y"

// ============================================================
// TODO: Performance Rating
// ============================================================

/**
 * Rating based on attempts used (if won):
 * 1-3 attempts: "🌟 Psychic!"
 * 4-5 attempts: "🎯 Sharp shooter!"
 * 6-7 attempts: "👍 Good job!"
 * 8-10 attempts: "😅 Close call!"
 * Not won: "💪 Try again!"
 */

let performanceRating: string = "";

switch(playerGuesses.length){
  case 1:
  case 2:
  case 3:  
    performanceRating = "🌟 Psychic!";
    break; 
  case 4:
  case 5: 
    performanceRating = "🎯 Sharp shooter!"
    break;
  case 6:
  case 7:
    performanceRating = "👍 Good job!"
    break;
  case 8:
  case 9:
  case 10:
    performanceRating = "😅 Close call!"
    break;
  default: 
    performanceRating = "💪 Try again!"
}

// TODO: Determine rating

// ============================================================
// DISPLAY RESULTS
// ============================================================

console.log("========================================");
console.log("NUMBER GUESSING GAME");
console.log("========================================\n");

console.log(`Range: ${minNumber} to ${maxNumber}`);
console.log(`Target Number: ${targetNumber}`);
console.log(`Max Attempts: ${maxAttempts}`);

console.log("\n--- Guess History ---");
guessHistory.forEach((entry, index) => {
  console.log(`  ${index + 1}. ${entry}`);
});

console.log("\n--- Results ---");
console.log(`Game Won: ${gameWon ? "Yes! 🎉" : "No 😢"}`);
console.log(`Attempts Used: ${attemptsUsed}/${maxAttempts}`);
console.log(`Score: ${score} points`);
console.log(`Rating: ${performanceRating}`);

console.log("\n--- Statistics ---");
console.log(`Closest Guess: ${closestGuess} (off by ${closestDifference})`);
console.log(`Too Low: ${tooLowCount} | Too High: ${tooHighCount}`);
console.log(`Average Guess: ${averageGuess.toFixed(1)}`);

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// For testing, we'll use a known target
// Since targetNumber is random, we'll test the logic with the guesses provided

// Test that guess history was populated
if (guessHistory.length > 0) {
  console.log("✅ Guess history populated");
  passed++;
} else {
  console.log("❌ Guess history is empty");
  failed++;
}

// Test that history entries contain hints
const hasHints = guessHistory.some(entry => 
  entry.includes("low") || entry.includes("high") || entry.includes("correct")
);
if (hasHints) {
  console.log("✅ History entries contain hints");
  passed++;
} else {
  console.log("❌ History entries should contain 'low', 'high', or 'correct'");
  failed++;
}

// Test attempts counting
if (attemptsUsed === guessHistory.length) {
  console.log("✅ Attempts counted correctly");
  passed++;
} else {
  console.log(`❌ Attempts: got ${attemptsUsed}, expected ${guessHistory.length}`);
  failed++;
}

// Test too low/high counting
if (tooLowCount + tooHighCount + (gameWon ? 1 : 0) === attemptsUsed) {
  console.log("✅ Too low/high counts correct");
  passed++;
} else {
  console.log("❌ Low/high counts don't add up to attempts");
  failed++;
}

// Test average calculation
const expectedAvg = playerGuesses.slice(0, attemptsUsed).reduce((a, b) => a + b, 0) / attemptsUsed;
if (attemptsUsed > 0 && Math.abs(averageGuess - expectedAvg) < 0.1) {
  console.log("✅ Average guess calculated correctly");
  passed++;
} else if (attemptsUsed === 0) {
  console.log("⚠️ No attempts to average");
  passed++;
} else {
  console.log(`❌ Average: got ${averageGuess}, expected ${expectedAvg}`);
  failed++;
}

// Test score logic
if (gameWon && score > 0) {
  console.log("✅ Score awarded for win");
  passed++;
} else if (!gameWon && score === 0) {
  console.log("✅ No score for loss (correct)");
  passed++;
} else {
  console.log(`❌ Score logic incorrect`);
  failed++;
}

// Test performance rating exists
if (performanceRating.length > 0) {
  console.log("✅ Performance rating set");
  passed++;
} else {
  console.log("❌ Performance rating is empty");
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! You're a game developer now!");
}

console.log(`Did Game Win: ${gameWon}`);
