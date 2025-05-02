const portfolioItems = document.querySelectorAll('.portfolio-item');

const modal = document.createElement('div');
modal.className = 'image-modal';
modal.style.cssText = `
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    z-index: 1000;
    justify-content: center;
    align-items: center;
`;

modal.innerHTML = `
    <div class="modal-content" style="
        position: relative;
        max-width: 90%;
        max-height: 90vh;
        background: #fff;
        border-radius: 8px;
        overflow: hidden;
    ">
        <span class="close-btn" style="
            position: absolute;
            top: 10px;
            right: 10px;
            cursor: pointer;
            font-size: 28px;
            color: white;
            background: rgba(0,0,0,0.5);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10;
        ">&times;</span>
        <img id="modal-image" style="
            display: block;
            max-width: 100%;
            max-height: calc(90vh - 40px);
            margin: 0 auto;
        ">
        <button class="prev-btn" style="
            position: absolute;
            top: 50%;
            left: 10px;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.7);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        ">&lt;</button>
        <button class="next-btn" style="
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            background: rgba(0,0,0,0.7);
            color: white;
            border: none;
            width: 40px;
            height: 40px;
            font-size: 20px;
            cursor: pointer;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        ">&gt;</button>
    </div>
`;

document.body.appendChild(modal);

let currentImages = [];
let currentIndex = 0;

function showModal(index) {
    currentIndex = index;
    modal.style.display = 'flex';
    document.getElementById('modal-image').src = currentImages[currentIndex].src;
    document.body.style.overflow = 'hidden'; // Блокируем скролл страницы
}

portfolioItems.forEach(item => {
    const images = item.querySelectorAll('img');
    images.forEach((img, index) => {
        img.style.cursor = 'pointer';
        img.addEventListener('click', () => {
            currentImages = Array.from(images);
            showModal(index);
        });
    });
});

// Закрытие модального окна
modal.querySelector('.close-btn').addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Навигация по изображениям
modal.querySelector('.prev-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    document.getElementById('modal-image').src = currentImages[currentIndex].src;
});

modal.querySelector('.next-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentImages.length;
    document.getElementById('modal-image').src = currentImages[currentIndex].src;
});

// Закрытие по клику вне изображения
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Управление клавиатурой
document.addEventListener('keydown', (e) => {
    if (modal.style.display === 'flex') {
        if (e.key === 'Escape') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            document.getElementById('modal-image').src = currentImages[currentIndex].src;
        } else if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % currentImages.length;
            document.getElementById('modal-image').src = currentImages[currentIndex].src;
        }
    }
});