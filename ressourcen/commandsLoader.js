document.addEventListener('DOMContentLoaded', async () => {
    const commandContainer = document.getElementById('command-container');
    const toggleLangBtn = document.getElementById('toggle-lang');
    const searchBar = document.getElementById('search-bar');
    const categoryFilter = document.getElementById('category-filter');
    let currentLang = 'DE'; 
    let commands = []; 
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
    const renderCommands = (filteredCommands) => {
        commandContainer.innerHTML = ''; 
        if (filteredCommands.length === 0) {
            commandContainer.innerHTML = '<p>Keine Commands gefunden.</p>';
            return;
        }
        filteredCommands.forEach((command) => {
            const commandElement = document.createElement('div');
            commandElement.classList.add('command');
            commandElement.innerHTML = `
                <h3>
                    ${command.icon ? `<img src="${command.icon}" alt="${command.name} Icon" class="command-link">` : ''}
                    ${command.name}
                </h3>
                <p><strong>${currentLang === 'DE' ? 'Beschreibung' : 'Description'}:</strong> ${currentLang === 'DE' ? command.descriptionDE : command.descriptionUS}</p>
                <p><strong>${currentLang === 'DE' ? 'Benutzung' : 'Usage'}:</strong> ${currentLang === 'DE' ? command.usageDE : command.usageUS}</p>
                <p><strong>Kategorie:</strong> ${command.category}</p>
                ${command.aliases.length > 0 ? `<p><strong>Aliase:</strong> ${command.aliases.join(', ')}</p>` : ''}
            `;
            commandContainer.appendChild(commandElement);
        });
    };

    const applyFilters = () => {
        const searchTerm = searchBar.value.toLowerCase();
        const selectedCategory = categoryFilter.value;
        const filteredCommands = commands.filter((command) => {
            const matchesSearch = command.name.toLowerCase().includes(searchTerm) ||
                command.descriptionDE.toLowerCase().includes(searchTerm) ||
                command.descriptionUS.toLowerCase().includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || command.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
        renderCommands(filteredCommands);
    };

    searchBar.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);

    toggleLangBtn.addEventListener('click', () => {
        currentLang = currentLang === 'DE' ? 'EN' : 'DE';
        toggleLangBtn.textContent = `Sprache wechseln: ${currentLang === 'DE' ? 'EN' : 'DE'}`;
        applyFilters(); 
    });

    commands = await fetchCommands();
    renderCommands(commands); 
});
