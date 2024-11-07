(function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    const currentLocation = document.location.href;

    navLinks.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });
})();