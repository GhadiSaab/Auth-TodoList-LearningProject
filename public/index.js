document.addEventListener('DOMContentLoaded', () => {
    const showPopupBtn = document.querySelector(".login_btn");
    const hidePopupBtn = document.querySelector(".form-popup .close-btn");
    const blurBgOverlay = document.querySelector('.blur-bg-overlay');
    const loginSignupLink = document.querySelectorAll(".form-box .bottom-link a")
    const formPopup = document.querySelector(".form-popup")

    if (showPopupBtn) {
        showPopupBtn.addEventListener("click", () => {
            document.body.classList.toggle("show-popup");
        });
    } else {
        console.error("Login button not found");
    }

    if (hidePopupBtn) {
        hidePopupBtn.addEventListener("click", () => {
            document.body.classList.remove("show-popup");
        });
    } else {
        console.error("Close button not found");
    }

    if (blurBgOverlay) {
        blurBgOverlay.addEventListener("click", () => {
            document.body.classList.remove("show-popup");
        });
    } else {
        console.error("Blur background overlay not found");
    }

    loginSignupLink.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            formPopup.classList[link.id === "signup-link" ? "add" : "remove"]("show-signup");
        });
    });
});
