const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const addBtn = document.getElementById("addBtn");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expenses = document.getElementById("expenses");
const transactionList = document.getElementById("transactionList");
const transactionCount = document.getElementById("transactionCount");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateUI() {
    transactionList.innerHTML = "";

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction, index) => {
        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpenses += transaction.amount;
        }

        const item = document.createElement("div");
        item.classList.add("transaction", transaction.type);

        const sign = transaction.type === "income" ? "+" : "-";

        item.innerHTML = `
            <div class="transaction-info">
                <h3>${transaction.description}</h3>
                <span>${transaction.type}</span>
            </div>

            <div class="transaction-right">
                <span class="transaction-amount">
                    ${sign}$${transaction.amount.toFixed(2)}
                </span>

                <button class="delete-btn" onclick="deleteTransaction(${index})">
                    ✕
                </button>
            </div>
        `;

        transactionList.appendChild(item);
    });

    if (transactions.length === 0) {
        transactionList.innerHTML =
            '<p class="empty-message">No transactions yet.</p>';
    }

    const currentBalance = totalIncome - totalExpenses;

    balance.textContent = `$${currentBalance.toFixed(2)}`;
    income.textContent = `$${totalIncome.toFixed(2)}`;
    expenses.textContent = `$${totalExpenses.toFixed(2)}`;
    transactionCount.textContent = transactions.length;
}

function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (description === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid information.");
        return;
    }

    const transaction = {
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    saveTransactions();
    updateUI();

    descriptionInput.value = "";
    amountInput.value = "";
    descriptionInput.focus();
}

function deleteTransaction(index) {
    transactions.splice(index, 1);

    saveTransactions();
    updateUI();
}

addBtn.addEventListener("click", addTransaction);

amountInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTransaction();
    }
});

descriptionInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTransaction();
    }
});

updateUI();