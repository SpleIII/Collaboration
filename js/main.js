// main.js - основной файл скриптов

// Эффект курсора
const cursorGlow = document.getElementById('cursorGlow');

// Убеждаемся что курсор скрыт на всем сайте
document.body.style.cursor = 'none';

document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// Скрываем свечение при уходе с окна
document.addEventListener('mouseleave', () => {
    cursorGlow.style.opacity = '0';
});

document.addEventListener('mouseenter', () => {
    cursorGlow.style.opacity = '1';
});

// Эффект при наведении на кликабельные элементы
const clickableElements = document.querySelectorAll('a, button, .theme-toggle');

clickableElements.forEach(element => {
    // Устанавливаем cursor: none для всех кликабельных элементов
    element.style.cursor = 'none';
    
    element.addEventListener('mouseenter', () => {
        cursorGlow.classList.add('hover');
    });
    
    element.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('hover');
    });
});

// Переключение темы
const themeToggle = document.getElementById('themeToggle');
const sunIcon = document.getElementById('sunIcon');
const moonIcon = document.getElementById('moonIcon');

// Проверка сохраненной темы
const savedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);
updateThemeIcons(savedTheme);

themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcons(newTheme);
});

function updateThemeIcons(theme) {
    if (theme === 'light') {
        sunIcon.style.display = 'block';
        moonIcon.style.display = 'none';
    } else {
        sunIcon.style.display = 'none';
        moonIcon.style.display = 'block';
    }
}

// Эффект фона, зависящий от темы
const style = document.createElement('style');
style.textContent = `
    [data-theme="light"] {
        --bg-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    
    [data-theme="dark"] {
        --bg-gradient: linear-gradient(135deg, #2c3e50 0%, #3498db 100%);
    }
`;
document.head.appendChild(style);

// Отключаем кастомный курсор на мобильных устройствах
if (window.innerWidth <= 768) {
    cursorGlow.style.display = 'none';
    document.body.style.cursor = 'auto';
    
    clickableElements.forEach(element => {
        element.style.cursor = 'auto';
    });
}
