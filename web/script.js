document.addEventListener('DOMContentLoaded', (event) => {
    const scrollDownButton = document.querySelector('.scroll-down')
    const scrollToLinks = document.querySelectorAll('.scroll-to')
    const mainContent = document.querySelector('.main-content')

    function easeInOutExpo(t, b, c, d) {
        t /= d / 2
        if (t < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b
        t--
        return c / 2 * (-Math.pow(2, -10 * t) + 2) + b
    }

    function smoothScroll(targetElement, duration = 1000) {
        const startPosition = window.pageYOffset
        const targetPosition = targetElement.offsetTop
        const distance = targetPosition - startPosition
        let startTime = null

        function animation(currentTime) {
            if (startTime === null) startTime = currentTime
            const elapsed = currentTime - startTime
            const t = easeInOutExpo(elapsed / duration, 0, 1, 1)
            const newPosition = startPosition + (distance * t)
            window.scrollTo(0, newPosition)
            if (elapsed < duration) {
                requestAnimationFrame(animation)
            } else {
                window.scrollTo(0, targetPosition)
            }
        }
        // start animation immediately
        requestAnimationFrame(() => {
            animation(performance.now())
        })
    }

    if (scrollDownButton) {
        scrollDownButton.addEventListener('click', () => {
            smoothScroll(mainContent)
        })
    }

    scrollToLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault()
            const targetElement = document.querySelector(`#${link.getAttribute('data-target')}`)
            if (targetElement) smoothScroll(targetElement)
        })
    })
})
