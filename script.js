document.addEventListener('DOMContentLoaded', () => {
    
    // 1. ПЕРЕКЛЮЧЕНИЕ СТРАНИЦ (Твой код)
    const navItems = document.querySelectorAll('.menu-item');
    const views = document.querySelectorAll('.view');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            item.style.transform = 'scale(0.95)';
            setTimeout(() => item.style.transform = 'scale(1)', 100);

            navItems.forEach(i => i.classList.remove('active'));
            views.forEach(v => v.classList.remove('active'));

            item.classList.add('active');
            const target = item.getAttribute('data-page');
            const targetEl = document.getElementById(target);
            if(targetEl) targetEl.classList.add('active');
        });
    });

    // 2. ЦИТАТЫ (Твой код)
    const quotes = [
        "«8Б — это когда ты не выучил, но сдал на 5».",
        "«В нашей ДНК — хаос и гениальность».",
        "«Тишина в классе — это признак того, что у всех сел телефон».",
        "«Мы — легенды, о которых будут шептаться в столовой»."
    ];

    const quoteEl = document.getElementById('dynamic-quote');
    if(quoteEl) quoteEl.innerText = quotes[Math.floor(Math.random() * quotes.length)];

    // 3. ЗАДАЧИ (Твой код)
    const tasks = document.querySelectorAll('.task-card input');
    tasks.forEach(task => {
        task.addEventListener('change', () => {
            task.parentElement.style.opacity = task.checked ? '0.4' : '1';
        });
    });

    // --- НОВОЕ: ФУНКЦИЯ ЖИВЫХ ЧАСОВ ---
    function updateClock() {
        const timeElement = document.getElementById('current-time');
        const dateElement = document.getElementById('current-date');
        
        if (timeElement && dateElement) {
            const now = new Date();
            
            // Время в формате 00:00:00
            timeElement.textContent = now.toLocaleTimeString('ru-RU', { hour12: false });
            
            // Дата в формате: MONDAY, 16 FEB
            const options = { weekday: 'long', day: 'numeric', month: 'short' };
            dateElement.textContent = now.toLocaleDateString('en-US', options).toUpperCase();
        }
    }

    // --- НОВОЕ: СИМУЛЯЦИЯ НАГРУЗКИ СИСТЕМЫ ---
    function simulateSystemLoad() {
        const fills = document.querySelectorAll('.fill');
        
        fills.forEach(fill => {
            // Генерируем случайное число от 30 до 90 для имитации активности
            const randomLoad = Math.floor(Math.random() * (90 - 30 + 1)) + 30;
            fill.style.width = randomLoad + '%';
        });
    }

    // Запускаем часы сразу и ставим интервал 1 секунда
    updateClock();
    setInterval(updateClock, 1000);

    // Запускаем обновление полосок нагрузки каждые 3 секунды
    setInterval(simulateSystemLoad, 3000);
});
