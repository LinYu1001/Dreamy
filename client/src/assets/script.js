document.addEventListener('DOMContentLoaded', () => {

    // 1. 滾動進場動畫 (Scroll Reveal)
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    
    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;

        // 判斷元素頂部是否在視窗的 (視窗高度 / dividend) 範圍內
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 2)) { // 元素進入視窗 80% 時觸發
                el.classList.add('active');
            } else {
                // 可選：滾出視窗後重置動畫 (如果需要重複播放)
                // el.classList.remove('active'); 
            }
        });
    };

    // 初始載入和滾動時檢查
    window.addEventListener('scroll', handleScrollAnimation);
    handleScrollAnimation(); // 網頁載入時先執行一次

    // 2. 首頁 Banner 輕微視差滾動 (Parallax)
    const heroBanner = document.querySelector('.hero-banner');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // 向上滾動時，背景圖輕微向下移動 (造成視差效果)
        // 數值 (e.g., 0.3) 控制移動速度，數字越小，效果越輕微
        if (heroBanner) {
            heroBanner.style.backgroundPositionY = `${scrollPosition * 0.3}px`;
        }
    });

    // 3. 按鈕滑入漸變色 (可選：CSS 已經實現基礎 hover 效果)
    // 如果要實現更複雜的漸變，需要使用 JS 或更進階的 CSS 技巧。
    // 這裡維持基礎的 CSS transition，看起來更簡潔。
});

