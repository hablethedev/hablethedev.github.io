document.addEventListener('DOMContentLoaded', () => {
    const scrollDownButton = document.querySelector('.glass-box');
    const scrollToLinks = document.querySelectorAll('.scroll-to');
    const mainContent = document.querySelector('.main-content');

    function easeInOutExpo(t) {
        return t < 0.5
            ? Math.pow(2, 10 * (t - 1)) * 0.5
            : (2 - Math.pow(2, -10 * (t - 0.5))) * 0.5;
    }

    function smoothScroll(targetElement, duration = 1000) {
        const startPosition = window.pageYOffset;
        const targetPosition = targetElement.getBoundingClientRect().top;
        const startTime = performance.now();

        function animation(currentTime) {
            const elapsed = currentTime - startTime;
            const t = Math.min(elapsed / duration, 1);
            const eased = easeInOutExpo(t);
            const newPosition = startPosition + eased * targetPosition;

            window.scrollTo(0, newPosition);

            if (elapsed < duration) {
                requestAnimationFrame(animation);
            }
        }

        requestAnimationFrame(animation);
    }

    if (scrollDownButton) {
        scrollDownButton.addEventListener('click', () => {
            smoothScroll(mainContent);
        });
    }

    scrollToLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetElement = document.querySelector(`#${link.getAttribute('data-target')}`);
            if (targetElement) smoothScroll(targetElement);
        });
    });
});
