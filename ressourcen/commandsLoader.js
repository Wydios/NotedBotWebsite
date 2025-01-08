import { commandsDE, commandsUS } from 'commandsexport.js';

const container = document.getElementById('command-container');
const toggleLangBtn = document.getElementById('toggle-lang');

let currentLang = 'DE'; 
let currentCommands = commandsDE;

function renderCommands(commands) {
    container.innerHTML = ''; 
    commands.forEach(cmd => {
        const commandDiv = document.createElement('div');
        commandDiv.classList.add('command');
        commandDiv.innerHTML = `
            <h3>${cmd.name}</h3>
            <p><strong>Aliases:</strong> ${cmd.aliases.join(', ')}</p>
            <p><strong>Beschreibung:</strong> ${cmd.description}</p>
            <p><strong>Verwendung:</strong> ${cmd.usage}</p>
            <p><strong>Kategorie:</strong> ${cmd.category}</p>
        `;
        container.appendChild(commandDiv);
    });
}
toggleLangBtn.addEventListener('click', () => {
    currentLang = currentLang === 'DE' ? 'US' : 'DE';
    currentCommands = currentLang === 'DE' ? commandsDE : commandsUS;
    toggleLangBtn.textContent = `Sprache wechseln: ${currentLang === 'DE' ? 'EN' : 'DE'}`;
    renderCommands(currentCommands);
});

renderCommands(currentCommands);
