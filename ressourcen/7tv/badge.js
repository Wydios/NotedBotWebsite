function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const badgeID = urlParams.get('badgeID');
    return { badgeID };
}

function getBadge() {
    const { badgeID } = getUrlParams();
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
            }
        } else {
            console.error('Keine Badge Daten gefunden');
        }
    })
    .catch(error => {
        console.error('getBadge | Fehler beim fetchen vom Badges', error);
    });
};

getBadge();
