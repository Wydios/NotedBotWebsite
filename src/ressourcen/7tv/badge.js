function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const badgeID = urlParams.get('badgeID');
    const helpElement = document.getElementById('help');
    if (!badgeID) {
        helpElement.style.display = 'block';
        return { badgeID: null };
    }
    return { badgeID };
};

function getBadge() {
    const { badgeID } = getUrlParams();

    const loadingElement = document.getElementById('loading');
    const errorElement = document.getElementById('error');
    const sample1Element = document.getElementById('sample1');
    const sample2Element = document.getElementById('sample2');

    if (!badgeID) {
        loadingElement.style.display = 'none';
        errorElement.style.display = 'none';
        sample1Element.style.display = 'none';
        sample2Element.style.display = 'none';
        return;
    }

    loadingElement.style.display = 'block';
    errorElement.style.display = 'none';

    const query = `
        query Paints {
            badges {
                badges {
                    id
                    name
                    description
                        images {
                            url 
                            mime
                            size
                            scale
                            width
                            height
                            frameCount
                        }
                    }
                }
            }
        `;
        fetch('https://7tv.io/v4/gql', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({ query: query }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.data && data.data.badges && data.data.badges.badges) {
                const badgeData = data.data.badges.badges.find(badge => badge.id === badgeID);
                if (badgeData) {
                    console.log(`Badge Daten für ${badgeData.name} ID: ${badgeID} ->`);
                    console.log(JSON.stringify(badgeData, null, 2));

                    const badgeElement = document.getElementById('badge-image');
                    const badgeName = document.getElementById('badge-name');

                    if (badgeElement && badgeName) {
                        badgeName.textContent = badgeData.name;
                        document.title = `NotedBot │ 7TV ${badgeData.name} Badge`;
                        badgeElement.src = `https://cdn.7tv.app/badge/${badgeID}/4x.avif`;
                        badgeElement.style.display = "block";
                    }
            } else {
                console.error('Keine Badge Daten gefunden für ID:', badgeID);
                Error();
            }
        } else {
            console.error('Keine Badge Daten gefunden');
            Error();
        }
    })
    .catch(error => {
        console.error('getBadge | Fehler beim fetchen vom Badges', error);
        Error();
    }).finally(() => {
        loadingElement.style.display = 'none';
    });
    function Error() {
        errorElement.style.display = 'block';
    };
};

getBadge();