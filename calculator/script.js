// Объект для хранения выбранных услуг
const selectedServices = {};

// Функция обновления списка выбранного
function updateSelectedList() {
    const selectedList = document.getElementById('selectedItems');
    let html = '';
    
    const hasItems = Object.values(selectedServices).some(item => item.qty > 0);
    
    if (!hasItems) {
        html = '<p style="text-align: center; color: rgba(60, 60, 67, 0.3);">Добавьте услуги</p>';
    } else {
        html = '<ul>';
        for (const [name, item] of Object.entries(selectedServices)) {
            if (item.qty > 0) {
                html += `
                    <li>
                        <span>${name} × ${item.qty}</span>
                        <strong>${(item.qty * item.price).toLocaleString()} ₽</strong>
                    </li>
                `;
            }
        }
        html += '</ul>';
    }
    
    selectedList.innerHTML = html;
    calculateTotal();
}

// Функция расчета общей суммы (без GSAP)
function calculateTotal() {
    let total = 0;
    
    for (const item of Object.values(selectedServices)) {
        total += item.qty * item.price;
    }
    
    // Добавляем 20% за срочный заказ
    if (document.getElementById('urgent').checked) {
        total *= 1.2;
    }
    
    const totalElement = document.getElementById('totalPrice');
    totalElement.textContent = Math.round(total).toLocaleString();
    
    // Простая анимация без GSAP
    totalElement.style.transform = 'scale(1.1)';
    totalElement.style.color = '#34c759';
    setTimeout(() => {
        totalElement.style.transform = 'scale(1)';
        totalElement.style.color = 'white';
    }, 300);
}

// Обработчики кнопок "+" и "-"
document.querySelectorAll('.qty-plus, .qty-minus').forEach(button => {
    button.addEventListener('click', function() {
        const input = this.parentElement.querySelector('.qty-input');
        const price = parseInt(this.getAttribute('data-price'));
        const name = this.getAttribute('data-name');
        
        // Простая анимация кнопки без GSAP
        this.style.transform = 'scale(0.9)';
        setTimeout(() => { this.style.transform = 'scale(1)'; }, 100);
        
        if (!selectedServices[name]) {
            selectedServices[name] = { price: price, qty: 0 };
        }
        
        if (this.classList.contains('qty-plus')) {
            input.value = ++selectedServices[name].qty;
        } else if (input.value > 0) {
            input.value = --selectedServices[name].qty;
        }
        
        updateSelectedList();
    });
});

// Обработчик ручного ввода
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
document.getElementById('urgent').addEventListener('change', function() {
    calculateTotal();
    
    // Простая анимация без GSAP
    if (this.checked) {
        this.parentElement.style.backgroundColor = 'rgba(255, 204, 0, 0.2)';
    } else {
        this.parentElement.style.backgroundColor = 'rgba(255, 204, 0, 0.1)';
    }
});

// Инициализация
document.addEventListener('DOMContentLoaded', updateSelectedList);