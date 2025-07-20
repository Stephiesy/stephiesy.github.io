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

// 小船进度动画
const boat = document.getElementById('boat');
const lineNodes = document.querySelectorAll('.vertical-line.left .line-node');
const blocks = document.querySelectorAll('.block');
let currentBlock = 0;

function updateBoatPosition() {
    const scrollY = window.scrollY;
    const wh = window.innerHeight;
    let totalHeight = 0;
    let blockTops = [];
    blocks.forEach((block, i) => {
        const rect = block.getBoundingClientRect();
        const top = rect.top + scrollY;
        blockTops.push(top);
        totalHeight += block.offsetHeight;
    });
    let percent = 0;
    if (scrollY < blockTops[1] - wh/2) {
        // block1
        percent = (scrollY) / (blockTops[1] - wh/2);
        boat.style.left = '50%';
        boat.style.top = `calc(${percent*100}% - 20px)`;
    } else if (scrollY < blockTops[2] - wh/2) {
        // block2 横向移动
        boat.style.top = `calc(100% - 20px)`;
        let hPercent = (scrollY - (blockTops[1] - wh/2)) / ((blockTops[2] - wh/2) - (blockTops[1] - wh/2));
        boat.style.left = `calc(50% + ${(window.innerWidth-72)/2 * hPercent}px)`;
    } else {
        // block3
        boat.style.left = 'calc(50vw)';
        let vPercent = (scrollY - (blockTops[2] - wh/2)) / (document.body.scrollHeight - blockTops[2]);
        boat.style.top = `calc(${vPercent*100}% - 20px)`;
    }
}
window.addEventListener('scroll', updateBoatPosition);
window.addEventListener('resize', updateBoatPosition);
setTimeout(updateBoatPosition, 500);

// 漂浮蓝色球
function createFloatingBalls() {
    const container = document.querySelector('.floating-balls');
    for(let i=0;i<8;i++){
        const ball = document.createElement('div');
        ball.className = 'ball';
        const size = 60 + Math.random()*60;
        ball.style.width = ball.style.height = size+'px';
        ball.style.left = Math.random()*100+'vw';
        ball.style.top = Math.random()*100+'vh';
        ball.style.opacity = 0.35 + Math.random()*0.15;
        ball.style.animationDuration = (10+Math.random()*8)+'s';
        container.appendChild(ball);
    }
}
createFloatingBalls();

// 漂浮关键词
function floatKeywords() {
    const keywords = document.querySelectorAll('.floating-keywords span');
    const sizes = ['size1','size2','size3'];
    keywords.forEach((kw,i)=>{
        kw.classList.add(sizes[Math.floor(Math.random()*sizes.length)]);
        kw.style.left = (10 + Math.random()*80) + '%';
        kw.style.top = (10 + Math.random()*60) + 'px';
        kw.style.animationDelay = (Math.random()*6)+'s';
        kw.addEventListener('mouseenter', ()=>{
            kw.style.animationPlayState = 'paused';
        });
        kw.addEventListener('mouseleave', ()=>{
            kw.style.animationPlayState = '';
        });
    });
}
floatKeywords();

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
    function start(){ timer = setInterval(next, 3500); }
    function stop(){ clearInterval(timer); }
    carousel.querySelector('.next').onclick = next;
    carousel.querySelector('.prev').onclick = prev;
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    start();
}
setupCarousel('carousel-1');
setupCarousel('carousel-2');

// 横向照片自动滚动
function setupGallery(cls, dir=1) {
    const gallery = document.querySelector('.'+cls);
    if(!gallery) return;
    let scroll = 0, timer = null;
    function move() {
        scroll += dir*1.2;
        if(scroll > gallery.scrollWidth-gallery.clientWidth) scroll = 0;
        if(scroll < 0) scroll = gallery.scrollWidth-gallery.clientWidth;
        gallery.scrollLeft = scroll;
    }
    function start(){ timer = setInterval(move, 20); }
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
setupGallery('gallery-2', 1); 
