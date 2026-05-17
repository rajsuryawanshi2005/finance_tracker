/* =========================
   EXPENSE VARIABLES
========================= */

let expenses = [];

let editExpenseId = null;

/* =========================
   FORM SUBMIT
========================= */

const expenseForm =
    document.getElementById("expenseForm");

expenseForm.addEventListener("submit", addExpense);

/* =========================
   ADD EXPENSE
========================= */

function addExpense(e) {

    e.preventDefault();

    const title =
        document.getElementById("title").value;

    const amount =
        parseFloat(
            document.getElementById("amount").value
        );

    const category =
        document.getElementById("category").value;

    const date =
        document.getElementById("date").value;

    if (!title || !amount || !category || !date) {

        showToast(
            "Please fill all fields",
            "error"
        );

        return;

    }

    const expense = {

        id: editExpenseId || Date.now(),

        title,

        amount,

        category,

        date

    };

    if (editExpenseId) {

        expenses = expenses.map(item =>
            item.id === editExpenseId
                ? expense
                : item
        );

        showToast("Expense Updated");

        editExpenseId = null;

    }

    else {

        expenses.push(expense);

        showToast("Expense Added");

    }

    saveExpensesToStorage();

    renderExpenses();

    updateSummaryCards();

    updateCharts();

    expenseForm.reset();

}

/* =========================
   RENDER EXPENSES
========================= */

function renderExpenses(filtered = expenses) {

    const tableBody =
        document.getElementById(
            "expenseTableBody"
        );

    tableBody.innerHTML = "";

    if (filtered.length === 0) {

        tableBody.innerHTML = `

            <tr>
                <td colspan="5"
                    class="empty-state">

                    No Expenses Found

                </td>
            </tr>

        `;

        return;

    }

    filtered.forEach(expense => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${expense.title}</td>

            <td>₹${expense.amount}</td>

            <td>${expense.category}</td>

            <td>${expense.date}</td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editExpense(${expense.id})">

                    Edit

                </button>

                <button
                    class="delete-btn"
                    onclick="deleteExpense(${expense.id})">

                    Delete

                </button>

            </td>

        `;

        tableBody.appendChild(row);

    });

}

/* =========================
   DELETE EXPENSE
========================= */

function deleteExpense(id) {

    expenses =
        expenses.filter(
            expense => expense.id !== id
        );

    saveExpensesToStorage();

    renderExpenses();

    updateSummaryCards();

    updateCharts();

    showToast("Expense Deleted", "error");

}

/* =========================
   EDIT EXPENSE
========================= */

function editExpense(id) {

    const expense =
        expenses.find(
            expense => expense.id === id
        );

    document.getElementById("title").value =
        expense.title;

    document.getElementById("amount").value =
        expense.amount;

    document.getElementById("category").value =
        expense.category;

    document.getElementById("date").value =
        expense.date;

    editExpenseId = id;

    showToast("Edit Mode Enabled");

}

/* =========================
   FILTER EXPENSES
========================= */

function filterExpenses(e) {

    const value =
        e.target.value.toLowerCase();

    const filtered =
        expenses.filter(expense =>
            expense.title
                .toLowerCase()
                .includes(value)
        );

    renderExpenses(filtered);

}