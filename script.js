document.addEventListener("DOMContentLoaded", function() {
    const starfield = document.querySelector('.starfield');
    const numStars = 100;

    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        starfield.appendChild(star);
    }
});