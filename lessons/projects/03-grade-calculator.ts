/**
 * ============================================================
 * PROJECT: Student Grade Calculator
 * Required Knowledge: Lessons 1-3 (Variables, Operators, Control Flow)
 * ============================================================
 * 
 * Build a grade calculator that:
 * - Converts numeric scores to letter grades
 * - Calculates GPA
 * - Determines pass/fail status
 * - Provides feedback based on performance
 * 
 * This project practices:
 * - if/else if/else statements
 * - switch statements
 * - Comparison operators
 * - Logical operators
 */

// ============================================================
// STUDENT DATA
// ============================================================

const studentName: string = "Alex Johnson";
const mathScore: number = 85;
const scienceScore: number = 92;
const englishScore: number = 78;
const historyScore: number = 88;
const artScore: number = 95;
const numberOfClasses: number = 5;

const passingScore: number = 60;

// ============================================================
// TODO: Convert Scores to Letter Grades
// ============================================================

/**
 * Grading Scale:
 * 90-100: A (4.0)
 * 80-89:  B (3.0)
 * 70-79:  C (2.0)
 * 60-69:  D (1.0)
 * 0-59:   F (0.0)
 */

// TODO: Use if/else to convert each score to a letter grade
let mathGrade: string;
let scienceGrade: string;
let englishGrade: string;
let historyGrade: string;
let artGrade: string;

if(mathScore >= 90 && mathScore <= 100){
  mathGrade = "A";
} else if (mathScore >= 80){
  mathGrade = "B" 
} else if (mathScore >= 70){
  mathGrade = "C" 
} else if (mathScore >= 60){
  mathGrade = "D" 
} else if (mathScore < 60){
  mathGrade = "F" 
} else {
  mathGrade = "Invalid Grade"
};


if(scienceScore >= 90 && scienceScore <= 100){
  scienceGrade = "A";
} else if (scienceScore >= 80){
  scienceGrade = "B" 
} else if (scienceScore >= 70){
  scienceGrade = "C" 
} else if (scienceScore >= 60){
  scienceGrade = "D" 
} else if (scienceScore < 60){
  scienceGrade = "F" 
} else {
  scienceGrade = "Invalid Grade"
};


if(englishScore >= 90 && englishScore <= 100){
  englishGrade = "A";
} else if (englishScore >= 80){
  englishGrade = "B" 
} else if (englishScore >= 70){
  englishGrade = "C" 
} else if (englishScore >= 60){
  englishGrade = "D" 
} else if (englishScore < 60){
  englishGrade = "F" 
} else {
  englishGrade = "Invalid Grade"
};

if(historyScore >= 90 && historyScore <= 100){
  historyGrade = "A";
} else if (historyScore >= 80){
  historyGrade = "B" 
} else if (historyScore >= 70){
  historyGrade = "C" 
} else if (historyScore >= 60){
  historyGrade = "D" 
} else if (historyScore < 60){
  historyGrade = "F" 
} else {
  historyGrade = "Invalid Grade"
};

if(artScore >= 90 && artScore <= 100){
  artGrade = "A";
} else if (artScore >= 80){
  artGrade = "B" 
} else if (artScore >= 70){
  artGrade = "C" 
} else if (artScore >= 60){
  artGrade = "D" 
} else if (artScore < 60){
  artGrade = "F" 
} else {
  artGrade = "Invalid Grade"
};



// TODO: Also calculate grade points for each (4.0, 3.0, etc.)
let mathPoints: number;
let sciencePoints: number;
let englishPoints: number;
let historyPoints: number;
let artPoints: number;

switch(mathGrade){
  case "A":
    mathPoints = 4.0;
    break;
  case "B":
    mathPoints = 3.0;
    break;
  case "C":
    mathPoints = 2.0;
    break;
  case "D":
    mathPoints = 1.0;
    break;
  case "F":
    mathPoints = 0.0;
    break;
  default:
    mathPoints = 0.0   
}

switch(scienceGrade){
  case "A":
    sciencePoints = 4.0;
    break;
  case "B":
    sciencePoints = 3.0;
    break;
  case "C":
    sciencePoints = 2.0;
    break;
  case "D":
    sciencePoints = 1.0;
    break;
  case "F":
    sciencePoints = 0.0;
    break;
  default:
    sciencePoints = 0.0   
}

switch(englishGrade){
  case "A":
    englishPoints= 4.0;
    break;
  case "B":
    englishPoints = 3.0;
    break;
  case "C":
    englishPoints = 2.0;
    break;
  case "D":
    englishPoints = 1.0;
    break;
  case "F":
    englishPoints = 0.0;
    break;
  default:
    englishPoints = 0.0   
}

switch(historyGrade){
  case "A":
    historyPoints = 4.0;
    break;
  case "B":
    historyPoints = 3.0;
    break;
  case "C":
    historyPoints = 2.0;
    break;
  case "D":
    historyPoints = 1.0;
    break;
  case "F":
    historyPoints = 0.0;
    break;
  default:
    historyPoints = 0.0   
}

switch(artGrade){
  case "A":
    artPoints = 4.0;
    break;
  case "B":
    artPoints = 3.0;
    break;
  case "C":
    artPoints = 2.0;
    break;
  case "D":
    artPoints = 1.0;
    break;
  case "F":
    artPoints = 0.0;
    break;
  default:
    artPoints = 0.0   
}

// ============================================================
// TODO: Calculate Averages and GPA
// ============================================================

// TODO: Calculate the average score
const averageScore: number = (mathScore + scienceScore + englishScore + historyScore + artScore)/numberOfClasses;

// TODO: Calculate GPA (average of grade points)
const gpa: number = (mathPoints + sciencePoints + englishPoints + historyPoints + artPoints)/numberOfClasses;

// TODO: Determine overall letter grade based on average
let overallGrade: string;
if(averageScore >= 90 && averageScore <= 100){
  overallGrade = "A";
} else if(averageScore >= 80) {
  overallGrade = "B";
} else if(averageScore >= 70) {
  overallGrade = "C";
} else if(averageScore >= 60) {
  overallGrade = "D";
} else {
  overallGrade = "F";
}


// ============================================================
// TODO: Pass/Fail Determination
// ============================================================

// TODO: Check if each subject is passing (>= 60)
// TODO: Count passing and failing subjects
let passingCount: number = 0;
let failingCount: number = 0;

let mathPassing: boolean;
let englishPassing: boolean;
let sciencePassing: boolean;
let historyPassing: boolean;

let artPassing: boolean;


if(mathScore >= passingScore) {
  mathPassing = true;
  passingCount++;
} 
else {
  mathPassing = false;
  failingCount++;
};

if(englishScore >= passingScore) {
  englishPassing = true;
  passingCount++;

} 
else {
  englishPassing = false;
  failingCount++;
};

if(scienceScore >= passingScore) {
  sciencePassing = true;
  passingCount++;
} 
else {
  sciencePassing = false;
  failingCount++;
};

if(historyScore >= passingScore) {
  historyPassing = true;
  passingCount++;
} 
else {
  historyPassing = false;
  failingCount++;
}


if(artScore >= passingScore) {
  artPassing = true;
  passingCount++;
} 
else {
  artPassing = false;
}






// TODO: Overall pass (all subjects passing) or fail
const overallPassing: boolean = passingCount <= 0 ? true : false;
// ============================================================
// TODO: Academic Standing (use switch)
// ============================================================

/**
 * Academic Standing based on GPA:
 * 3.5-4.0: "Dean's List"
 * 3.0-3.49: "Good Standing"
 * 2.0-2.99: "Satisfactory"
 * 1.0-1.99: "Academic Warning"
 * 0-0.99: "Academic Probation"
 */

// TODO: Determine academic standing
let academicStanding: string = "";

// ============================================================
// TODO: Performance Feedback
// ============================================================

// TODO: Find the highest and lowest scores
let highestScore: number = 0;
let lowestScore: number = 0;
let highestSubject: string = "";
let lowestSubject: string = "";

// TODO: Generate personalized feedback
let feedback: string = "";
// Examples:
// - If GPA >= 3.5: "Excellent work! Keep it up!"
// - If any failing: "Focus on improving [subject]"
// - If all passing but GPA < 3.0: "Good effort, aim higher!"

// ============================================================
// TODO: Honors Eligibility
// ============================================================

// Honors requires: GPA >= 3.5 AND no grade below B AND average >= 85
const honorsEligible: boolean = false;

// ============================================================
// DISPLAY RESULTS
// ============================================================

console.log("========================================");
console.log("STUDENT GRADE REPORT");
console.log("========================================\n");

console.log(`Student: ${studentName}`);
console.log(`Date: ${new Date().toLocaleDateString()}`);

console.log("\n--- Individual Grades ---");
console.log(`Math:    ${mathScore} (${mathGrade})`);
console.log(`Science: ${scienceScore} (${scienceGrade})`);
console.log(`English: ${englishScore} (${englishGrade})`);
console.log(`History: ${historyScore} (${historyGrade})`);
console.log(`Art:     ${artScore} (${artGrade})`);

console.log("\n--- Summary ---");
console.log(`Average Score: ${averageScore.toFixed(1)}`);
console.log(`Overall Grade: ${overallGrade}`);
console.log(`GPA: ${gpa.toFixed(2)}`);

console.log("\n--- Status ---");
console.log(`Passing Subjects: ${passingCount}/5`);
console.log(`Overall Status: ${overallPassing ? "PASSING" : "FAILING"}`);
console.log(`Academic Standing: ${academicStanding}`);
console.log(`Honors Eligible: ${honorsEligible ? "Yes" : "No"}`);

console.log("\n--- Analysis ---");
console.log(`Strongest Subject: ${highestSubject} (${highestScore})`);
console.log(`Needs Improvement: ${lowestSubject} (${lowestScore})`);

console.log("\n--- Feedback ---");
console.log(feedback);

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// Test letter grades
if (mathGrade === "B" && scienceGrade === "A" && englishGrade === "C") {
  console.log("✅ Letter grades correct");
  passed++;
} else {
  console.log(`❌ Letter grades: Math=${mathGrade}(B), Science=${scienceGrade}(A), English=${englishGrade}(C)`);
  failed++;
}

// Test average
const expectedAvg = (85 + 92 + 78 + 88 + 95) / 5;  // 87.6
if (Math.abs(averageScore - expectedAvg) < 0.1) {
  console.log("✅ Average score correct");
  passed++;
} else {
  console.log(`❌ Average: got ${averageScore}, expected ${expectedAvg}`);
  failed++;
}

// Test GPA
const expectedGPA = (3 + 4 + 2 + 3 + 4) / 5;  // 3.2
if (Math.abs(gpa - expectedGPA) < 0.1) {
  console.log("✅ GPA calculation correct");
  passed++;
} else {
  console.log(`❌ GPA: got ${gpa}, expected ${expectedGPA}`);
  failed++;
}

// Test passing count
if (passingCount === 5) {
  console.log("✅ Passing count correct");
  passed++;
} else {
  console.log(`❌ Passing count: got ${passingCount}, expected 5`);
  failed++;
}

// Test academic standing
if (academicStanding === "Good Standing") {
  console.log("✅ Academic standing correct");
  passed++;
} else {
  console.log(`❌ Standing: got "${academicStanding}", expected "Good Standing"`);
  failed++;
}

// Test highest/lowest
if (highestScore === 95 && lowestScore === 78) {
  console.log("✅ Highest/lowest scores correct");
  passed++;
} else {
  console.log(`❌ Highest=${highestScore}(95), Lowest=${lowestScore}(78)`);
  failed++;
}

// Test honors
if (honorsEligible === false) {  // GPA is 3.2, below 3.5
  console.log("✅ Honors eligibility correct");
  passed++;
} else {
  console.log(`❌ Honors should be false (GPA < 3.5)`);
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! You're ready to grade the world!");
}
