document.addEventListener('DOMContentLoaded', async () => {
    const commandContainer = document.getElementById('command-container');
    const toggleLangBtn = document.getElementById('toggle-lang');
    let currentLang = 'DE'; 

    const fetchCommands = async () => {
        try {
            const response = await fetch('ressourcen/commands.json');
            if (!response.ok) throw new Error('Fehler beim Laden der Commands');
            return await response.json();
        } catch (error) {
            console.error('Fehler beim Laden der Commands:', error);
            return [];
        }
    };

    const renderCommands = (commands) => {
        commandContainer.innerHTML = ''; 
        commands.forEach((command) => {
            const commandElement = document.createElement('div');
            commandElement.classList.add('command');
            commandElement.innerHTML = `
                <h3>${command.name}</h3>
                <p><strong>${currentLang === 'DE' ? 'Beschreibung' : 'Description'}:</strong> ${currentLang === 'DE' ? command.descriptionDE : command.descriptionUS}</p>
                <p><strong>${currentLang === 'DE' ? 'Benutzung' : 'Usage'}:</strong> ${currentLang === 'DE' ? command.usageDE : command.usageUS}</p>
                <p><strong>Kategorie:</strong> ${command.category}</p>
                ${command.aliases.length > 0 ? `<p><strong>Aliase:</strong> ${command.aliases.join(', ')}</p>` : ''}
            `;
            commandContainer.appendChild(commandElement);
        });
    };

    toggleLangBtn.addEventListener('click', () => {
        currentLang = currentLang === 'DE' ? 'EN' : 'DE';
        toggleLangBtn.textContent = `Sprache wechseln: ${currentLang === 'DE' ? 'EN' : 'DE'}`;
        fetchCommands().then(renderCommands); 
    });
    const commands = await fetchCommands();
    renderCommands(commands);
});
