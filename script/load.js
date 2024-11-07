(function () {
    window.addEventListener('load', function () {
        const loadTime = performance.now();
        const loadTimeElement = document.createElement('p');
        loadTimeElement.style.fontSize = '0.8em';
        loadTimeElement.style.color = '#666';
        loadTimeElement.textContent = `Время загрузки страницы: ${loadTime.toFixed(2)} мс`;
        const footer = document.querySelector('footer');
        if (footer) {
            footer.appendChild(loadTimeElement);
        }
    });
})();
