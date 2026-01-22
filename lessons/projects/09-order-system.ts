/**
 * ============================================================
 * PROJECT: Order Management System
 * Required Knowledge: Lessons 1-9 (+ Union & Literal Types)
 * ============================================================
 * 
 * Build an order management system with:
 * - Order state machine (pending → processing → shipped → delivered)
 * - Different order types and payment methods
 * - Proper discriminated unions
 * - Type guards for safe handling
 * 
 * This project practices:
 * - Union types
 * - Literal types
 * - Discriminated unions
 * - Type guards
 * - Exhaustive checking
 */

// ============================================================
// TODO: Define Order Status (Literal Types)
// ============================================================

/**
 * Define an OrderStatus type with these possible values:
 * - "pending" - Just created
 * - "confirmed" - Payment received
 * - "processing" - Being prepared
 * - "shipped" - On the way
 * - "delivered" - Received by customer
 * - "cancelled" - Order cancelled
 * - "refunded" - Money returned
 */
type OrderStatus = "pending"; // TODO: Add all statuses

// ============================================================
// TODO: Define Payment Types (Discriminated Union)
// ============================================================

/**
 * Define payment method types with discriminated unions.
 * Each should have a 'type' field as the discriminant.
 */

type CreditCardPayment = {
  type: "credit_card";
  cardNumber: string;  // Last 4 digits only
  cardBrand: "visa" | "mastercard" | "amex";
  expiryDate: string;
};

type PayPalPayment = {
  type: "paypal";
  email: string;
  transactionId: string;
};

type BankTransferPayment = {
  type: "bank_transfer";
  bankName: string;
  accountNumber: string;  // Last 4 digits
  transferReference: string;
};

type CashOnDelivery = {
  type: "cod";
  // No additional fields needed
};

// TODO: Create a PaymentMethod union type
type PaymentMethod = CreditCardPayment; // Add other types

// ============================================================
// TODO: Define Order Types (Discriminated Union)
// ============================================================

type BaseOrder = {
  id: string;
  customerId: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  createdAt: Date;
  updatedAt: Date;
};

type PendingOrder = BaseOrder & {
  status: "pending";
  // No payment yet
};

type ConfirmedOrder = BaseOrder & {
  status: "confirmed";
  payment: PaymentMethod;
  confirmedAt: Date;
};

type ProcessingOrder = BaseOrder & {
  status: "processing";
  payment: PaymentMethod;
  confirmedAt: Date;
  processingStartedAt: Date;
  estimatedCompletion: Date;
};

type ShippedOrder = BaseOrder & {
  status: "shipped";
  payment: PaymentMethod;
  confirmedAt: Date;
  shippedAt: Date;
  trackingNumber: string;
  carrier: string;
  estimatedDelivery: Date;
};

type DeliveredOrder = BaseOrder & {
  status: "delivered";
  payment: PaymentMethod;
  confirmedAt: Date;
  shippedAt: Date;
  deliveredAt: Date;
  signedBy?: string;
};

type CancelledOrder = BaseOrder & {
  status: "cancelled";
  cancelledAt: Date;
  cancellationReason: string;
  refundIssued: boolean;
};

// TODO: Create Order union type
type Order = PendingOrder; // Add all order types

// ============================================================
// SAMPLE DATA
// ============================================================

const orders: Order[] = [
  {
    id: "ORD-001",
    customerId: "CUST-001",
    items: [{ productId: "PROD-1", name: "Widget", quantity: 2, price: 29.99 }],
    subtotal: 59.98,
    tax: 4.80,
    shipping: 5.99,
    total: 70.77,
    status: "pending",
    createdAt: new Date("2024-01-20"),
    updatedAt: new Date("2024-01-20")
  } as PendingOrder,
  {
    id: "ORD-002",
    customerId: "CUST-002",
    items: [{ productId: "PROD-2", name: "Gadget", quantity: 1, price: 149.99 }],
    subtotal: 149.99,
    tax: 12.00,
    shipping: 0,
    total: 161.99,
    status: "shipped",
    payment: { type: "credit_card", cardNumber: "4242", cardBrand: "visa", expiryDate: "12/25" },
    confirmedAt: new Date("2024-01-15"),
    shippedAt: new Date("2024-01-17"),
    trackingNumber: "TRK123456",
    carrier: "FastShip",
    estimatedDelivery: new Date("2024-01-22"),
    createdAt: new Date("2024-01-14"),
    updatedAt: new Date("2024-01-17")
  } as ShippedOrder,
];

// ============================================================
// TODO: Type Guards
// ============================================================

/**
 * Check if order is pending.
 */
function isPending(order: Order): order is PendingOrder {
  // TODO: Implement type guard
  return false;
}

/**
 * Check if order has been shipped.
 */
function isShipped(order: Order): order is ShippedOrder {
  // TODO: Implement type guard
  return false;
}

/**
 * Check if order is in an active state (not cancelled/refunded).
 */
function isActive(order: Order): boolean {
  // TODO: Return true if order is not cancelled or refunded
  return false;
}

/**
 * Check if order can be cancelled.
 */
function canCancel(order: Order): boolean {
  // TODO: Only pending, confirmed, or processing orders can be cancelled
  return false;
}

// ============================================================
// TODO: Order State Transitions
// ============================================================

/**
 * Confirm a pending order with payment.
 */
function confirmOrder(order: PendingOrder, payment: PaymentMethod): ConfirmedOrder {
  // TODO: Transition to confirmed status
  return {} as ConfirmedOrder;
}

/**
 * Start processing a confirmed order.
 */
function startProcessing(order: ConfirmedOrder): ProcessingOrder {
  // TODO: Transition to processing status
  return {} as ProcessingOrder;
}

/**
 * Ship a processing order.
 */
function shipOrder(
  order: ProcessingOrder,
  trackingNumber: string,
  carrier: string,
  estimatedDelivery: Date
): ShippedOrder {
  // TODO: Transition to shipped status
  return {} as ShippedOrder;
}

/**
 * Mark order as delivered.
 */
function deliverOrder(order: ShippedOrder, signedBy?: string): DeliveredOrder {
  // TODO: Transition to delivered status
  return {} as DeliveredOrder;
}

/**
 * Cancel an order.
 */
function cancelOrder(order: Order, reason: string): CancelledOrder | null {
  // TODO: Cancel if possible, return null if not
  return null;
}

// ============================================================
// TODO: Order Display Functions
// ============================================================

/**
 * Get human-readable status message.
 */
function getStatusMessage(order: Order): string {
  // TODO: Use switch with exhaustive checking
  // Return messages like "Awaiting payment", "On the way", etc.
  return "";
}

/**
 * Get order timeline/history.
 */
function getOrderTimeline(order: Order): { event: string; date: Date }[] {
  // TODO: Build timeline based on order status
  // Include: created, confirmed, processing, shipped, delivered
  return [];
}

/**
 * Format payment method for display.
 */
function formatPaymentMethod(payment: PaymentMethod): string {
  // TODO: Use switch on payment.type
  // Examples: "Visa ending in 4242", "PayPal (user@example.com)"
  return "";
}

// ============================================================
// TODO: Order Queries
// ============================================================

/**
 * Get orders by status.
 */
function getOrdersByStatus<S extends OrderStatus>(status: S): Order[] {
  // TODO: Filter orders by status
  return [];
}

/**
 * Get orders that need attention (pending for over 24 hours).
 */
function getOrdersNeedingAttention(): Order[] {
  // TODO: Find orders that have been pending too long
  return [];
}

/**
 * Calculate order statistics.
 */
function getOrderStats(): {
  total: number;
  byStatus: Record<OrderStatus, number>;
  totalRevenue: number;
  averageOrderValue: number;
  paymentMethodBreakdown: Record<string, number>;
} {
  // TODO: Calculate all statistics
  return {
    total: 0,
    byStatus: {} as Record<OrderStatus, number>,
    totalRevenue: 0,
    averageOrderValue: 0,
    paymentMethodBreakdown: {}
  };
}

// ============================================================
// DEMO AND DISPLAY
// ============================================================

console.log("========================================");
console.log("ORDER MANAGEMENT SYSTEM");
console.log("========================================\n");

console.log("--- Current Orders ---");
orders.forEach(order => {
  console.log(`${order.id}: ${order.status.toUpperCase()} - $${order.total.toFixed(2)}`);
  console.log(`   Status: ${getStatusMessage(order)}`);
  if (isShipped(order)) {
    console.log(`   Tracking: ${order.trackingNumber} via ${order.carrier}`);
  }
});

console.log("\n--- Process New Order ---");
const pendingOrder = orders[0] as PendingOrder;
if (isPending(pendingOrder)) {
  const payment: CreditCardPayment = {
    type: "credit_card",
    cardNumber: "1234",
    cardBrand: "visa",
    expiryDate: "06/26"
  };
  const confirmed = confirmOrder(pendingOrder, payment);
  console.log(`Order ${confirmed.id} confirmed!`);
  console.log(`Payment: ${formatPaymentMethod(payment)}`);
}

console.log("\n--- Order Timeline ---");
const shippedOrder = orders[1];
getOrderTimeline(shippedOrder).forEach(event => {
  console.log(`   ${event.date.toLocaleDateString()}: ${event.event}`);
});

// ============================================================
// TESTS
// ============================================================

console.log("\n========================================");
console.log("TESTING YOUR SOLUTION");
console.log("========================================\n");

let passed = 0;
let failed = 0;

// Test isPending
if (isPending(orders[0])) {
  console.log("✅ isPending type guard works");
  passed++;
} else {
  console.log("❌ isPending failed");
  failed++;
}

// Test isShipped
if (isShipped(orders[1])) {
  console.log("✅ isShipped type guard works");
  passed++;
} else {
  console.log("❌ isShipped failed");
  failed++;
}

// Test canCancel
if (canCancel(orders[0]) && !canCancel({ ...orders[1], status: "delivered" } as any)) {
  console.log("✅ canCancel logic correct");
  passed++;
} else {
  console.log("❌ canCancel logic incorrect");
  failed++;
}

// Test confirmOrder
const testPending: PendingOrder = { ...orders[0] } as PendingOrder;
const testPayment: CreditCardPayment = { type: "credit_card", cardNumber: "9999", cardBrand: "mastercard", expiryDate: "01/25" };
const testConfirmed = confirmOrder(testPending, testPayment);
if (testConfirmed.status === "confirmed" && testConfirmed.payment) {
  console.log("✅ confirmOrder works");
  passed++;
} else {
  console.log("❌ confirmOrder failed");
  failed++;
}

// Test getStatusMessage
const statusMsg = getStatusMessage(orders[0]);
if (statusMsg.length > 0) {
  console.log("✅ getStatusMessage works");
  passed++;
} else {
  console.log("❌ getStatusMessage returns empty");
  failed++;
}

// Test formatPaymentMethod
const formattedPayment = formatPaymentMethod(testPayment);
if (formattedPayment.includes("9999") || formattedPayment.toLowerCase().includes("mastercard")) {
  console.log("✅ formatPaymentMethod works");
  passed++;
} else {
  console.log(`❌ formatPaymentMethod: "${formattedPayment}"`);
  failed++;
}

// Test getOrderTimeline
const timeline = getOrderTimeline(orders[1]);
if (timeline.length >= 1) {
  console.log("✅ getOrderTimeline works");
  passed++;
} else {
  console.log("❌ getOrderTimeline returns empty");
  failed++;
}

// Test getOrdersByStatus
const pendingOrders = getOrdersByStatus("pending");
if (pendingOrders.every(o => o.status === "pending")) {
  console.log("✅ getOrdersByStatus works");
  passed++;
} else {
  console.log("❌ getOrdersByStatus failed");
  failed++;
}

console.log(`\n${passed}/${passed + failed} tests passed`);
if (failed === 0) {
  console.log("\n🎉 Project complete! You're ready for e-commerce!");
}
