// /cosmetik/pulsate.js

export function applyPulsateEffect(element) {
    if (!element) {
        console.error('Kein Element gefunden für den Puls-Effekt!');
        return;
    }
    element.addEventListener('mouseover', () => {
        element.classList.add('pulsate');
    });
    element.addEventListener('mouseout', () => {
        element.classList.remove('pulsate');
    });
}
