/* =========================
   EXPORT CSV
========================= */

function exportExpensesCSV() {

    if (expenses.length === 0) {

        showToast(
            "No Expenses To Export",
            "error"
        );

        return;

    }

    let csvContent =
        "Title,Amount,Category,Date\n";

    expenses.forEach(expense => {

        csvContent +=
            `${expense.title},
            ${expense.amount},
            ${expense.category},
            ${expense.date}\n`;

    });

    const blob =
        new Blob(
            [csvContent],
            { type: "text/csv" }
        );

    const url =
        window.URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    a.href = url;

    a.download = "expenses.csv";

    a.click();

    window.URL.revokeObjectURL(url);

    showToast("CSV Exported Successfully");

}