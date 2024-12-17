// kosmetik/glitch.js
export function applyGlitchEffect(element) {
    const glitchEffect = () => {
        element.classList.add('glitch');
    };

    const removeGlitchEffect = () => {
        element.classList.remove('glitch');
    };

    element.addEventListener('mouseover', glitchEffect);  
    element.addEventListener('mouseout', removeGlitchEffect);  
}
