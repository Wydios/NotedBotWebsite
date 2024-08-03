<script>
document.addEventListener('DOMContentLoaded', () => {
    const starfield = document.querySelector('.starfield');
    const starCount = 100; // Anzahl der Sterne

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        starfield.appendChild(star);
    }
});
</script>
