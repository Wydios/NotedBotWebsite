function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const badgeID = urlParams.get('badgeID');
    const badgeName = urlParams.get('badgeName');
    return { badgeID, badgeName };
};

function loadBadge() {
    const { badgeID, badgeName } = getUrlParams();
    const badgeImage = document.getElementById('badge-image');
    const badgeNameElement = document.getElementById('badge-name');

    if (badgeImage) {
        if (badgeID) {
            badgeImage.src = `https://cdn.7tv.app/badge/${badgeID}/4x.avif`;
            badgeImage.style.display = "block";
        }
    } else {
        console.error('Das Badge-Bild-Element konnte nicht gefunden werden.');
    }

    if (badgeName) {
        badgeNameElement.textContent = badgeName;
        document.title = `NotedBot │ 7TV ${badgeName} Badge`;
    }
};

window.onload = loadBadge;