document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

document.documentElement.style.visibility = 'hidden';
window.addEventListener('load', () => {
    document.documentElement.style.visibility = 'visible';
});

