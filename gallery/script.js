// Фильтрация работ
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    // Функция фильтрации
    function filterItems(category) {
        galleryItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
                item.style.animation = 'fadeIn 0.5s forwards';
            } else {
                item.style.display = 'none';
            }
        });
    }
    
    // Обработчики для кнопок фильтра
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Удаляем активный класс у всех кнопок
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Фильтруем элементы
            filterItems(this.dataset.filter);
        });
    });
    
    // Добавляем CSS для анимации
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
});

// Слайдер сравнения
document.querySelectorAll('.comparison-slider').forEach(slider => {
    const before = slider.querySelector('.before-container');
    const handle = slider.querySelector('.slider-handle');
    let isDragging = false;

    handle.addEventListener('mousedown', () => isDragging = true);
    document.addEventListener('mouseup', () => isDragging = false);
    document.addEventListener('mousemove', e => {
        if (!isDragging) return;
        const rect = slider.getBoundingClientRect();
        const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
        const percent = (x / rect.width) * 100;
        before.style.width = `${percent}%`;
    });

    handle.addEventListener('touchstart', () => isDragging = true);
    document.addEventListener('touchend', () => isDragging = false);
    document.addEventListener('touchmove', e => {
        if (!isDragging) return;
        const rect = slider.getBoundingClientRect();
        const x = Math.min(Math.max(e.touches[0].clientX - rect.left, 0), rect.width);
        const percent = (x / rect.width) * 100;
        before.style.width = `${percent}%`;
    });
});
