// Carousel functionality
let slideIndex = 1;

function currentSlide(n) {
    showSlide(slideIndex = n);
}

function showSlide(n) {
    let slides = document.querySelectorAll('.carousel-item');
    let buttons = document.querySelectorAll('.carousel-controls button');
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    slides.forEach(slide => {
    slide.classList.remove('active');
    });
    
    buttons.forEach(button => {
    button.classList.remove('active');
    });
    
    slides[slideIndex - 1].classList.add('active', 'fade-in');
    buttons[slideIndex - 1].classList.add('active');
}

// Auto-advance carousel
setInterval(() => {
    slideIndex++;
    if (slideIndex > document.querySelectorAll('.carousel-item').length) {
    slideIndex = 1;
    }
    showSlide(slideIndex);
}, 5000);

// Image comparison slider functionality
function initComparison() {
    const sliders = document.querySelectorAll('.comparison-slider');
    
    sliders.forEach(slider => {
    const handle = slider.querySelector('.slider-handle');
    const overlay = slider.querySelector('.overlay');
    let isResizing = false;

    handle.addEventListener('mousedown', (e) => {
        isResizing = true;
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    });

    function resize(e) {
        if (!isResizing) return;
        
        const sliderRect = slider.getBoundingClientRect();
        const x = e.clientX - sliderRect.left;
        const percent = (x / sliderRect.width) * 100;
        
        if (percent >= 0 && percent <= 100) {
        overlay.style.right = (100 - percent) + '%';
        handle.style.left = percent + '%';
        }
    }

    function stopResize() {
        isResizing = false;
        document.removeEventListener('mousemove', resize);
        document.removeEventListener('mouseup', stopResize);
    }

    // Touch events for mobile
    handle.addEventListener('touchstart', (e) => {
        isResizing = true;
        document.addEventListener('touchmove', resizeTouch);
        document.addEventListener('touchend', stopResize);
    });

    function resizeTouch(e) {
        if (!isResizing) return;
        
        const sliderRect = slider.getBoundingClientRect();
        const x = e.touches[0].clientX - sliderRect.left;
        const percent = (x / sliderRect.width) * 100;
        
        if (percent >= 0 && percent <= 100) {
        overlay.style.right = (100 - percent) + '%';
        handle.style.left = percent + '%';
        }
    }
    });
}

// Initialize comparison sliders when page loads
document.addEventListener('DOMContentLoaded', initComparison);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
        target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
        });
    }
    });
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', function() {
    this.classList.add('fade-in');
    });
});