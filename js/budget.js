/* =========================
   BUDGET VARIABLES
========================= */

let monthlyBudget = 0;

/* =========================
   SAVE BUDGET
========================= */

const saveBudgetBtn =
    document.getElementById("saveBudgetBtn");

saveBudgetBtn.addEventListener(
    "click",
    saveBudget
);

function saveBudget() {

    const budgetInput =
        document.getElementById("budgetInput");

    const value =
        parseFloat(budgetInput.value);

    if (!value || value <= 0) {

        showToast(
            "Enter Valid Budget",
            "error"
        );

        return;

    }

    monthlyBudget = value;

    saveBudgetToStorage();

    updateSummaryCards();

    showToast("Budget Saved");

}