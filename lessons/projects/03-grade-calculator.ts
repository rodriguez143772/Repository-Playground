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
let mathGrade: string = "";
let scienceGrade: string = "";
let englishGrade: string = "";
let historyGrade: string = "";
let artGrade: string = "";

// TODO: Also calculate grade points for each (4.0, 3.0, etc.)
let mathPoints: number = 0;
let sciencePoints: number = 0;
let englishPoints: number = 0;
let historyPoints: number = 0;
let artPoints: number = 0;

// ============================================================
// TODO: Calculate Averages and GPA
// ============================================================

// TODO: Calculate the average score
const averageScore: number = 0;

// TODO: Calculate GPA (average of grade points)
const gpa: number = 0;

// TODO: Determine overall letter grade based on average
let overallGrade: string = "";

// ============================================================
// TODO: Pass/Fail Determination
// ============================================================

// TODO: Check if each subject is passing (>= 60)
const mathPassing: boolean = false;
const sciencePassing: boolean = false;
const englishPassing: boolean = false;
const historyPassing: boolean = false;
const artPassing: boolean = false;

// TODO: Count passing and failing subjects
let passingCount: number = 0;
let failingCount: number = 0;

// TODO: Overall pass (all subjects passing) or fail
const overallPassing: boolean = false;

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
