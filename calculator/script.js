// Объект для хранения выбранных услуг
const selectedServices = {};

// Функция обновления списка выбранного
function updateSelectedList() {
    const selectedList = document.getElementById('selectedItems');
    let html = '';
    
    // Проверяем, есть ли выбранные услуги
    const hasItems = Object.values(selectedServices).some(item => item.qty > 0);
    
    if (!hasItems) {
        html = '<p><em>Добавьте услуги</em></p>';
    } else {
        html = '<ul>';
        for (const [name, item] of Object.entries(selectedServices)) {
            if (item.qty > 0) {
                html += `
                    <li>
                        <span>${name} × ${item.qty}</span>
                        <strong>${item.qty * item.price} руб.</strong>
                    </li>
                `;
            }
        }
        html += '</ul>';
    }
    
    selectedList.innerHTML = html;
    calculateTotal();
}

// Функция расчета общей суммы
function calculateTotal() {
    let total = 0;
    
    for (const item of Object.values(selectedServices)) {
        total += item.qty * item.price;
    }
    
    // Добавляем 20% за срочный заказ
    if (document.getElementById('urgent').checked) {
        total *= 1.2;
    }
    
    document.getElementById('totalPrice').textContent = Math.round(total);
}

// Обработчики кнопок "+" и "-"
document.querySelectorAll('.qty-plus, .qty-minus').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('.qty-input');
        const price = parseInt(this.getAttribute('data-price'));
        const name = this.getAttribute('data-name');
        
        // Инициализируем услугу, если её ещё нет
        if (!selectedServices[name]) {
            selectedServices[name] = { price: price, qty: 0 };
        }
        
        // Изменяем количество
        if (this.classList.contains('qty-plus')) {
            input.value = ++selectedServices[name].qty;
        } else if (input.value > 0) {
            input.value = --selectedServices[name].qty;
        }
        
        updateSelectedList();
    });
});

// Обработчик ручного ввода количества
document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', function() {
        const price = this.parentElement.querySelector('.qty-plus').getAttribute('data-price');
        const name = this.parentElement.querySelector('.qty-plus').getAttribute('data-name');
        const qty = parseInt(this.value) || 0;
        
        if (!selectedServices[name]) {
            selectedServices[name] = { price: parseInt(price), qty: 0 };
        }
        
        selectedServices[name].qty = qty;
        updateSelectedList();
    });
});

// Обработчик срочного заказа
document.getElementById('urgent').addEventListener('change', calculateTotal);

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', updateSelectedList);