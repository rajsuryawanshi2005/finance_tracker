/* =========================
   NOTIFICATION SYSTEM
========================= */

/* =========================
   SUCCESS NOTIFICATION
========================= */

function successNotification(message) {

    showToast(message, "success");

}

/* =========================
   ERROR NOTIFICATION
========================= */

function errorNotification(message) {

    showToast(message, "error");

}

/* =========================
   WARNING NOTIFICATION
========================= */

function warningNotification(message) {

    const toast =
        document.getElementById("toast");

    toast.textContent = message;

    toast.style.background =
        "#facc15";

    toast.style.color = "#111827";

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}