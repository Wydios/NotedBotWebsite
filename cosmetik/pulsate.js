// /cosmetik/pulsate.js

export function applyPulsateEffect(element) {
    if (!element) {
        console.error('Kein Element gefunden für Pulsate-Effekt');
        return;
    }

    element.classList.add('pulsate');
}

export function applyFloatEffect(element) {
    if (!element) {
        console.error('Kein Element gefunden für Float-Effekt');
        return;
    }

    element.classList.add('float');
}
