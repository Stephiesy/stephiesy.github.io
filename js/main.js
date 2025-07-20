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

// 漂浮蓝色发光小球
function createFloatingBalls() {
    const container = document.querySelector('.floating-balls');
    for(let i=0;i<8;i++){
        const ball = document.createElement('div');
        ball.className = 'ball';
        const size = 60 + Math.random()*60;
        ball.style.width = ball.style.height = size+'px';
        ball.style.left = Math.random()*100+'vw';
        ball.style.top = Math.random()*100+'vh';
        ball.style.opacity = 0.32 + Math.random()*0.12;
        ball.style.animationDuration = (7+Math.random()*6)+'s';
        container.appendChild(ball);
    }
}
createFloatingBalls();

// 全局漂浮关键词自由游走+旋转，悬停时停止运动并放大
function randomFloat(min, max) { return min + Math.random() * (max - min); }
function floatAllTexts() {
    const texts = document.querySelectorAll('.floating-text-bg .float-text');
    const container = document.querySelector('.hero-section');
    const containerRect = container.getBoundingClientRect();
    const containerW = containerRect.width;
    const containerH = containerRect.height;
    texts.forEach((el, i) => {
        // 随机初始位置
        let left = randomFloat(2, 90); // 百分比
        let top = randomFloat(2, 90);
        el.style.left = left + '%';
        el.style.top = top + '%';
        el.style.fontSize = randomFloat(1.2, 2.5) + 'rem';
        el.style.opacity = randomFloat(0.10, 0.18);
        // 速度和方向
        let dx = randomFloat(-2.5, 2.5), dy = randomFloat(-2.5, 2.5);
        const speed = randomFloat(7, 14);
        const rotSpeed = randomFloat(-0.5, 0.5);
        let t = 0;
        let paused = false;
        let scale = 1;
        // 计算元素自身宽高
        let elW = 0, elH = 0;
        setTimeout(() => {
            elW = el.offsetWidth;
            elH = el.offsetHeight;
        }, 100);
        function animate() {
            if (!paused) {
                t += 0.016;
                // 计算实际像素位置
                let px = (left / 100) * containerW + Math.sin(t / speed * Math.PI * 2 + i) * dx * 120;
                let py = (top / 100) * containerH + Math.cos(t / speed * Math.PI * 2 + i) * dy * 120;
                // 边界检测与回弹
                let bounced = false;
                if (px < 0) { px = 0; dx = Math.abs(dx) * 0.7; bounced = true; }
                if (px + elW > containerW) { px = containerW - elW; dx = -Math.abs(dx) * 0.7; bounced = true; }
                if (py < 0) { py = 0; dy = Math.abs(dy) * 0.7; bounced = true; }
                if (py + elH > containerH) { py = containerH - elH; dy = -Math.abs(dy) * 0.7; bounced = true; }
                // 缓慢回弹（速度变小）
                if (bounced) {
                    // 轻微减速
                    dx *= 0.95;
                    dy *= 0.95;
                }
                el.style.transform = `translate(${px - (left/100)*containerW}px,${py - (top/100)*containerH}px) rotate(${t * rotSpeed * 20}deg) scale(${scale})`;
            }
            requestAnimationFrame(animate);
        }
        el.addEventListener('mouseenter', () => {
            paused = true;
            scale = 1.18;
        });
        el.addEventListener('mouseleave', () => {
            paused = false;
            scale = 1;
        });
        animate();
    });
}
window.addEventListener('DOMContentLoaded', function() {
    floatAllTexts();
});

// 圆角照片轮播
function setupCarousel(id) {
    const carousel = document.getElementById(id);
    if(!carousel) return;
    const imgs = carousel.querySelectorAll('img');
    let idx = 0, timer = null;
    function show(i) {
        imgs.forEach((img,j)=>img.classList.toggle('active',j===i));
        idx = i;
    }
    function next(){ show((idx+1)%imgs.length); }
    function prev(){ show((idx-1+imgs.length)%imgs.length); }
    function start(){ timer = setInterval(next, 2000); }
    function stop(){ clearInterval(timer); }
    carousel.querySelector('.next').onclick = next;
    carousel.querySelector('.prev').onclick = prev;
    // 移除鼠标悬停暂停轮播
    start();
}
setupCarousel('carousel-1');

// 横向照片自动滚动
function setupGallery(cls, dir=1) {
    const gallery = document.querySelector('.'+cls);
    if(!gallery) return;
    let scroll = 0, timer = null;
    function move() {
        scroll += dir*1.5;
        if(scroll > gallery.scrollWidth-gallery.clientWidth) scroll = 0;
        if(scroll < 0) scroll = gallery.scrollWidth-gallery.clientWidth;
        gallery.scrollLeft = scroll;
    }
    function start(){ timer = setInterval(move, 16); }
    function stop(){ clearInterval(timer); }
    gallery.addEventListener('mouseenter', stop);
    gallery.addEventListener('mouseleave', start);
    gallery.querySelectorAll('img').forEach(img=>{
        img.addEventListener('mouseenter', ()=>img.style.transform='scale(1.08)');
        img.addEventListener('mouseleave', ()=>img.style.transform='');
    });
    start();
}
setupGallery('gallery-1', -1); 

// 全屏照片轮播自动切换
function setupBgCarousel(id) {
    const carousel = document.getElementById(id);
    if(!carousel) return;
    const imgs = carousel.querySelectorAll('img');
    let idx = 0, timer = null;
    function show(i) {
        imgs.forEach((img,j)=>img.classList.toggle('active',j===i));
        idx = i;
    }
    function next(){ show((idx+1)%imgs.length); }
    function start(){ timer = setInterval(next, 3000); }
    function stop(){ clearInterval(timer); }
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    start();
}
setupBgCarousel('carousel-bg'); 
setupBgCarousel('carousel-ocean'); 

// 横向自动滚动（从左到右，循环）
function setupAutoScrollGallery(cls, speed = 1.2) {
    const gallery = document.querySelector('.' + cls);
    if (!gallery) return;
    // 只用5张图片，已在HTML中循环排列
    let tx = 0;
    let timer = null;
    const imgs = gallery.querySelectorAll('img');
    const imgW = imgs[0].offsetWidth + parseInt(getComputedStyle(gallery).gap || 0);
    const totalW = imgW * imgs.length;
    function move() {
        tx -= speed;
        if (Math.abs(tx) >= imgW * 2) tx = 0; // 5张里有2张是重复的
        gallery.style.transform = `translateX(${tx}px)`;
    }
    gallery.style.transition = 'none';
    timer = setInterval(move, 16);
}
setupAutoScrollGallery('gallery-ocean-full', 1.2); 

function setupMktFloatingDots() {
    const block = document.querySelector('.mkt-block');
    const dotsContainer = block.querySelector('.mkt-floating-dots');
    const blockRect = block.getBoundingClientRect();
    const W = blockRect.width;
    const H = blockRect.height;
    const dots = [];
    for(let i=0;i<10;i++){
        const dot = document.createElement('div');
        dot.className = 'mkt-dot';
        const size = 18 + Math.random()*32;
        dot.style.width = dot.style.height = size+'px';
        let x = Math.random()*(W-size), y = Math.random()*(H-size);
        let vx = (Math.random()-0.5)*1.2, vy = (Math.random()-0.5)*1.2;
        dot.style.left = x+'px';
        dot.style.top = y+'px';
        dotsContainer.appendChild(dot);
        dots.push({el:dot, x, y, vx, vy, size});
    }
    function animate() {
        for(const d of dots) {
            d.x += d.vx;
            d.y += d.vy;
            if(d.x < 0) { d.x = 0; d.vx *= -1; }
            if(d.x > W-d.size) { d.x = W-d.size; d.vx *= -1; }
            if(d.y < 0) { d.y = 0; d.vy *= -1; }
            if(d.y > H-d.size) { d.y = H-d.size; d.vy *= -1; }
            d.el.style.left = d.x+'px';
            d.el.style.top = d.y+'px';
        }
        requestAnimationFrame(animate);
    }
    animate();
}
function setupCompanyBlock() {
    const block = document.querySelector('.company-block');
    if (!block) return;
    const items = block.querySelectorAll('.company-item');
    const groups = block.querySelectorAll('.company-photo-group');
    function show(company) {
        items.forEach(i => i.classList.toggle('active', i.dataset.company === company));
        groups.forEach(g => g.classList.toggle('active', g.dataset.company === company));
    }
    // 默认显示第一个
    show('xdf');
    items.forEach(item => {
        item.addEventListener('mouseenter', () => show(item.dataset.company));
        item.addEventListener('focus', () => show(item.dataset.company));
        item.addEventListener('click', () => show(item.dataset.company));
    });
}
window.addEventListener('DOMContentLoaded', function() {
    floatAllTexts && floatAllTexts();
    setupMktFloatingDots && setupMktFloatingDots();
    setupCompanyBlock();
}); 
