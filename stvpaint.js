// stvpaint.js

const removedBadges = []; // Liste von entfernten Badges, falls erforderlich

export async function getCosmetics() {
    let retryCount = 0;

    while (retryCount < 5) {
        try {
            const response = await fetch(`https://7tv.io/v3/gql`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    operationName: 'GetCosmestics',
                    variables: {},
                    query: `
                        query GetCosmestics($list: [ObjectID!]) {
                            cosmetics(list: $list) {
                                paints {
                                    id
                                    kind
                                    name
                                    function
                                    color
                                    angle
                                    shape
                                    image_url
                                    repeat
                                    stops {
                                        at
                                        color
                                        __typename
                                    }
                                    shadows {
                                        x_offset
                                        y_offset
                                        radius
                                        color
                                        __typename
                                    }
                                    __typename
                                }
                                badges {
                                    id
                                    kind
                                    name
                                    tooltip
                                    tag
                                    __typename
                                }
                                __typename
                            }
                        }
                    `,
                }),
            });

            const cosmeticsData = await response.json();

            // Überprüfen, ob Daten ohne Fehler empfangen wurden
            if (!cosmeticsData.errors && !cosmeticsData.message) {
                const cosmetics = cosmeticsData.data.cosmetics;

                // Entferne unerwünschte Badges aus der Liste
                cosmetics.badges = cosmetics.badges.filter((b) => !removedBadges.includes(b.id));

                // Rückgabe der gesamten Kosmetikdaten
                return cosmetics;
            } else {
                throw new Error('API Error: Fehler beim Abrufen von Cosmetics-Daten.');
            }
        } catch (error) {
            console.error(`Fehler beim Versuch ${retryCount + 1}:`, error.message);

            if (retryCount === 4) {
                console.error('Maximale Anzahl von Versuchen erreicht.');
                return [];
            }

            // Warte 500ms vor dem nächsten Versuch
            await new Promise((r) => setTimeout(r, 500));
            retryCount++;
        }
    }

    return [];
}

// Beispiel, wie diese Funktion verwendet werden kann
(async () => {
    const cosmetics = await getCosmetics();

    if (cosmetics.paints) {
        console.log(`Gefundene Paints für "Notedbot":`);
        cosmetics.paints.forEach((paint) => {
            console.log(`- Name: ${paint.name}, URL: ${paint.image_url}`);
        });
    } else {
        console.log('Keine Paints gefunden.');
    }
})();
