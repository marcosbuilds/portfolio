const header = document.getElementById('header');
const brandNameHeader = document.getElementById('brandNameHeader');
const brandNameHero = document.getElementById('brandNameHero');
const navbarBrand = document.getElementById('navbarBrand');
const dropdownMenu = document.getElementById('dropdownMenu');
let ticking = false;
let menuTimeout = null;
let isMenuPersistent = false;

function showMenu() {
    if (dropdownMenu) {
        dropdownMenu.classList.add('active');
        clearTimeout(menuTimeout);
        isMenuPersistent = false;
    }
}

function hideMenu() {
    if (dropdownMenu && !isMenuPersistent) {
        clearTimeout(menuTimeout);
        menuTimeout = setTimeout(() => {
            if (!isMenuPersistent && dropdownMenu) {
                dropdownMenu.classList.remove('active');
            }
        }, 1000);
    }
}

function keepMenuOpen() {
    isMenuPersistent = true;
    clearTimeout(menuTimeout);
}

function closeMenu() {
    isMenuPersistent = false;
    if (dropdownMenu) {
        dropdownMenu.classList.remove('active');
    }
    clearTimeout(menuTimeout);
}

function initMenuListeners() {
    const navbar = document.querySelector('.navbar');
    const themeToggle = document.querySelector('.theme-toggle');

    if (header && dropdownMenu && navbar) {
        navbar.addEventListener('mouseenter', (e) => {
            const target = e.target;
            const isOnThemeToggle = themeToggle && (themeToggle.contains(target) || target === themeToggle || target.closest('.theme-toggle'));
            if (!isOnThemeToggle) {
                showMenu();
            }
        });

        navbar.addEventListener('mouseleave', (e) => {
            const relatedTarget = e.relatedTarget;
            const isGoingToMenu = dropdownMenu && (dropdownMenu.contains(relatedTarget) || relatedTarget === dropdownMenu);
            const isGoingToThemeToggle = themeToggle && (themeToggle.contains(relatedTarget) || relatedTarget === themeToggle || (relatedTarget && relatedTarget.closest('.theme-toggle')));
            const isStillOnNavbar = navbar && (navbar.contains(relatedTarget) || relatedTarget === navbar);
            
            if (!isGoingToMenu && !isGoingToThemeToggle && !isStillOnNavbar) {
                hideMenu();
            }
        });

        if (navbarBrand) {
            navbarBrand.addEventListener('click', (e) => {
                e.stopPropagation();
                if (dropdownMenu.classList.contains('active')) {
                    closeMenu();
                } else {
                    showMenu();
                }
            });
        }

        dropdownMenu.addEventListener('mouseenter', keepMenuOpen);
        dropdownMenu.addEventListener('mouseleave', closeMenu);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMenuListeners);
} else {
    initMenuListeners();
}

document.addEventListener('click', (e) => {
    if (dropdownMenu && !dropdownMenu.contains(e.target) && 
        (!navbarBrand || !navbarBrand.contains(e.target)) &&
        (!header || !header.contains(e.target))) {
        closeMenu();
    }
});

function updateOnScroll() {
    const currentScroll = window.pageYOffset || window.scrollY || document.documentElement.scrollTop;
    
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
        let target = document.querySelector(href);
        
        if (href === '#neural-engine') {
            target = document.getElementById('neural-engine-card');
        } else if (href === '#other-projects') {
            target = document.getElementById('other-projects-card');
        }
        
        if (target) {
            const headerHeight = headerElement ? headerElement.offsetHeight : 80;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            closeMenu();
        }
    });
});

