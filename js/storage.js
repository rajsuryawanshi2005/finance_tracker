/* =========================
   LOCAL STORAGE FUNCTIONS
========================= */

/* =========================
   SAVE EXPENSES
========================= */

function saveExpensesToStorage() {

    localStorage.setItem(
        "expenses",
        JSON.stringify(expenses)
    );

}

/* =========================
   LOAD EXPENSES
========================= */

function loadExpenses() {

    const storedExpenses =
        localStorage.getItem("expenses");

    expenses = storedExpenses
        ? JSON.parse(storedExpenses)
        : [];

}

/* =========================
   SAVE BUDGET
========================= */

function saveBudgetToStorage() {

    localStorage.setItem(
        "budget",
        JSON.stringify(monthlyBudget)
    );

}

/* =========================
   LOAD BUDGET
========================= */

function loadBudget() {

    const storedBudget =
        localStorage.getItem("budget");

    monthlyBudget = storedBudget
        ? JSON.parse(storedBudget)
        : 0;

}

/* =========================
   SAVE THEME
========================= */

function saveTheme(theme) {

    localStorage.setItem("theme", theme);

}

/* =========================
   LOAD THEME
========================= */

function loadTheme() {

    return localStorage.getItem("theme");

}