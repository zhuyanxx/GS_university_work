// 页面切换功能
function showPage(pageNum) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // 显示目标页面
    document.getElementById(`page${pageNum}`).classList.add('active');
    
    // 滚动到顶部
    window.scrollTo(0, 0);
}

// 创建彩色泡泡浮动效果（更鲜艳）
function createBubbles() {
    const container = document.createElement('div');
    container.className = 'bubble-container';
    document.body.appendChild(container);
    
    // 泡泡颜色类型
    const colors = ['yellow', 'pink', 'blue', 'purple', 'green', 'orange', 'red'];
    
    // 批量创建泡泡（持续生成）
    function addBubble() {
        const bubble = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        bubble.className = `bubble ${color}`;
        
        // 随机大小（10-60px）
        const size = Math.random() * 50 + 10;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`; // 正圆形泡泡
        
        // 随机水平位置
        bubble.style.left = `${Math.random() * 90 + 5}%`;
        
        // 随机动画时长（20-80秒，更慢更柔和）
        const duration = Math.random() * 60 + 20;
        bubble.style.animationDuration = `${duration}s`;
        
        // 随机动画延迟
        bubble.style.animationDelay = `${Math.random() * 10}s`;
        
        container.appendChild(bubble);
        
        // 泡泡飘出屏幕后移除
        setTimeout(() => {
            bubble.remove();
        }, duration * 1000);
    }
    
    // 初始创建25个泡泡（数量增加，更密集）
    for (let i = 0; i < 25; i++) {
        setTimeout(addBubble, i * 500);
    }
    
    // 每隔3秒新增一个泡泡，保持持续效果
    setInterval(addBubble, 3000);
}

// 创建静态爱心背景装饰
function createStaticHearts() {
    const container = document.getElementById('bg-decoration');
    const heartCount = 60; // 爱心数量增加，更丰富
    const heartSizes = [10, 12, 14, 16, 18]; // 增加尺寸种类
    
    // 添加中心装饰文字
    const bgText = document.createElement('div');
    bgText.className = 'bg-text';
    bgText.textContent = '拾光·毕业纪';
    container.appendChild(bgText);

    // 生成随机爱心
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'static-heart';
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        
        // 随机位置
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.left = `${Math.random() * 100}%`;
        
        // 随机大小
        const size = heartSizes[Math.floor(Math.random() * heartSizes.length)];
        heart.style.fontSize = `${size}px`;
        
        // 随机透明度（0.2-0.6，更明显）
        heart.style.opacity = Math.random() * 0.4 + 0.2;
        
        container.appendChild(heart);
    }
}

// 图片预览功能
function previewImage(input) {
    const previewContainer = input.id === 'image-input' 
        ? document.getElementById('preview-container') 
        : document.getElementById('preview-container2') || document.getElementById('preview-container');
    
    // 清空默认提示
    if (previewContainer.innerHTML.includes('上传的照片将在这里预览...')) {
        previewContainer.innerHTML = '';
    }

    const files = input.files;
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-img';
                previewContainer.appendChild(img);
            }
            
            reader.readAsDataURL(file);
        }
    }
}

// 时光轴跳转功能
function showTimelineDetail(year) {
    // 示例：点击时光轴跳转到对应年份的照片集
    alert(`你点击了${year}年的时光轴，可跳转到对应年份的详细回忆页面`);
    // 实际项目中可替换为：
    // showPage(2); // 跳转到照片集页面
    // 或定位到对应照片位置
}

// 打开时光轴图片编辑弹窗
function openTimelineModal(timelineId) {
    document.getElementById('current-timeline-id').value = timelineId;
    document.getElementById('timeline-modal').style.display = 'flex';
    // 清空预览区
    const previewContainer = document.getElementById('timeline-preview-container');
    previewContainer.innerHTML = '<p style="color: rgba(255,255,255,0.7);">上传的照片将在这里预览...</p>';
}

// 关闭时光轴图片编辑弹窗
function closeTimelineModal() {
    document.getElementById('timeline-modal').style.display = 'none';
}

// 更新时光轴图片
function updateTimelineImage(input) {
    const timelineId = document.getElementById('current-timeline-id').value;
    const previewContainer = document.getElementById('timeline-preview-container');
    const timelineImgContainer = document.getElementById(`timeline-img-${timelineId}`);
    
    // 清空默认提示
    if (previewContainer.innerHTML.includes('上传的照片将在这里预览...')) {
        previewContainer.innerHTML = '';
    }

    const files = input.files;
    if (files.length > 0) {
        const file = files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            // 预览图片
            const previewImg = document.createElement('img');
            previewImg.src = e.target.result;
            previewImg.className = 'preview-img';
            previewContainer.appendChild(previewImg);
            
            // 更新时光轴图片
            const timelineImg = timelineImgContainer.querySelector('.timeline-img');
            timelineImg.src = e.target.result;
            timelineImg.alt = `${timelineId}年自定义图片`;
            
            // 提示成功
            alert('时光轴图片更新成功！');
        }
        
        reader.readAsDataURL(file);
    }
}
// ========== 时光轴轮播功能 - 增强版 ==========
// 存储每个时光轴的轮播图片
let carouselImages = {
    '2023': ['./images/1-1-5.jpg', './images/2023-2.jpg', './images/2023-3.jpg'],
    '2024': ['./images/timeline2.jpg', './images/2024-2.jpg'],
    '2025': ['./images/timeline3.jpg', './images/2025-2.jpg'],
    '2026': ['./images/timeline4.jpg', './images/2026-2.jpg']
};

// 存储自动播放定时器
let carouselTimers = {};

// 初始化轮播自动播放
function initCarouselAutoPlay() {
    ['2023', '2024', '2025', '2026'].forEach(year => {
        startCarouselAutoPlay(year);
    });
}

// 开始自动播放
function startCarouselAutoPlay(year) {
    // 先停止已有的定时器
    stopCarouselAutoPlay(year);
    
    // 只有多张图片时才自动播放
    if (carouselImages[year] && carouselImages[year].length > 1) {
        carouselTimers[year] = setInterval(() => {
            carouselNext(year);
        }, 4000); // 4秒切换一次
    }
}

// 停止自动播放
function stopCarouselAutoPlay(year) {
    if (carouselTimers[year]) {
        clearInterval(carouselTimers[year]);
        delete carouselTimers[year];
    }
}

// 上一张
function carouselPrev(year) {
    const carousel = document.getElementById(`carousel-${year}`);
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = document.getElementById(`indicators-${year}`)?.querySelectorAll('.indicator');
    
    let activeIndex = 0;
    items.forEach((item, index) => {
        if (item.classList.contains('active')) activeIndex = index;
    });
    
    const newIndex = (activeIndex - 1 + items.length) % items.length;
    carouselGoTo(year, newIndex);
    
    // 重置自动播放
    stopCarouselAutoPlay(year);
    startCarouselAutoPlay(year);
}

// 下一张
function carouselNext(year) {
    const carousel = document.getElementById(`carousel-${year}`);
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = document.getElementById(`indicators-${year}`)?.querySelectorAll('.indicator');
    
    let activeIndex = 0;
    items.forEach((item, index) => {
        if (item.classList.contains('active')) activeIndex = index;
    });
    
    const newIndex = (activeIndex + 1) % items.length;
    carouselGoTo(year, newIndex);
    
    // 自动播放会在下一轮继续，不需要额外操作
}

// 跳转到指定图片
function carouselGoTo(year, index) {
    const carousel = document.getElementById(`carousel-${year}`);
    if (!carousel) return;
    
    const items = carousel.querySelectorAll('.carousel-item');
    const indicators = document.getElementById(`indicators-${year}`)?.querySelectorAll('.indicator');
    
    if (!items.length || !indicators) return;
    
    // 确保索引有效
    index = Math.min(index, items.length - 1);
    
    // 移除所有active状态
    items.forEach(item => item.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // 设置新的active状态
    items[index].classList.add('active');
    if (indicators[index]) indicators[index].classList.add('active');
    
    // 更新图片数组索引（可选，用于记录）
    console.log(`${year} 切换到第 ${index + 1} 张`);
}

// 更新轮播图片（支持添加多张）
function updateCarouselImages(year, newImageSrc) {
    // 初始化数组（如果不存在）
    if (!carouselImages[year]) {
        carouselImages[year] = [];
    }
    
    // 添加新图片到数组
    carouselImages[year].push(newImageSrc);
    
    const carousel = document.getElementById(`carousel-${year}`);
    if (!carousel) return;
    
    const carouselInner = carousel.querySelector('.carousel-inner');
    const indicatorsContainer = document.getElementById(`indicators-${year}`);
    
    if (!carouselInner || !indicatorsContainer) return;
    
    // 创建新的轮播项
    const newItem = document.createElement('div');
    newItem.className = 'carousel-item';
    newItem.innerHTML = `<img class="timeline-img" src="${newImageSrc}" alt="轮播图片${carouselImages[year].length}">`;
    carouselInner.appendChild(newItem);
    
    // 创建新的指示器
    const newIndicator = document.createElement('span');
    newIndicator.className = 'indicator';
    newIndicator.setAttribute('onclick', `carouselGoTo('${year}', ${carouselImages[year].length - 1}); event.stopPropagation();`);
    indicatorsContainer.appendChild(newIndicator);
    
    // 切换到新图片
    carouselGoTo(year, carouselImages[year].length - 1);
    
    // 重启自动播放
    stopCarouselAutoPlay(year);
    startCarouselAutoPlay(year);
    
    alert(`已为${year}时光轴添加新图片，当前共${carouselImages[year].length}张图片！`);
}

// 修改原有updateTimelineImage函数，支持轮播
function updateTimelineImage(input) {
    const timelineId = document.getElementById('current-timeline-id').value;
    const previewContainer = document.getElementById('timeline-preview-container');

    if (input.files && input.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
            previewContainer.innerHTML = `<img src="${e.target.result}" class="preview-img" style="max-width:200px;">`;
            // 调用轮播更新函数，添加新图片
            updateCarouselImages(timelineId, e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

// 在页面加载完成后初始化自动播放
document.addEventListener('DOMContentLoaded', function() {
    // 等待DOM完全加载后初始化轮播
    setTimeout(() => {
        initCarouselAutoPlay();
    }, 500);
    
    // 鼠标悬停时暂停自动播放
    ['2023', '2024', '2025', '2026'].forEach(year => {
        const carousel = document.getElementById(`carousel-${year}`);
        if (carousel) {
            carousel.addEventListener('mouseenter', () => stopCarouselAutoPlay(year));
            carousel.addEventListener('mouseleave', () => startCarouselAutoPlay(year));
        }
    });
    
    

    // 实时检测输入框，启用/禁用发送按钮
    const messageInput = document.getElementById('graduation-message');
    const sendBtn = document.getElementById('send-btn');
    
    if (messageInput && sendBtn) {
        // 初始状态
        sendBtn.disabled = messageInput.value.trim() === '';
        
        // 监听输入
        messageInput.addEventListener('input', function() {
            sendBtn.disabled = this.value.trim() === '';
        });
    }

    // 点击弹窗外区域关闭弹窗
    window.onclick = function(event) {
        const modal = document.getElementById('timeline-modal');
        if (event.target === modal) {
            closeTimelineModal();
        }
    }
});

// 存储上传的图片
let uploadedImages = [];

// 上传图片功能（带预览和删除）
function uploadImage(input) {
    const files = input.files;
    const imageContainer = document.getElementById('uploaded-images');
    const previewContainer = document.getElementById('preview-container');
    
    // 清空空提示
    if (imageContainer.querySelector('.empty-tip')) {
        imageContainer.querySelector('.empty-tip').remove();
    }
    
    if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // 创建图片项
                const imageItem = document.createElement('div');
                imageItem.className = 'image-item';
                imageItem.dataset.index = uploadedImages.length;
                
                // 图片元素
                const img = document.createElement('img');
                img.src = e.target.result;
                img.alt = `上传的照片${uploadedImages.length + 1}`;
                
                // 删除按钮
                const deleteBtn = document.createElement('div');
                deleteBtn.className = 'delete-img-btn';
                deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
                deleteBtn.onclick = function() {
                    // 删除图片
                    const index = parseInt(this.parentElement.dataset.index);
                    uploadedImages.splice(index, 1);
                    this.parentElement.remove();
                    
                    // 更新剩余图片的索引
                    const allItems = document.querySelectorAll('.image-item');
                    allItems.forEach((item, idx) => {
                        item.dataset.index = idx;
                    });
                    
                    // 如果没有图片了，显示空提示
                    if (allItems.length === 0) {
                        const emptyTip = document.createElement('p');
                        emptyTip.className = 'empty-tip';
                        emptyTip.textContent = '暂无上传的照片，点击下方按钮上传吧～';
                        imageContainer.appendChild(emptyTip);
                    }
                    
                    // 提示
                    alert('照片已删除！');
                };
                
                // 组装元素
                imageItem.appendChild(img);
                imageItem.appendChild(deleteBtn);
                imageContainer.appendChild(imageItem);
                
                // 存储图片
                uploadedImages.push({
                    src: e.target.result,
                    name: file.name
                });
                
                // 清空预览容器的默认提示
                if (previewContainer.innerHTML.includes('上传的照片将在这里预览...')) {
                    previewContainer.innerHTML = '';
                }
                
                // 提示成功
                alert('照片上传成功！');
            }
            
            reader.readAsDataURL(file);
        }
    }
    
    // 清空input值，允许重复上传同一文件
    input.value = '';
}

// 发送寄语功能（文字漂浮）
function sendMessage() {
    const messageInput = document.getElementById('graduation-message');
    const message = messageInput.value.trim();
    const floatingContainer = document.getElementById('floating-text-container');
    
    // 验证输入
    if (!message) {
        alert('请先输入毕业寄语！');
        return;
    }
    
    // 创建漂浮文字
    const floatingText = document.createElement('div');
    floatingText.className = 'floating-text';
    floatingText.textContent = message;
    
    // 随机位置和旋转
    const randomX = Math.random() * 80 + 10; // 10%-90%
    floatingText.style.left = `${randomX}%`;
    
    // 随机颜色（从主题色中选择）
    const colors = [
        'var(--accent-yellow)',
        'var(--accent-pink)',
        'var(--accent-blue)',
        'var(--accent-purple)',
        'var(--secondary-green)'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    floatingText.style.color = randomColor;
    
    // 随机字体大小
    const randomSize = Math.random() * 1 + 1; // 1rem - 2rem
    floatingText.style.fontSize = `${randomSize}rem`;
    
    // 添加到容器
    floatingContainer.appendChild(floatingText);
    
    // 8秒后移除（和动画时长一致）
    setTimeout(() => {
        if (floatingText.parentNode) {
            floatingText.parentNode.removeChild(floatingText);
        }
    }, 8000);
    
    // 清空输入框
    messageInput.value = '';
    
    // 提示
    alert('毕业寄语已发送！愿你的祝福飞向远方～');
}

// 页面加载完成后初始化
window.onload = function() {
    createBubbles(); // 泡泡效果
    createStaticHearts(); // 静态爱心+文字装饰
};
(function() {
    const audio = document.getElementById('bg-audio');
    const musicBtn = document.getElementById('bg-music-control');
    if (!audio) return;

    let isPlaying = false;
    let userInteracted = false;

    audio.loop = true;
    audio.volume = 0.5;

    function playMusic() {
        audio.play().then(() => {
            isPlaying = true;
            if (musicBtn) musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
        }).catch(e => console.log('播放失败', e));
    }

    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        if (musicBtn) musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    }

    function toggleMusic() {
        if (isPlaying) pauseMusic();
        else playMusic();
    }

    // 首次点击页面任意位置自动播放
    document.body.addEventListener('click', function firstClick() {
        if (!userInteracted) {
            userInteracted = true;
            playMusic();
            document.body.removeEventListener('click', firstClick);
        }
    });

    if (musicBtn) {
        musicBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMusic();
        });
    }

    // 预加载
    audio.load();
})();
