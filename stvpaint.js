export async function getCosmetics() {
    let retryCount = 0;

    while (retryCount < 5) {
        const getCosmetics = await fetch(`https://7tv.io/v3/gql`, {
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

        const cosmeticsData = await getCosmetics.json();

        if (!cosmeticsData.errors && !cosmeticsData.message) {
            const cosmetics = cosmeticsData.data.cosmetics;
            return cosmetics;
        } else {
            if (retryCount === 5) {
                return [];
            }

            await new Promise((r) => setTimeout(r, 500));
            retryCount++;
        }
    }

    return [];
}
