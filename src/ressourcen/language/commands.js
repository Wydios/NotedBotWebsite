document.addEventListener('DOMContentLoaded', () => {
    const deButton = document.getElementById('de-button');
    const usButton = document.getElementById('us-button');
    const searchInput = document.getElementById('search-input');
    const categoryLabel = document.getElementById('category-label');
    const permissionLabel = document.getElementById('permission-label');

    const switchToGerman = () => {
        searchInput.placeholder = '🔎 Suchen Sie nach einem Command?';
        categoryLabel.textContent = 'Kategorie:';
        permissionLabel.textContent = 'Berechtigung:';
    }

    const switchToEnglish = () => {
        searchInput.placeholder = '🔎 Search for a command?';
        categoryLabel.textContent = 'Category:';
        permissionLabel.textContent = 'Permission:';
    }

    deButton.addEventListener('click', switchToGerman);
    usButton.addEventListener('click', switchToEnglish);
    
    switchToGerman(); 
});