/**
 * ============================================================
 * PROJECT: Contact Book
 * Required Knowledge: Lessons 1-7 (+ Objects)
 * ============================================================
 * 
 * Build a contact management system that:
 * - Stores contacts with multiple properties
 * - Supports groups and tags
 * - Provides search and filtering
 * - Imports/exports contact data
 * 
 * This project practices:
 * - Object creation and manipulation
 * - Object destructuring
 * - Nested objects
 * - Object methods
 */

// ============================================================
// CONTACT DATA STRUCTURE
// ============================================================

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  birthday?: Date;
  groups: string[];
  tags: string[];
  notes?: string;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
};

// ============================================================
// INITIAL DATA
// ============================================================

let contacts: Contact[] = [
  {
    id: 1,
    firstName: "Alice",
    lastName: "Johnson",
    email: "alice@example.com",
    phone: "555-0101",
    address: { street: "123 Main St", city: "New York", state: "NY", zip: "10001", country: "USA" },
    groups: ["Family", "Work"],
    tags: ["developer", "friend"],
    favorite: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01")
  },
  {
    id: 2,
    firstName: "Bob",
    lastName: "Smith",
    email: "bob@example.com",
    phone: "555-0102",
    groups: ["Work"],
    tags: ["manager"],
    favorite: false,
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02")
  },
  {
    id: 3,
    firstName: "Carol",
    lastName: "Williams",
    email: "carol@example.com",
    birthday: new Date("1990-06-15"),
    groups: ["Friends"],
    tags: ["college"],
    favorite: true,
    createdAt: new Date("2024-01-03"),
    updatedAt: new Date("2024-01-03")
  }
];

let nextId = 4;

// ============================================================
// TODO: Contact CRUD Operations
// ============================================================

/**
 * Create a new contact with required and optional fields.
 */
function createContact(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  address?: Contact["address"];
  birthday?: Date;
  groups?: string[];
  tags?: string[];
  notes?: string;
  favorite?: boolean;
}): Contact {
  // TODO: Create contact with defaults for missing optional fields
  return {} as Contact;
}

/**
 * Get full name of a contact.
 */
function getFullName(contact: Contact): string {
  // TODO: Return "FirstName LastName"
  return "";
}

/**
 * Update contact with partial data.
 */
function updateContact(id: number, updates: Partial<Omit<Contact, "id" | "createdAt">>): Contact | undefined {
  // TODO: Find contact, apply updates, set updatedAt
  return undefined;
}

/**
 * Delete a contact.
 */
function deleteContact(id: number): boolean {
  // TODO: Remove contact, return success
  return false;
}

// ============================================================
// TODO: Search and Filter
// ============================================================

/**
 * Search contacts by name or email.
 */
function searchContacts(query: string): Contact[] {
  // TODO: Case-insensitive search in firstName, lastName, email
  return [];
}

/**
 * Get contacts in a specific group.
 */
function getContactsByGroup(group: string): Contact[] {
  // TODO: Return contacts that belong to the group
  return [];
}

/**
 * Get contacts with a specific tag.
 */
function getContactsByTag(tag: string): Contact[] {
  // TODO: Return contacts with the tag
  return [];
}

/**
 * Get favorite contacts.
 */
function getFavorites(): Contact[] {
  // TODO: Return contacts where favorite is true
  return [];
}

/**
 * Get contacts with upcoming birthdays (next 30 days).
 */
function getUpcomingBirthdays(): Contact[] {
  // TODO: Return contacts with birthdays in the next 30 days
  // (Consider month and day, ignoring year)
  return [];
}

// ============================================================
// TODO: Group and Tag Management
// ============================================================

/**
 * Add contact to a group.
 */
function addToGroup(contactId: number, group: string): boolean {
  // TODO: Add group to contact's groups array (avoid duplicates)
  return false;
}

/**
 * Remove contact from a group.
 */
function removeFromGroup(contactId: number, group: string): boolean {
  // TODO: Remove group from contact's groups array
  return false;
}

/**
 * Get all unique groups across all contacts.
 */
function getAllGroups(): string[] {
  // TODO: Return unique list of all groups
  return [];
}

/**
 * Get all unique tags across all contacts.
 */
function getAllTags(): string[] {
  // TODO: Return unique list of all tags
  return [];
}

// ============================================================
// TODO: Contact Analytics
// ============================================================

/**
 * Get contact statistics.
 */
function getContactStats(): {
  total: number;
  withPhone: number;
  withAddress: number;
  withBirthday: number;
  favorites: number;
  groupCounts: Record<string, number>;
  tagCounts: Record<string, number>;
} {
  // TODO: Calculate all statistics
  return {
    total: 0,
    withPhone: 0,
    withAddress: 0,
    withBirthday: 0,
    favorites: 0,
    groupCounts: {},
    tagCounts: {}
  };
}

// ============================================================
// TODO: Import/Export
// ============================================================

/**
 * Export contacts to JSON string.
 */
function exportContacts(): string {
  // TODO: Return JSON string of all contacts
  return "";
}

/**
 * Import contacts from JSON string.
 */
function importContacts(jsonString: string): number {
  // TODO: Parse JSON and add contacts, return count added
  return 0;
}

/**
 * Export contacts to CSV format.
 */
function exportToCSV(): string {
  // TODO: Return CSV string (firstName,lastName,email,phone)
  return "";
}

// ============================================================
// TODO: Address Formatting
// ============================================================

/**
 * Format address as a single string.
 */
function formatAddress(address: Contact["address"]): string {
  // TODO: Return formatted address like "123 Main St, New York, NY 10001, USA"
  return "";
}

/**
 * Get contacts in a specific city.
 */
function getContactsByCity(city: string): Contact[] {
  // TODO: Return contacts with addresses in the given city
  return [];
}

// ============================================================
// DEMO AND DISPLAY
// ============================================================

console.log("========================================");
console.log("CONTACT BOOK");
console.log("========================================\n");

console.log("--- All Contacts ---");
contacts.forEach(contact => {
  const star = contact.favorite ? "⭐ " : "";
  console.log(`${star}${getFullName(contact)} <${contact.email}>`);
  console.log(`   Groups: [${contact.groups.join(", ")}]`);
});

console.log("\n--- Create New Contact ---");
const newContact = createContact({
  firstName: "David",
  lastName: "Brown",
  email: "david@example.com",
  phone: "555-0104",
  groups: ["Work"],
  tags: ["new"]
});
contacts.push(newContact);
console.log(`Added: ${getFullName(newContact)}`);

console.log("\n--- Statistics ---");
const stats = getContactStats();
console.log(`Total contacts: ${stats.total}`);
console.log(`With phone: ${stats.withPhone}`);
console.log(`Favorites: ${stats.favorites}`);
console.log(`Groups: ${Object.entries(stats.groupCounts).map(([g, c]) => `${g}(${c})`).join(", ")}`);

console.log("\n--- Search 'alice' ---");
searchContacts("alice").forEach(c => console.log(`  Found: ${getFullName(c)}`));

console.log("\n--- Favorites ---");
getFavorites().forEach(c => console.log(`  ⭐ ${getFullName(c)}`));

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// Test createContact
const created = createContact({ firstName: "Test", lastName: "User", email: "test@test.com" });
if (created.firstName === "Test" && created.groups && created.tags && created.createdAt) {
  console.log("✅ createContact works");
  passed++;
} else {
  console.log("❌ createContact missing required fields");
  failed++;
}

// Test getFullName
if (getFullName(contacts[0]) === "Alice Johnson") {
  console.log("✅ getFullName works");
  passed++;
} else {
  console.log("❌ getFullName failed");
  failed++;
}

// Test searchContacts
const searchResults = searchContacts("alice");
if (searchResults.length === 1 && searchResults[0].firstName === "Alice") {
  console.log("✅ searchContacts works");
  passed++;
} else {
  console.log("❌ searchContacts failed");
  failed++;
}

// Test getContactsByGroup
const workContacts = getContactsByGroup("Work");
if (workContacts.length >= 1 && workContacts.every(c => c.groups.includes("Work"))) {
  console.log("✅ getContactsByGroup works");
  passed++;
} else {
  console.log("❌ getContactsByGroup failed");
  failed++;
}

// Test getFavorites
const favorites = getFavorites();
if (favorites.every(c => c.favorite === true)) {
  console.log("✅ getFavorites works");
  passed++;
} else {
  console.log("❌ getFavorites returns non-favorites");
  failed++;
}

// Test getAllGroups
const allGroups = getAllGroups();
if (allGroups.includes("Work") && allGroups.includes("Family")) {
  console.log("✅ getAllGroups works");
  passed++;
} else {
  console.log("❌ getAllGroups failed");
  failed++;
}

// Test addToGroup
const beforeGroups = [...contacts[1].groups];
addToGroup(2, "Friends");
if (contacts[1].groups.includes("Friends")) {
  console.log("✅ addToGroup works");
  passed++;
} else {
  console.log("❌ addToGroup failed");
  failed++;
}

// Test getContactStats
const testStats = getContactStats();
if (testStats.total === contacts.length && typeof testStats.groupCounts === "object") {
  console.log("✅ getContactStats works");
  passed++;
} else {
  console.log("❌ getContactStats failed");
  failed++;
}

// Test exportContacts
const exported = exportContacts();
if (exported.includes("Alice") && exported.includes("email")) {
  console.log("✅ exportContacts works");
  passed++;
} else {
  console.log("❌ exportContacts failed");
  failed++;
}

// Test formatAddress
const formatted = formatAddress(contacts[0].address);
if (formatted.includes("123 Main St") && formatted.includes("New York")) {
  console.log("✅ formatAddress works");
  passed++;
} else {
  console.log("❌ formatAddress failed");
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! You're a contact management pro!");
}
