// Функция для расчета стоимости
function calculatePrice() {
    // Получаем выбранную услугу
    const serviceSelect = document.getElementById('service-type');
    const servicePrice = parseInt(serviceSelect.value);
    
    // Проверяем, что услуга выбрана
    if (isNaN(servicePrice)) {
        alert('Пожалуйста, выберите услугу');
        return;
    }
    
    // Получаем количество
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    
    // Проверяем срочный заказ
    const isUrgent = document.getElementById('urgent').checked;
    
    // Рассчитываем стоимость
    let totalPrice = servicePrice * quantity;
    
    // Добавляем наценку за срочность
    if (isUrgent) {
        totalPrice *= 1.2; // +20%
    }
    
    // Отображаем результат
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `<i class="fas fa-coins"></i> Итоговая стоимость: ${Math.round(totalPrice)} руб.`;
    
    // Прокручиваем к результату для мобильных устройств
    resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Добавляем обработчик события для формы
document.addEventListener('DOMContentLoaded', function() {
    // Можно добавить обработчики событий для автоматического расчета
    // при изменении значений (опционально)
    document.getElementById('service-type').addEventListener('change', calculatePrice);
    document.getElementById('quantity').addEventListener('input', calculatePrice);
    document.getElementById('urgent').addEventListener('change', calculatePrice);
});