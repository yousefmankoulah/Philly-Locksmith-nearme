document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault(); // Prevent default jump behavior
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth", // Smooth scroll animation
      });

      // Close mobile menu if open after navigation
      const mobileMenu = document.getElementById("mobile-menu");
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.setAttribute("aria-expanded", "false"); // Update ARIA attribute
      }
    }
  });
});

// Mobile menu toggle functionality.
// Handles opening and closing the full-screen mobile navigation.
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const closeMobileMenuButton = document.getElementById("close-mobile-menu");

// Event listener for opening the mobile menu.
mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.remove("hidden"); // Show the mobile menu
  mobileMenuButton.setAttribute("aria-expanded", "true"); // Update ARIA attribute for accessibility
});

// Event listener for closing the mobile menu.
closeMobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.add("hidden"); // Hide the mobile menu
  mobileMenuButton.setAttribute("aria-expanded", "false"); // Update ARIA attribute
});

$("#quoteForm2").submit(function (e) {
  e.preventDefault(); // Prevent normal form submission
  $.ajax({
    url: "sendmail.php",
    type: "POST",
    data: $(this).serialize(),
    success: function (response) {
      alert("Message sent successfully!");
      $("#quoteModal").modal("hide");
      $("#quoteForm")[0].reset();
    },
    error: function () {
      alert("Failed to send message.");
    },
  });
});

$(window).scroll(function () {
  if ($(this).scrollTop() > 600) {
    $(".back-to-top").css("visibility", "visible");
    $(".custom-btn-2").css("visibility", "visible");
  } else {
    $(".back-to-top").css("visibility", "hidden");
    $(".custom-btn-2").css("visibility", "visible");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // Open modal
  document.querySelectorAll("[data-modal-target]").forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal-target");
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove("hidden");
        document.body.classList.add("modal-open");
      }
    });
  });

  // Close modal
  document.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", () => {
      const modal = button.closest(".fixed");

      if (modal) {
        modal.classList.add("hidden");
        document.body.classList.remove("modal-open");
      }
    });
  });

  // Close when clicking outside modal content
  document.querySelectorAll(".fixed.inset-0").forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.add("hidden");
        document.body.classList.remove("modal-open");
      }
    });
  });

  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault(); // Prevent default form submission

      const formData = new FormData(form);

      try {
        const response = await fetch("sendmail.php", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          alert("Message sent successfully!");
          document.getElementById("quoteModal").classList.add("hidden");
          document.body.classList.remove("modal-open");
          form.reset();
        } else {
          alert("Failed to send message.");
        }
      } catch (error) {
        console.error("AJAX error:", error);
        alert("An error occurred while sending the message.");
      }
    });
  }
});

// adding reCAPTCHA

var widgetId; // To store the reCAPTCHA widget ID

// This function runs when the reCAPTCHA API is loaded
var onloadCallback = function () {
  widgetId = grecaptcha.render("recaptcha-invisible-container", {
    sitekey: "6LeyH5YrAAAAACo4_YecluIQ55OkoYeyC7S_LqIV",
    size: "invisible",
    callback: onRecaptchaSuccess, // This callback receives the token
  });
  console.log("reCAPTCHA invisible widget rendered with ID:", widgetId);
};

function triggerProtectedAction() {
  // Execute reCAPTCHA when the action is about to happen
  grecaptcha.execute(widgetId);
}

function onRecaptchaSuccess(token) {
  console.log("reCAPTCHA token:", token);
  sendTokenToServer(token);
}

function sendTokenToServer(token) {
  fetch("/verify-recaptcha", {
    // Your server-side endpoint
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recaptchaToken: token }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        console.log("reCAPTCHA verified on server!", data.message);
        // Proceed with your action
      } else {
        console.error("reCAPTCHA verification failed on server:", data.message);
        // Handle error
      }
    })
    .catch((error) => {
      console.error("Error sending token to server:", error);
    });
}
