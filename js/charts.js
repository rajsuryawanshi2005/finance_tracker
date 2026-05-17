/* =========================
   CHART VARIABLES
========================= */

let pieChart;
let barChart;

/* =========================
   INITIALIZE CHARTS
========================= */

function initializeCharts() {

    createPieChart();

    createBarChart();

}

/* =========================
   PIE CHART
========================= */

function createPieChart() {

    const categoryTotals = {};

    expenses.forEach(expense => {

        if (categoryTotals[expense.category]) {

            categoryTotals[expense.category] +=
                expense.amount;

        }

        else {

            categoryTotals[expense.category] =
                expense.amount;

        }

    });

    const ctx =
        document.getElementById("pieChart");

    if (pieChart) {

        pieChart.destroy();

    }

    pieChart = new Chart(ctx, {

        type: "pie",

        data: {

            labels:
                Object.keys(categoryTotals),

            datasets: [{

                data:
                    Object.values(categoryTotals),

                backgroundColor: [

                    "#3b82f6",
                    "#8b5cf6",
                    "#06b6d4",
                    "#22c55e",
                    "#ef4444",
                    "#f97316",
                    "#facc15"

                ],

                borderWidth: 0

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    labels: {

                        color: "white"

                    }

                }

            }

        }

    });

}

/* =========================
   BAR CHART
========================= */

function createBarChart() {

    const ctx =
        document.getElementById("barChart");

    if (barChart) {

        barChart.destroy();

    }

    const labels =
        expenses.map(expense => expense.title);

    const amounts =
        expenses.map(expense => expense.amount);

    barChart = new Chart(ctx, {

        type: "bar",

        data: {

            labels,

            datasets: [{

                label: "Expenses",

                data: amounts,

                backgroundColor: "#3b82f6",

                borderRadius: 10

            }]

        },

        options: {

            responsive: true,

            scales: {

                y: {

                    ticks: {

                        color: "white"

                    },

                    grid: {

                        color:
                            "rgba(255,255,255,0.1)"

                    }

                },

                x: {

                    ticks: {

                        color: "white"

                    },

                    grid: {

                        color:
                            "rgba(255,255,255,0.1)"

                    }

                }

            },

            plugins: {

                legend: {

                    labels: {

                        color: "white"

                    }

                }

            }

        }

    });

}

/* =========================
   UPDATE CHARTS
========================= */

function updateCharts() {

    createPieChart();

    createBarChart();

}