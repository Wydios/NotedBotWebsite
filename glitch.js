export function applyGlitchEffect(element) {
    if (!element) {
        console.error('Kein Element gefunden für den Glitch-Effekt!');
        return;
    }

    element.addEventListener('mouseover', () => {
        // Füge die Klasse für den Glitch-Effekt hinzu
        element.classList.add('glitch');
    });

    element.addEventListener('mouseout', () => {
        // Entferne die Klasse, wenn der Benutzer das Element verlässt
        element.classList.remove('glitch');
    });
}
