document.addEventListener('DOMContentLoaded', () => {
    // Imports
    const deButton = document.getElementById('de-button');
    const usButton = document.getElementById('us-button');
    const searchInput = document.getElementById('search-input');
    const categoryLabel = document.getElementById('category-label');
    const permissionLabel = document.getElementById('permission-label');

    // Deutsch
    const switchToGerman = () => {
        searchInput.placeholder = '🔎 Suchen Sie nach einem Command?';
        categoryLabel.textContent = 'Kategorie:';
        permissionLabel.textContent = 'Berechtigung:';
    }

    // Englisch
    const switchToEnglish = () => {
        searchInput.placeholder = '🔎 Search for a command?';
        categoryLabel.textContent = 'Category:';
        permissionLabel.textContent = 'Permission:';
    }

    // Switch
    deButton.addEventListener('click', switchToGerman);
    usButton.addEventListener('click', switchToEnglish);
    
    // Standart
    switchToGerman(); 
});