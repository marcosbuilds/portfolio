const themes = ['orange', 'blue', 'purple', 'pink', 'green', 'default'];
let currentThemeIndex = 0;

const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme !== null) {
    const index = themes.indexOf(savedTheme);
    if (index !== -1) {
        currentThemeIndex = index;
        body.setAttribute('data-theme', themes[currentThemeIndex]);
    } else {
        body.setAttribute('data-theme', 'orange');
        currentThemeIndex = 0;
    }
} else {
    body.setAttribute('data-theme', 'orange');
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        currentThemeIndex = (currentThemeIndex + 1) % themes.length;
        const newTheme = themes[currentThemeIndex];
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = '';
        }, 300);
    });
}

