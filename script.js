// 100% gpt und ich weiß nicht mal was das ist 
document.addEventListener('DOMContentLoaded', () => {
    const starfield = document.querySelector('.starfield');
    const starCount = 100; 

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        starfield.appendChild(star);
    }
});

