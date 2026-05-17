/* =========================
   THEME TOGGLE
========================= */

function initializeTheme() {

    const savedTheme =
        loadTheme();

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

    }

    const themeToggle =
        document.querySelector(".theme-toggle");

    themeToggle.addEventListener(
        "click",
        toggleTheme
    );

}

/* =========================
   TOGGLE THEME
========================= */

function toggleTheme() {

    document.body.classList.toggle(
        "light-mode"
    );

    const isLightMode =
        document.body.classList.contains(
            "light-mode"
        );

    saveTheme(
        isLightMode ? "light" : "dark"
    );

    showToast(
        isLightMode
            ? "Light Mode Enabled"
            : "Dark Mode Enabled"
    );

}