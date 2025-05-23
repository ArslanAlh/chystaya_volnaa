document.addEventListener('DOMContentLoaded', function() {
    // Анимация заголовка
    gsap.from('.about-hero h1', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Анимация подзаголовка
    gsap.from('.about-hero p', {
        y: 30,
        opacity: 0,
        delay: 0.3,
        duration: 0.8,
        ease: 'power2.out'
    });

    // Постепенное появление элементов
    gsap.from('.feature-list li', {
        x: -30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: 'back.out',
        scrollTrigger: {
            trigger: '.feature-list',
            start: 'top 80%'
        }
    });

    // Анимация сертификатов
    gsap.from('.certificate-card', {
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        scrollTrigger: {
            trigger: '.certificates-section',
            start: 'top 80%'
        }
    });

    // Пульсация спецпредложения
    gsap.to('.special-offer', {
        scale: 1.03,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    // Параллакс эффект для героя
    gsap.to('.about-hero', {
        backgroundPosition: '50% 30%',
        scrollTrigger: {
            trigger: '.about-hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });
});
// Добавьте этот код в конец файла animations.js

// Модальное окно для сертификата
document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы
    const modal = document.getElementById('certificateModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.querySelector('.close');
    
    // Находим все изображения сертификатов
    const certImages = document.querySelectorAll('.certificate-img img');
    
    // Добавляем обработчик клика для каждого изображения
    certImages.forEach(img => {
      img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
      });
    });
    
    // Закрытие по клику на крестик
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    // Закрытие по клику вне изображения
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
      }
    });
  });