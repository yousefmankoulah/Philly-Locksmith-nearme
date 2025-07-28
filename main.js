        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent default jump behavior
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth' // Smooth scroll animation
                    });

                    // Close mobile menu if open after navigation
                    const mobileMenu = document.getElementById('mobile-menu');
                    if (!mobileMenu.classList.contains('hidden')) {
                        mobileMenu.classList.add('hidden');
                        mobileMenuButton.setAttribute('aria-expanded', 'false'); // Update ARIA attribute
                    }
                }
            });
        });

        // Mobile menu toggle functionality.
        // Handles opening and closing the full-screen mobile navigation.
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const closeMobileMenuButton = document.getElementById('close-mobile-menu');

        // Event listener for opening the mobile menu.
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.remove('hidden'); // Show the mobile menu
            mobileMenuButton.setAttribute('aria-expanded', 'true'); // Update ARIA attribute for accessibility
        });

        // Event listener for closing the mobile menu.
        closeMobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.add('hidden'); // Hide the mobile menu
            mobileMenuButton.setAttribute('aria-expanded', 'false'); // Update ARIA attribute
        });



         $('#quoteForm').submit(function(e) {
    e.preventDefault(); // Prevent normal form submission
    $.ajax({
      url: 'sendmail.php',
      type: 'POST',
      data: $(this).serialize(),
      success: function(response) {
        alert('Message sent successfully!');
        $('#quoteModal').modal('hide');
        $('#quoteForm')[0].reset();
      },
      error: function() {
        alert('Failed to send message.');
      }
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
