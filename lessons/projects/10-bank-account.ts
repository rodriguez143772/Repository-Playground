/**
 * ============================================================
 * PROJECT: Bank Account System
 * Required Knowledge: Lessons 1-10 (+ Classes)
 * ============================================================
 * 
 * Build a banking system with:
 * - Multiple account types (checking, savings, investment)
 * - Transactions with proper tracking
 * - Interest calculations
 * - Inheritance and polymorphism
 * 
 * This project practices:
 * - Class definitions
 * - Inheritance (extends)
 * - Access modifiers (public, private, protected)
 * - Abstract classes
 * - Static members
 * - Getters and setters
 */

// ============================================================
// TODO: Transaction Class
// ============================================================

/**
 * Transaction types: "deposit", "withdrawal", "transfer", "interest", "fee"
 */
type TransactionType = "deposit" | "withdrawal" | "transfer" | "interest" | "fee";

class Transaction {
  private static nextId = 1;
  
  public readonly id: number;
  public readonly timestamp: Date;
  
  // TODO: Implement constructor and properties
  constructor(
    public readonly type: TransactionType,
    public readonly amount: number,
    public readonly description: string,
    public readonly balanceAfter: number
  ) {
    this.id = Transaction.nextId++;
    this.timestamp = new Date();
  }
  
  /**
   * Format transaction for display.
   */
  toString(): string {
    // TODO: Return formatted string like "+$100.00 DEPOSIT - Paycheck"
    return "";
  }
}

// ============================================================
// TODO: Abstract Account Base Class
// ============================================================

abstract class Account {
  private static nextAccountNumber = 1000;
  
  public readonly accountNumber: string;
  protected _balance: number = 0;
  protected transactions: Transaction[] = [];
  protected readonly createdAt: Date = new Date();
  
  constructor(
    public readonly ownerName: string,
    public readonly accountType: string,
    initialDeposit: number = 0
  ) {
    this.accountNumber = `ACC-${Account.nextAccountNumber++}`;
    if (initialDeposit > 0) {
      this.deposit(initialDeposit, "Initial deposit");
    }
  }
  
  // TODO: Implement balance getter
  get balance(): number {
    return 0;
  }
  
  /**
   * Deposit funds into account.
   */
  deposit(amount: number, description: string = "Deposit"): boolean {
    // TODO: Validate amount, update balance, record transaction
    return false;
  }
  
  /**
   * Withdraw funds from account.
   */
  withdraw(amount: number, description: string = "Withdrawal"): boolean {
    // TODO: Validate amount and sufficient funds, update balance, record transaction
    return false;
  }
  
  /**
   * Get transaction history.
   */
  getTransactions(): Transaction[] {
    // TODO: Return copy of transactions array
    return [];
  }
  
  /**
   * Get account summary.
   */
  getSummary(): string {
    // TODO: Return formatted account summary
    return "";
  }
  
  // Abstract method - each account type implements differently
  abstract applyMonthlyFees(): void;
  abstract calculateInterest(): number;
}

// ============================================================
// TODO: Checking Account Class
// ============================================================

class CheckingAccount extends Account {
  private static MONTHLY_FEE = 5.00;
  private static MIN_BALANCE_NO_FEE = 500;
  private static OVERDRAFT_FEE = 35.00;
  private overdraftProtection: boolean = false;
  
  constructor(ownerName: string, initialDeposit: number = 0) {
    super(ownerName, "Checking", initialDeposit);
  }
  
  /**
   * Enable/disable overdraft protection.
   */
  setOverdraftProtection(enabled: boolean): void {
    // TODO: Set overdraft protection
  }
  
  /**
   * Override withdraw to handle overdraft.
   */
  override withdraw(amount: number, description: string = "Withdrawal"): boolean {
    // TODO: Implement with overdraft handling
    return false;
  }
  
  /**
   * Apply monthly fees (waived if balance >= MIN_BALANCE_NO_FEE).
   */
  applyMonthlyFees(): void {
    // TODO: Apply monthly fee if balance is below minimum
  }
  
  /**
   * Checking accounts don't earn interest.
   */
  calculateInterest(): number {
    return 0;
  }
}

// ============================================================
// TODO: Savings Account Class
// ============================================================

class SavingsAccount extends Account {
  private static ANNUAL_INTEREST_RATE = 0.02;  // 2%
  private static MAX_WITHDRAWALS_PER_MONTH = 6;
  private static EXCESS_WITHDRAWAL_FEE = 10.00;
  private withdrawalsThisMonth: number = 0;
  
  constructor(ownerName: string, initialDeposit: number = 0) {
    super(ownerName, "Savings", initialDeposit);
  }
  
  /**
   * Override withdraw to limit withdrawals.
   */
  override withdraw(amount: number, description: string = "Withdrawal"): boolean {
    // TODO: Implement with withdrawal limit
    return false;
  }
  
  /**
   * Reset monthly withdrawal count.
   */
  resetMonthlyLimit(): void {
    // TODO: Reset withdrawalsThisMonth
  }
  
  /**
   * Savings accounts don't have monthly fees.
   */
  applyMonthlyFees(): void {
    // No fees for savings
  }
  
  /**
   * Calculate monthly interest.
   */
  calculateInterest(): number {
    // TODO: Return monthly interest amount
    return 0;
  }
  
  /**
   * Apply interest to account.
   */
  applyInterest(): void {
    // TODO: Calculate and add interest as deposit
  }
}

// ============================================================
// TODO: Investment Account Class
// ============================================================

class InvestmentAccount extends Account {
  private static MANAGEMENT_FEE_RATE = 0.0025;  // 0.25% quarterly
  
  constructor(
    ownerName: string,
    initialDeposit: number = 0,
    private riskLevel: "low" | "medium" | "high" = "medium"
  ) {
    super(ownerName, "Investment", initialDeposit);
  }
  
  /**
   * Simulate market returns based on risk level.
   */
  simulateMarketReturn(): number {
    // TODO: Generate random return based on risk level
    // Low: -2% to +4%, Medium: -5% to +8%, High: -10% to +15%
    return 0;
  }
  
  /**
   * Apply quarterly management fee.
   */
  applyMonthlyFees(): void {
    // TODO: Apply management fee
  }
  
  /**
   * Calculate expected annual return (for display).
   */
  calculateInterest(): number {
    // TODO: Return expected return based on risk level
    return 0;
  }
  
  /**
   * Rebalance portfolio (change risk level).
   */
  rebalance(newRiskLevel: "low" | "medium" | "high"): void {
    // TODO: Update risk level
  }
}

// ============================================================
// TODO: Bank Class (Managing Multiple Accounts)
// ============================================================

class Bank {
  private accounts: Map<string, Account> = new Map();
  
  constructor(public readonly bankName: string) {}
  
  /**
   * Open a new account.
   */
  openAccount(account: Account): string {
    // TODO: Add account to bank, return account number
    return "";
  }
  
  /**
   * Get account by number.
   */
  getAccount(accountNumber: string): Account | undefined {
    // TODO: Return account
    return undefined;
  }
  
  /**
   * Transfer between accounts.
   */
  transfer(
    fromAccountNumber: string,
    toAccountNumber: string,
    amount: number
  ): boolean {
    // TODO: Withdraw from source, deposit to destination
    return false;
  }
  
  /**
   * Get all accounts for an owner.
   */
  getAccountsByOwner(ownerName: string): Account[] {
    // TODO: Return all accounts belonging to owner
    return [];
  }
  
  /**
   * Apply monthly processing to all accounts.
   */
  runMonthlyProcessing(): void {
    // TODO: Apply fees and interest to all accounts
  }
  
  /**
   * Get bank statistics.
   */
  getStats(): {
    totalAccounts: number;
    totalDeposits: number;
    accountsByType: Record<string, number>;
  } {
    // TODO: Calculate statistics
    return {
      totalAccounts: 0,
      totalDeposits: 0,
      accountsByType: {}
    };
  }
}

// ============================================================
// DEMO AND DISPLAY
// ============================================================

console.log("========================================");
console.log("BANK ACCOUNT SYSTEM");
console.log("========================================\n");

const bank = new Bank("TypeScript National Bank");

// Create accounts
const checking = new CheckingAccount("Alice Johnson", 1000);
const savings = new SavingsAccount("Alice Johnson", 5000);
const investment = new InvestmentAccount("Bob Smith", 10000, "medium");

bank.openAccount(checking);
bank.openAccount(savings);
bank.openAccount(investment);

console.log("--- Accounts Created ---");
console.log(checking.getSummary());
console.log(savings.getSummary());
console.log(investment.getSummary());

console.log("\n--- Transactions ---");
checking.deposit(500, "Paycheck");
checking.withdraw(200, "Groceries");
savings.deposit(1000, "Bonus");
savings.applyInterest();

console.log("Checking transactions:");
checking.getTransactions().forEach(t => console.log(`  ${t.toString()}`));

console.log("\n--- Transfer ---");
const transferSuccess = bank.transfer(checking.accountNumber, savings.accountNumber, 100);
console.log(`Transfer $100: ${transferSuccess ? "Success" : "Failed"}`);

console.log("\n--- Monthly Processing ---");
bank.runMonthlyProcessing();

console.log("\n--- Final Balances ---");
console.log(`Checking: $${checking.balance.toFixed(2)}`);
console.log(`Savings: $${savings.balance.toFixed(2)}`);
console.log(`Investment: $${investment.balance.toFixed(2)}`);

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// Test Account creation
const testAccount = new CheckingAccount("Test User", 100);
if (testAccount.balance === 100 && testAccount.accountNumber.startsWith("ACC-")) {
  console.log("✅ Account creation works");
  passed++;
} else {
  console.log("❌ Account creation failed");
  failed++;
}

// Test deposit
const beforeDeposit = testAccount.balance;
testAccount.deposit(50, "Test deposit");
if (testAccount.balance === beforeDeposit + 50) {
  console.log("✅ Deposit works");
  passed++;
} else {
  console.log("❌ Deposit failed");
  failed++;
}

// Test withdrawal
const beforeWithdraw = testAccount.balance;
testAccount.withdraw(30, "Test withdrawal");
if (testAccount.balance === beforeWithdraw - 30) {
  console.log("✅ Withdrawal works");
  passed++;
} else {
  console.log("❌ Withdrawal failed");
  failed++;
}

// Test insufficient funds
const balanceBeforeBadWithdraw = testAccount.balance;
const badWithdraw = testAccount.withdraw(10000, "Too much");
if (!badWithdraw && testAccount.balance === balanceBeforeBadWithdraw) {
  console.log("✅ Insufficient funds handled");
  passed++;
} else {
  console.log("❌ Insufficient funds not handled");
  failed++;
}

// Test transaction history
const history = testAccount.getTransactions();
if (history.length >= 2) {
  console.log("✅ Transaction history works");
  passed++;
} else {
  console.log("❌ Transaction history missing entries");
  failed++;
}

// Test savings interest
const testSavings = new SavingsAccount("Test", 1000);
const interest = testSavings.calculateInterest();
if (interest > 0) {
  console.log("✅ Interest calculation works");
  passed++;
} else {
  console.log("❌ Interest calculation failed");
  failed++;
}

// Test bank transfer
const bankTest = new Bank("Test Bank");
const acc1 = new CheckingAccount("A", 500);
const acc2 = new CheckingAccount("B", 100);
bankTest.openAccount(acc1);
bankTest.openAccount(acc2);
const transferResult = bankTest.transfer(acc1.accountNumber, acc2.accountNumber, 200);
if (transferResult && acc1.balance === 300 && acc2.balance === 300) {
  console.log("✅ Bank transfer works");
  passed++;
} else {
  console.log("❌ Bank transfer failed");
  failed++;
}

// Test bank stats
const stats = bankTest.getStats();
if (stats.totalAccounts === 2) {
  console.log("✅ Bank stats work");
  passed++;
} else {
  console.log("❌ Bank stats failed");
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! You're ready for fintech!");
}
