/* =========================
   APP INITIALIZATION
========================= */

document.addEventListener("DOMContentLoaded", () => {

    loadExpenses();

    loadBudget();

    renderExpenses();

    updateSummaryCards();

    initializeCharts();

    initializeTheme();

    initializeSidebar();

    initializeSearch();

});