fetch('commands.json')
    .then(response => response.json())
    .then(data => {
        const commandsDE = data.DE;
        const commandsUS = data.US;
        let currentLang = 'DE';
        let currentCommands = commandsDE;
        function renderCommands(commands) {
            const container = document.getElementById('command-container');
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

        const toggleLangBtn = document.getElementById('toggle-lang');
        toggleLangBtn.addEventListener('click', () => {
            currentLang = currentLang === 'DE' ? 'US' : 'DE';
            currentCommands = currentLang === 'DE' ? commandsDE : commandsUS;
            toggleLangBtn.textContent = `Sprache wechselt: ${currentLang === 'DE' ? 'EN' : 'DE'}`;
            renderCommands(currentCommands);
        });

        renderCommands(currentCommands);
    })
    .catch(err => console.error('Fehler beim Laden der Commands:', err));
