/* =========================
   SELECTORS
========================= */

const expenseForm =
    document.getElementById("expenseForm");

const expenseTableBody =
    document.getElementById("expenseTableBody");

const budgetInput =
    document.getElementById("budgetInput");

const saveBudgetBtn =
    document.getElementById("saveBudgetBtn");

const progressBar =
    document.getElementById("progressBar");

const toast =
    document.getElementById("toast");

const menuToggle =
    document.querySelector(".menu-toggle");

const sidebar =
    document.querySelector(".sidebar");

const themeToggle =
    document.querySelector(".theme-toggle");

/* =========================
   SUMMARY CARDS
========================= */

const totalExpensesCard =
    document.querySelector(".total-expenses h2");

const remainingBudgetCard =
    document.querySelector(".remaining-budget h2");

const monthlyBudgetCard =
    document.querySelector(".monthly-budget h2");

const totalTransactionsCard =
    document.querySelector(".total-transactions h2");

/* =========================
   APP STATE
========================= */

let expenses =
    JSON.parse(localStorage.getItem("expenses")) || [];

let budget =
    JSON.parse(localStorage.getItem("budget")) || 0;

let editId = null;

let pieChart;
let barChart;

/* =========================
   INIT APP
========================= */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        renderExpenses();

        updateSummary();

        createCharts();

        loadBudget();

        loadTheme();

        initializeRipple();

    }
);

/* =========================
   ADD EXPENSE
========================= */

expenseForm.addEventListener(
    "submit",
    (e) => {

        e.preventDefault();

        const title =
            document.getElementById("title")
            .value.trim();

        const amount =
            parseFloat(
                document.getElementById("amount").value
            );

        const category =
            document.getElementById("category").value;

        const date =
            document.getElementById("date").value;

        if (
            !title ||
            !amount ||
            !category ||
            !date
        ) {

            showToast(
                "Please fill all fields",
                "error"
            );

            return;

        }

        if (editId) {

            expenses = expenses.map(expense => {

                if (expense.id === editId) {

                    return {
                        ...expense,
                        title,
                        amount,
                        category,
                        date
                    };

                }

                return expense;

            });

            showToast("Expense Updated");

            addActivity(
                `Updated ${title} expense`
            );

            editId = null;

        }

        else {

            expenses.push({

                id: Date.now(),

                title,

                amount,

                category,

                date

            });

            showToast("Expense Added");

            addActivity(
                `Added ${title} expense`
            );

        }

        saveExpenses();

        renderExpenses();

        updateSummary();

        updateCharts();

        expenseForm.reset();

    }
);

/* =========================
   RENDER EXPENSES
========================= */

function renderExpenses(data = expenses) {

    expenseTableBody.innerHTML = "";

    if (data.length === 0) {

        expenseTableBody.innerHTML = `

            <tr>

                <td colspan="5"
                    style="text-align:center;padding:30px;">

                    No Expenses Added

                </td>

            </tr>

        `;

        return;

    }

    data.forEach(expense => {

        const row =
            document.createElement("tr");

        row.innerHTML = `

            <td>${expense.title}</td>

            <td>₹${expense.amount}</td>

            <td>${expense.category}</td>

            <td>${expense.date}</td>

            <td>

                <button class="edit-btn"
                    onclick="editExpense(${expense.id})">

                    Edit

                </button>

                <button class="delete-btn"
                    onclick="deleteExpense(${expense.id})">

                    Delete

                </button>

            </td>

        `;

        expenseTableBody.appendChild(row);

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

    saveExpenses();

    renderExpenses();

    updateSummary();

    updateCharts();

    showToast(
        "Expense Deleted",
        "error"
    );

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

    editId = id;

    showToast("Edit Mode Enabled");

}

/* =========================
   SAVE EXPENSES
========================= */

function saveExpenses() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}

/* =========================
   SAVE BUDGET
========================= */

saveBudgetBtn.addEventListener(
    "click",
    () => {

        const value =
            parseFloat(budgetInput.value);

        if (!value || value <= 0) {

            showToast(
                "Enter Valid Budget",
                "error"
            );

            return;

        }

        budget = value;

        localStorage.setItem(
            "budget",
            JSON.stringify(budget)
        );

        updateSummary();

        loadBudget();

        addActivity(
            `Budget updated to ₹${budget}`
        );

        showToast("Budget Saved");

    }
);

/* =========================
   LOAD BUDGET
========================= */

function loadBudget() {

    budgetInput.value = budget;

}

/* =========================
   UPDATE SUMMARY
========================= */

function updateSummary() {

    const totalExpenses =
        expenses.reduce(
            (total, expense) =>
                total + expense.amount,
            0
        );

    const remaining =
        budget - totalExpenses;

    totalExpensesCard.textContent =
        `₹${totalExpenses}`;

    remainingBudgetCard.textContent =
        `₹${remaining}`;

    monthlyBudgetCard.textContent =
        `₹${budget}`;

    totalTransactionsCard.textContent =
        expenses.length;

    updateProgressBar(totalExpenses);

}

/* =========================
   PROGRESS BAR
========================= */

function updateProgressBar(totalExpenses) {

    if (budget <= 0) {

        progressBar.style.width = "0%";

        return;

    }

    let percentage =
        (totalExpenses / budget) * 100;

    if (percentage > 100) {

        percentage = 100;

    }

    progressBar.style.width =
        `${percentage}%`;

}

/* =========================
   TOAST
========================= */

function showToast(
    message,
    type = "success"
) {

    toast.textContent = message;

    toast.classList.add("show");

    toast.style.background =
        type === "error"
            ? "#ef4444"
            : "#22c55e";

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

/* =========================
   SEARCH FILTER
========================= */

document.querySelector(".search-box input")
.addEventListener("keyup", e => {

    const value =
        e.target.value.toLowerCase();

    const filtered =
        expenses.filter(expense =>

            expense.title
                .toLowerCase()
                .includes(value)

        );

    renderExpenses(filtered);

});

/* =========================
   CATEGORY FILTER
========================= */

function filterByCategory(category) {

    if (category === "All") {

        renderExpenses();

        return;

    }

    const filtered =
        expenses.filter(expense =>

            expense.category === category

        );

    renderExpenses(filtered);

}

/* =========================
   SORTING
========================= */

function sortByAmount() {

    const sorted =
        [...expenses].sort(
            (a,b) => b.amount - a.amount
        );

    renderExpenses(sorted);

}

function sortByDate() {

    const sorted =
        [...expenses].sort(
            (a,b) =>
                new Date(b.date) -
                new Date(a.date)
        );

    renderExpenses(sorted);

}

/* =========================
   CHARTS
========================= */

function createCharts() {

    createPieChart();

    createBarChart();

}

function createPieChart() {

    const categories = {};

    expenses.forEach(expense => {

        if(categories[expense.category]) {

            categories[expense.category] +=
                expense.amount;

        }

        else {

            categories[expense.category] =
                expense.amount;

        }

    });

    const ctx =
        document.getElementById("pieChart");

    if(pieChart) pieChart.destroy();

    pieChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels:
                Object.keys(categories),

            datasets: [{

                data:
                    Object.values(categories),

                backgroundColor: [

                    "#3b82f6",
                    "#8b5cf6",
                    "#06b6d4",
                    "#22c55e",
                    "#ef4444"

                ]

            }]

        }

    });

}

function createBarChart() {

    const ctx =
        document.getElementById("barChart");

    if(barChart) barChart.destroy();

    barChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels:
                expenses.map(e => e.title),

            datasets: [{

                label: "Expenses",

                data:
                    expenses.map(e => e.amount),

                backgroundColor: "#3b82f6",

                borderRadius: 10

            }]

        }

    });

}

function updateCharts() {

    createPieChart();

    createBarChart();

}

/* =========================
   THEME
========================= */

themeToggle.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light-mode"
        );

        localStorage.setItem(
            "theme",
            document.body.classList.contains(
                "light-mode"
            )
        );

    }
);

function loadTheme() {

    const theme =
        localStorage.getItem("theme");

    if(theme === "true") {

        document.body.classList.add(
            "light-mode"
        );

    }

}

/* =========================
   SIDEBAR
========================= */

menuToggle.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle("active");

    }
);

/* =========================
   EXPORT CSV
========================= */

function exportExpensesCSV() {

    if(expenses.length === 0) {

        showToast(
            "No Expenses To Export",
            "error"
        );

        return;

    }

    let csv =
        "Title,Amount,Category,Date\n";

    expenses.forEach(expense => {

        csv +=
            `${expense.title},
            ${expense.amount},
            ${expense.category},
            ${expense.date}\n`;

    });

    const blob =
        new Blob([csv], {
            type: "text/csv"
        });

    const url =
        window.URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = "expenses.csv";

    a.click();

}

/* =========================
   ACTIVITY
========================= */

function addActivity(message) {

    const activityList =
        document.querySelector(".activity-list");

    const item =
        document.createElement("div");

    item.classList.add("activity-item");

    item.innerHTML = `<p>${message}</p>`;

    activityList.prepend(item);

}

/* =========================
   RIPPLE EFFECT
========================= */

function initializeRipple() {

    const buttons =
        document.querySelectorAll("button");

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function(e){

                const ripple =
                    document.createElement("span");

                ripple.classList.add("ripple");

                this.appendChild(ripple);

                const x =
                    e.clientX -
                    e.target.offsetLeft;

                const y =
                    e.clientY -
                    e.target.offsetTop;

                ripple.style.left = `${x}px`;

                ripple.style.top = `${y}px`;

                setTimeout(() => {

                    ripple.remove();

                },600);

            }
        );

    });

}

/* =========================
   FLOATING BUTTON
========================= */

document.querySelector(".floating-btn")
.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});