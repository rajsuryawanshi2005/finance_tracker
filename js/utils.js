/* =========================
   UTILITY FUNCTIONS
========================= */

/* =========================
   FORMAT CURRENCY
========================= */

function formatCurrency(amount) {

    return `₹${amount.toLocaleString("en-IN")}`;

}

/* =========================
   FORMAT DATE
========================= */

function formatDate(dateString) {

    const options = {

        year: "numeric",
        month: "short",
        day: "numeric"

    };

    return new Date(dateString)
        .toLocaleDateString(
            "en-IN",
            options
        );

}

/* =========================
   GENERATE RANDOM ID
========================= */

function generateID() {

    return Date.now() +
        Math.floor(Math.random() * 1000);

}

/* =========================
   DEBOUNCE FUNCTION
========================= */

function debounce(callback, delay) {

    let timeout;

    return (...args) => {

        clearTimeout(timeout);

        timeout = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

/* =========================
   SCROLL TO TOP
========================= */

function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

/* =========================
   CHECK EMPTY ARRAY
========================= */

function isEmpty(array) {

    return array.length === 0;

}