const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
            entry.target.style.opacity = '1';
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-card, .soft-skill-item, .project-card, .timeline-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.05}s`;
    observer.observe(el);
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.6s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

