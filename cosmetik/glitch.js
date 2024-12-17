export function applyGlitchEffect(element) {
    const glitchEffect = () => {
        element.style.animation = 'glitch 1s infinite';
    };
    
    element.addEventListener('mouseover', glitchEffect); 
    element.addEventListener('mouseout', () => {
        element.style.animation = '';  
    });
}
