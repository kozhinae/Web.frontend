(function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentLocation = document.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentLocation.split('/').pop()) {
            link.classList.add('active');
        }
    });
})();