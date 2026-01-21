// ===============================
// PO & INVOICE MANAGEMENT CLI
// ===============================

const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ===============================
// DATA STORAGE (In-Memory)
// ===============================
let purchaseOrder = null;
let invoice = null;

// ===============================
// UTILITY FUNCTIONS
// ===============================
function generateDocumentNumber() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    let result = "";

    for (let i = 0; i < 3; i++)
        result += letters[Math.floor(Math.random() * letters.length)];

    for (let i = 0; i < 3; i++)
        result += numbers[Math.floor(Math.random() * numbers.length)];

    return result;
}

function calculateAmount(paymentType, rate, duration) {
    if (paymentType === "hourly") return rate * duration.hours;
    if (paymentType === "daily") return rate * duration.days;
    if (paymentType === "monthly") return rate * duration.months;
    return 0;
}

function getTrainingStatus(endDate) {
    const today = new Date();
    const end = new Date(endDate);
    return today <= end ? "IN_PROGRESS" : "COMPLETED";
}

// ===============================
// CORE FUNCTIONS
// ===============================
function createPurchaseOrder() {
    const trainer = {
        name: "Sharath Kumar",
        email: "sharath@trainer.com"
    };

    const training = {
        course: "Advanced React",
        client: "UST Global",
        endDate: "2026-02-08"
    };

    const paymentType = "daily";
    const rate = 8000;
    const duration = { days: 40 };

    purchaseOrder = {
        poNumber: generateDocumentNumber(),
        trainer,
        training,
        paymentType,
        rate,
        duration,
        createdDate: new Date(),
        status: "ACTIVE",
        totalAmount: calculateAmount(paymentType, rate, duration)
    };

    console.log("\n📄 PURCHASE ORDER CREATED");
    console.log(purchaseOrder);
}

function generateInvoice() {
    if (!purchaseOrder) {
        console.log("❌ Create Purchase Order first");
        return;
    }

    const status = getTrainingStatus(purchaseOrder.training.endDate);
    console.log("📊 Training Status:", status);

    if (status !== "COMPLETED") {
        console.log("❌ Training not completed. Invoice cannot be generated.");
        return;
    }

    invoice = {
        invoiceNumber: generateDocumentNumber(),
        poNumber: purchaseOrder.poNumber,
        trainerName: purchaseOrder.trainer.name,
        course: purchaseOrder.training.course,
        amount: purchaseOrder.totalAmount,
        invoiceDate: new Date(),
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        status: "UNPAID"
    };

    console.log("\n🧾 INVOICE GENERATED");
    console.log(invoice);
}

function checkInvoiceOverdue() {
    if (!invoice) {
        console.log("❌ No invoice available");
        return;
    }

    const today = new Date();
    const dueDate = new Date(invoice.dueDate);

    if (today > dueDate && invoice.status !== "PAID") {
        invoice.status = "OVERDUE";
        console.log("\n⚠️ INVOICE OVERDUE");
        console.log("📧 Sending overdue notification...");
    } else {
        console.log("\n🕒 Invoice not overdue yet");
        console.log("Due Date:", dueDate.toDateString());
    }
}

// ===============================
// CLI MENU
// ===============================
function showMenu() {
    console.log(`
===============================
 PO & INVOICE MANAGEMENT
===============================
1. Create Purchase Order
2. Generate Invoice
3. Check Invoice Overdue
4. Exit
`);
}

function handleInput(choice) {
    switch (choice.trim()) {
        case "1":
            createPurchaseOrder();
            break;
        case "2":
            generateInvoice();
            break;
        case "3":
            checkInvoiceOverdue();
            break;
        case "4":
            console.log("👋 Exiting...");
            rl.close();
            return;
        default:
            console.log("❌ Invalid option");
    }

    askUser();
}

function askUser() {
    showMenu();
    rl.question("Select an option: ", handleInput);
}

// ===============================
// START CLI
// ===============================
askUser();
