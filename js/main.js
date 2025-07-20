// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 滚动时显示/隐藏导航栏
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        header.style.transform = 'translateY(-100%)';
    } else {
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
});

// 添加滚动动画
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.querySelectorAll('.portfolio-item, .about-content, .contact-content').forEach((element) => {
    observer.observe(element);
});

// 添加鼠标移动视差效果
document.addEventListener('mousemove', (e) => {
    const noise = document.querySelector('.noise');
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    noise.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
});

// 轮播：个人经历模块
(function() {
    const slides = document.querySelectorAll('.experience-slider .slide');
    const prevBtn = document.querySelector('.slider-controls .prev');
    const nextBtn = document.querySelector('.slider-controls .next');
    let current = 0;
    let timer = null;

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        current = idx;
    }

    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }
    function prevSlide() {
        showSlide((current - 1 + slides.length) % slides.length);
    }

    nextBtn && nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });
    prevBtn && prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });

    function resetTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 5000);
    }
    if (slides.length > 1) {
        resetTimer();
    }
})();

// 悬浮动态元素
(function() {
    const container = document.querySelector('.floating-elements');
    const count = 18;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = 'floating-dot';
        dot.style.left = Math.random() * vw + 'px';
        dot.style.top = (vh + Math.random() * 200) + 'px';
        dot.style.animationDuration = (8 + Math.random() * 8) + 's';
        dot.style.opacity = 0.5 + Math.random() * 0.5;
        dot.style.width = dot.style.height = (8 + Math.random() * 16) + 'px';
        container.appendChild(dot);
    }
})();

// 第一部分：关于我 文字漂浮背景
(function() {
    const words = ['Stephanie', '十一', '11', '诗懿'];
    const container = document.querySelector('.floating-text-bg');
    const wordCount = 18;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const wordEls = [];
    for (let i = 0; i < wordCount; i++) {
        const el = document.createElement('span');
        el.className = 'floating-word';
        el.innerText = words[Math.floor(Math.random() * words.length)];
        // 随机初始位置、大小、角度、透明度
        const size = 2 + Math.random() * 3;
        el.style.fontSize = size + 'rem';
        el.style.left = Math.random() * 90 + 'vw';
        el.style.top = Math.random() * 90 + 'vh';
        el.style.opacity = 0.08 + Math.random() * 0.18;
        el.style.transform = `rotate(${Math.random()*60-30}deg)`;
        el.dataset.angle = Math.random() * 360;
        el.dataset.radius = 30 + Math.random() * 60;
        el.dataset.speed = 0.2 + Math.random() * 0.5;
        el.dataset.baseLeft = parseFloat(el.style.left);
        el.dataset.baseTop = parseFloat(el.style.top);
        el.addEventListener('mouseenter', function() {
            el.style.zIndex = 10;
            el.style.transform += ' scale(1.18)';
            el.style.opacity = 0.35;
        });
        el.addEventListener('mouseleave', function() {
            el.style.zIndex = '';
            el.style.opacity = '';
            el.style.transform = el.style.transform.replace(/scale\([^)]+\)/, '');
        });
        container.appendChild(el);
        wordEls.push(el);
    }
    // 动画运动
    function animate() {
        wordEls.forEach((el, i) => {
            let angle = parseFloat(el.dataset.angle);
            let radius = parseFloat(el.dataset.radius);
            let speed = parseFloat(el.dataset.speed);
            let baseLeft = parseFloat(el.dataset.baseLeft);
            let baseTop = parseFloat(el.dataset.baseTop);
            angle += speed * 0.3;
            el.dataset.angle = angle;
            // 圆形+轻微上下浮动运动
            const x = baseLeft + Math.cos(angle * Math.PI / 180) * radius;
            const y = baseTop + Math.sin(angle * Math.PI / 180) * radius * 0.7 + Math.sin(angle * 0.7 * Math.PI / 180) * 10;
            el.style.left = (x % 100) + 'vw';
            el.style.top = (y % 100) + 'vh';
        });
        requestAnimationFrame(animate);
    }
    animate();
})();

// 第二部分：全屏照片轮播
(function() {
    const slides = document.querySelectorAll('.ocean-slider .ocean-slide');
    const prevBtn = document.querySelector('.ocean-slider-controls .ocean-prev');
    const nextBtn = document.querySelector('.ocean-slider-controls .ocean-next');
    let current = 0;
    let timer = null;
    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
        current = idx;
    }
    function nextSlide() {
        showSlide((current + 1) % slides.length);
    }
    function prevSlide() {
        showSlide((current - 1 + slides.length) % slides.length);
    }
    nextBtn && nextBtn.addEventListener('click', () => {
        nextSlide();
        resetTimer();
    });
    prevBtn && prevBtn.addEventListener('click', () => {
        prevSlide();
        resetTimer();
    });
    function resetTimer() {
        if (timer) clearInterval(timer);
        timer = setInterval(nextSlide, 6000);
    }
    if (slides.length > 1) {
        resetTimer();
    }
})(); 
