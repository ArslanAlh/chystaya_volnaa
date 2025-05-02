// Обработка формы обратной связи
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Здесь можно добавить отправку данных на сервер
    // Например, через fetch или AJAX
    
    // Показываем сообщение об успехе
    document.getElementById('successMessage').style.display = 'block';
    
    // Очищаем форму
    this.reset();
    
    // Скрываем сообщение через 5 секунд
    setTimeout(function() {
        document.getElementById('successMessage').style.display = 'none';
    }, 5000);
});
