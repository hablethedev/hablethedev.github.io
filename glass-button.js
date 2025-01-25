function initializeGlassEffect(containerSelector, options = {}) {
    const containers = document.querySelectorAll(containerSelector);

    const defaultPhysics = {
        response: 0.12,
        damping: 0.85,
        maxTilt: 25,
        proximity: 300,
    };

    const physics = { ...defaultPhysics, ...options };

    containers.forEach(container => {
        const box = container.querySelector('.glass-box');
        if (!box) return;

        let targetRotX = 0,
            targetRotY = 0,
            currentRotX = 0,
            currentRotY = 0;
        let mouseX = window.innerWidth / 2,
            mouseY = window.innerHeight / 2;

        container.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function updateBoxPosition() {
            const rect = box.getBoundingClientRect();
            return {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2,
            };
        }

        function animate() {
            const boxCenter = updateBoxPosition();
            const deltaX = mouseX - boxCenter.x;
            const deltaY = mouseY - boxCenter.y;
            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

            if (distance < physics.proximity) {
                targetRotY = (deltaX / physics.proximity) * physics.maxTilt;
                targetRotX = -(deltaY / physics.proximity) * physics.maxTilt;

                currentRotX += (targetRotX - currentRotX) * physics.response;
                currentRotY += (targetRotY - currentRotY) * physics.response;

                const translateX = deltaX * 0.15 * (1 - distance / physics.proximity);
                const translateY = deltaY * 0.15 * (1 - distance / physics.proximity);

                box.style.transform = `
                    translate3d(${translateX}px, ${translateY}px, 0)
                    rotateX(${currentRotX}deg)
                    rotateY(${currentRotY}deg)
                    translateZ(${(1 - distance / physics.proximity) * 50}px)
                `;
            } else {
                currentRotX *= physics.damping;
                currentRotY *= physics.damping;

                box.style.transform = `
                    translate3d(0, 0, 0)
                    rotateX(${currentRotX}deg)
                    rotateY(${currentRotY}deg)
                `;
            }

            requestAnimationFrame(animate);
        }
        animate();
    });
}
