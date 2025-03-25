document.addEventListener('DOMContentLoaded', () => {
    const commandsContainer = document.getElementById('commands-container');
    const filterToggle = document.getElementById('filter-toggle');
    const categoryFilter = document.getElementById('category-filter');
    const permissionFilter = document.getElementById('permission-filter');
    const searchInput = document.getElementById('search-input');
    const deButton = document.getElementById('de-button'); 
    const usButton = document.getElementById('us-button'); 
    let commandsData = [];
    let currentLanguage = 'de'; 

    function getQueryParams() {
        const params = new URLSearchParams(window.location.search);
        return {
            category: params.get('category') || '',
            permission: params.get('permission') || ''
        };
    }

    fetch('./ressourcen/commands.json')
        .then(response => {
            if (!response.ok) {
                console.log(`Fehler beim Fetching von commands.json: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            commandsData = data;
            renderCommands(commandsData);
            applyFiltersFromURL();
        })
        .catch(error => {
            commandsContainer.innerHTML = `<img src="img/apu.png" alt="joa1"> ☝️ <p style="font-weight: bold; color: red;">${currentLanguage === 'de' ? 'Es ist ein Fehler aufgetreten' : 'An error has occurred'}</p>`;
            console.log(`Error Beim Fetching: ${error}`);
        });

    function applyFilters() {
        const selectedCategory = categoryFilter.value;
        const selectedPermission = parseInt(permissionFilter.value, 10);
        const searchTerm = searchInput.value.toLowerCase();

        const filteredCommands = commandsData.filter(command => {
            const matchesSearch =
                command.name.toLowerCase().includes(searchTerm) ||
                command.aliases.some(alias => alias.toLowerCase().includes(searchTerm));
            const categoryArray = Array.isArray(command.category) ? command.category : [command.category];
            const matchesCategory = !selectedCategory || categoryArray.includes(selectedCategory);
    
            const matchesPermission = !selectedPermission || command.permission == selectedPermission;
            
            return matchesSearch && matchesCategory && matchesPermission;
        });

        renderCommands(filteredCommands);
    }

    function applyFiltersFromURL() {
        const { category, permission } = getQueryParams();

        if (category) {
            const categoryFilter = document.getElementById('category-filter');
            categoryFilter.value = category;
        }
        if (permission) {
            const permissionFilter = document.getElementById('permission-filter');
            permissionFilter.value = permission;
        }
        applyFilters();
    }

    function renderCommands(commands) {
        const commandsContainer = document.getElementById('commands-container'); 
        commandsContainer.innerHTML = ''; 
        commands.sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
        });
        if (commands.length === 0) {
            return (commandsContainer.innerHTML = `<img src="img/shruge.gif" alt="joa2"> <p style="font-weight: bold;">${currentLanguage === 'de' ? 'Kein Command gefunden' : 'No Command found'}</p>`);
        }
        try {
            commands.forEach(command => {
                const emoteImages = (Array.isArray(command.link) ? command.link : [command.link] || [])
                    .map(link => `<img src="${link}" alt="Emote">`)
                    .join(' ');
                const categoryLabel = Array.isArray(command.category)
                    ? command.category.join(', ')
                    : command.category;
                const commandBubble = document.createElement('div');
                commandBubble.classList.add('command-bubble');
                const commandDiv = document.createElement('div');
                commandDiv.classList.add('command');
                const formatUsage = (usage) => usage 
                    ? usage.replace(/<(?!\/code|code>)/g, '[').replace(/>(?!code>)/g, ']')
                        .replace(/!(.+)/g, '<code>!$1</code>')
                    : '';
                const usageDE = formatUsage(command.usageDE || 'Keine Verwendung verfügbar');
                const usageUS = formatUsage(command.usageUS || 'No usage available');
                commandDiv.innerHTML = `
                    <div class="command-info">
                        <p><strong>Name:</strong> ${command.name} ${command.aliases.length ? `(Alias: ${command.aliases.join(', ')})` : ''}</p>
                        <p><strong>${currentLanguage === 'de' ? 'Beschreibung' : 'Description'}:</strong> ${currentLanguage === 'de' ? command.descriptionDE : command.descriptionUS} ${emoteImages}</p>
                        <p><strong>${currentLanguage === 'de' ? 'Verwendung' : 'Usage'}</strong> ${currentLanguage === 'de' ? usageDE : usageUS}</p>
                        <p><strong>${currentLanguage === 'de' ? 'Cooldown' : 'Cooldown'}:</strong> ${currentLanguage === 'de' ? `${command.cooldown} Sekunden` : `${command.cooldown} Seconds`}</p>
                        <p><strong>Category:</strong> ${categoryLabel}</p>
                        <p><strong>Permission:</strong> ${getPermissionLabel(command.permission)}</p>
                    </div>
                `;
                commandBubble.appendChild(commandDiv);
                commandsContainer.appendChild(commandBubble);
            });
        } catch (e) {
            console.log(`renderCommands | Fehler: ${e}`);
            commandsContainer.innerHTML = `<p style="font-weight: bold; color: red;"> ☝️ ${currentLanguage === 'de' ? 'Es ist ein Fehler aufgetreten' : 'An error has occurred'}</p>`;
        }
    }

    function getPermissionLabel(level) {
        const labels = {
            0: 'Everyone',
            1: 'Vip',
            2: 'Moderator',
            3: 'Broadcaster',
            4: 'Dev',
            5: 'Admin'
        };
        return labels[level] || 'Unknown';
    }

    window.addEventListener('popstate', () => { applyFiltersFromURL(); });
    filterToggle.addEventListener('click', () => { filterToggle.parentElement.classList.toggle('active'); });
    categoryFilter.addEventListener('change', applyFilters);
    permissionFilter.addEventListener('change', applyFilters);
    searchInput.addEventListener('input', applyFilters);
    deButton.addEventListener('click', () => {
        currentLanguage = 'de';
        renderCommands(commandsData);
    });
    usButton.addEventListener('click', () => {
        currentLanguage = 'en';
        renderCommands(commandsData);
    });
});