/* =========================
   UI FUNCTIONS
========================= */

/* =========================
   TOAST NOTIFICATION
========================= */

function showToast(message, type = "success") {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.classList.add("show");

    if (type === "error") {

        toast.style.background = "#ef4444";

    }

    else {

        toast.style.background = "#22c55e";

    }

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}

/* =========================
   UPDATE SUMMARY CARDS
========================= */

function updateSummaryCards() {

    const totalExpenses =
        expenses.reduce(
            (total, expense) =>
                total + expense.amount,
            0
        );

    const remaining =
        monthlyBudget - totalExpenses;

    document.querySelector(
        ".total-expenses h2"
    ).textContent = `₹${totalExpenses}`;

    document.querySelector(
        ".remaining-budget h2"
    ).textContent = `₹${remaining}`;

    document.querySelector(
        ".monthly-budget h2"
    ).textContent = `₹${monthlyBudget}`;

    document.querySelector(
        ".total-transactions h2"
    ).textContent = expenses.length;

    updateProgressBar(totalExpenses);

}

/* =========================
   UPDATE PROGRESS BAR
========================= */

function updateProgressBar(totalExpenses) {

    const progressBar =
        document.getElementById("progressBar");

    if (monthlyBudget <= 0) {

        progressBar.style.width = "0%";

        return;

    }

    let percentage =
        (totalExpenses / monthlyBudget) * 100;

    if (percentage > 100) {

        percentage = 100;

    }

    progressBar.style.width =
        `${percentage}%`;

    if (percentage < 60) {

        progressBar.style.background =
            "linear-gradient(90deg,#22c55e,#06b6d4)";

    }

    else if (percentage < 90) {

        progressBar.style.background =
            "linear-gradient(90deg,#facc15,#f97316)";

    }

    else {

        progressBar.style.background =
            "linear-gradient(90deg,#ef4444,#dc2626)";

    }

}

/* =========================
   SIDEBAR
========================= */

function initializeSidebar() {

    const menuToggle =
        document.querySelector(".menu-toggle");

    const sidebar =
        document.querySelector(".sidebar");

    menuToggle.addEventListener("click", () => {

        sidebar.classList.toggle("active");

    });

}

/* =========================
   SEARCH
========================= */

function initializeSearch() {

    const searchInput =
        document.querySelector(
            ".search-box input"
        );

    searchInput.addEventListener(
        "keyup",
        filterExpenses
    );

}