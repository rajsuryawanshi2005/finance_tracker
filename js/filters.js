/* =========================
   FILTERS & SEARCH
========================= */

/* =========================
   SEARCH FILTER
========================= */

function searchExpenses(searchText) {

    const filteredExpenses =
        expenses.filter(expense =>

            expense.title
                .toLowerCase()
                .includes(
                    searchText.toLowerCase()
                )

        );

    renderExpenses(filteredExpenses);

}

/* =========================
   CATEGORY FILTER
========================= */

function filterByCategory(category) {

    if (category === "All") {

        renderExpenses();

        return;

    }

    const filteredExpenses =
        expenses.filter(expense =>

            expense.category === category

        );

    renderExpenses(filteredExpenses);

}

/* =========================
   DATE FILTER
========================= */

function filterByDate(date) {

    const filteredExpenses =
        expenses.filter(expense =>

            expense.date === date

        );

    renderExpenses(filteredExpenses);

}

/* =========================
   SORT BY AMOUNT
========================= */

function sortByAmount() {

    const sortedExpenses =
        [...expenses].sort(
            (a, b) => b.amount - a.amount
        );

    renderExpenses(sortedExpenses);

}

/* =========================
   SORT BY DATE
========================= */

function sortByDate() {

    const sortedExpenses =
        [...expenses].sort(
            (a, b) =>
                new Date(b.date) -
                new Date(a.date)
        );

    renderExpenses(sortedExpenses);

}