/* =========================
   ANIMATION FUNCTIONS
========================= */

/* =========================
   COUNTER ANIMATION
========================= */

function animateCounter(
    element,
    start,
    end,
    duration
) {

    let startTimestamp = null;

    const step = (timestamp) => {

        if (!startTimestamp)
            startTimestamp = timestamp;

        const progress =
            Math.min(
                (timestamp - startTimestamp)
                / duration,
                1
            );

        element.textContent =
            `₹${Math.floor(
                progress * (end - start)
                + start
            )}`;

        if (progress < 1) {

            window.requestAnimationFrame(step);

        }

    };

    window.requestAnimationFrame(step);

}

/* =========================
   FADE IN ELEMENTS
========================= */

function fadeInElements() {

    const elements =
        document.querySelectorAll(
            ".card, .chart-card, .glass"
        );

    elements.forEach((element, index) => {

        element.style.opacity = 0;

        setTimeout(() => {

            element.style.transition =
                "all 0.6s ease";

            element.style.opacity = 1;

            element.style.transform =
                "translateY(0)";

        }, index * 100);

    });

}

/* =========================
   BUTTON RIPPLE EFFECT
========================= */

function initializeRippleEffect() {

    const buttons =
        document.querySelectorAll(
            "button"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            function (e) {

                const ripple =
                    document.createElement("span");

                ripple.classList.add("ripple");

                this.appendChild(ripple);

                const x =
                    e.clientX -
                    e.target.offsetLeft;

                const y =
                    e.clientY -
                    e.target.offsetTop;

                ripple.style.left = `${x}px`;

                ripple.style.top = `${y}px`;

                setTimeout(() => {

                    ripple.remove();

                }, 600);

            }
        );

    });

}

/* =========================
   INITIALIZE ANIMATIONS
========================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        fadeInElements();

        initializeRippleEffect();

    }
);