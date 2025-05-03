        // JavaScript для слайдера сравнения
        document.querySelectorAll('.comparison-slider').forEach(slider => {
            const before = slider.querySelector('.before-container');
            const handle = slider.querySelector('.slider-handle');
            let isDragging = false;

            // Обработчики событий для десктопов
            handle.addEventListener('mousedown', () => isDragging = true);
            document.addEventListener('mouseup', () => isDragging = false);
            document.addEventListener('mousemove', e => {
                if (!isDragging) return;
                const rect = slider.getBoundingClientRect();
                const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
                const percent = (x / rect.width) * 100;
                before.style.width = `${percent}%`;
            });

            // Обработчики для мобильных устройств
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

        // Фильтрация работ
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                // Удаляем активный класс у всех кнопок
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                    b.style.transform = '';
                    b.style.boxShadow = '';
                });
                
                // Добавляем активный класс текущей кнопке
                btn.classList.add('active');
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = '0 4px 12px rgba(44, 123, 229, 0.4)';
                
                // Фильтруем элементы галереи
                const filter = btn.dataset.filter;
                document.querySelectorAll('.gallery-item').forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        // Плавное появление элементов при загрузке
        document.addEventListener('DOMContentLoaded', () => {
            const items = document.querySelectorAll('.gallery-item');
            items.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 100 * index);
            });
        });

        // Добавляем анимацию fadeIn
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(10px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
