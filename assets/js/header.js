const header = document.getElementById('header');
const brandNameHeader = document.getElementById('brandNameHeader');
const brandNameHero = document.getElementById('brandNameHero');
let ticking = false;

function updateOnScroll() {
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 100) {
            header.classList.add('scrolled');
            if (brandNameHeader) {
                brandNameHeader.classList.remove('hidden');
            }
            if (brandNameHero) {
                brandNameHero.style.opacity = '0';
                brandNameHero.style.transform = 'translateY(-20px)';
            }
        } else {
            header.classList.remove('scrolled');
            if (brandNameHeader) {
                brandNameHeader.classList.add('hidden');
            }
            if (brandNameHero) {
                brandNameHero.style.opacity = '1';
                brandNameHero.style.transform = 'translateY(0)';
            }
        }
    }
    
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
}, { passive: true });

const headerElement = document.getElementById('header');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const headerHeight = headerElement ? headerElement.offsetHeight : 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

