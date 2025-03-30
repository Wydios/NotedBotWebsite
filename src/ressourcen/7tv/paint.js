function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const paintID = urlParams.get('paintID');
    const helpElement = document.getElementById('help');
    if (!paintID) {
        helpElement.style.display = 'block';
        return { paintID: null };
    }
    return { paintID };
};

function getPaint() {
    const { paintID } = getUrlParams();

    const elements = {
        loading: document.getElementById('loading'),
        error: document.getElementById('error'),
        sample1: document.getElementById('sample1'),
        sample2: document.getElementById('sample2'),
        paintName: document.getElementById('paint-name'),
    };

    if (!paintID) {
        Object.values(elements).forEach(el => el?.style && (el.style.display = 'none'));
        document.title = `NotedBot │ 7TV Try Paint`;
        return;
    }

    elements.loading.style.display = 'block';
    elements.error.style.display = 'none';
    document.title = `NotedBot │ 7TV ... Paint`;

    const query = `
        query Paints {
            paints {
                paints {
                    id
                    name
                    data {
                        layers {
                            id
                            opacity
                            ty {
                                ... on PaintLayerTypeImage {
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
                                ... on PaintLayerTypeRadialGradient {
                                    repeating
                                    shape
                                    stops {
                                        at
                                        color {
                                            hex
                                            r
                                            g
                                            b
                                            a
                                        }
                                    }
                                }
                                ... on PaintLayerTypeLinearGradient {
                                    angle
                                    repeating
                                    stops {
                                        at
                                        color {
                                            hex
                                            r
                                            g
                                            b
                                            a
                                        }
                                    }
                                }
                                ... on PaintLayerTypeSingleColor {
                                    color {
                                        hex
                                        r
                                        g
                                        b
                                        a
                                    }
                                }
                            }
                        }
                        shadows {
                            offsetX
                            offsetY
                            blur
                            color {
                                hex
                                r
                                g
                                b
                                a
                            }
                        }
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
            console.log("API Antwort:", data);
        
        const paints = data?.data?.paints?.paints || [];
        const paintData = paints.find(paint => paint.id === paintID);

        if (!paintData) return showError();
        console.log(`Paint Daten für ${paintData.name} ID: ${paintID} ->`, paintData);

        if (elements.paintName) {
            elements.paintName.textContent = paintData.name;
            document.title = `NotedBot │ 7TV ${paintData.name} Paint`;
        }

        applyPaint(paintData.data, elements.paintName, elements.sample1, elements.sample2);
    })
    .catch(error => {
        console.error('getPaint | Fehler beim fetchen vom Paints', error);
        showError();
    }).finally(() => elements.loading.style.display = 'none');

    function showError() {
        elements.error.style.display = 'block';
        if (paintID) elements.paintName.textContent = `ID: ${paintID}`;
        document.title = `NotedBot │ Error 7TV ? Paint`;
    }
};

const convertToHex = (color) => { 
    if (color && color.hex) {
        return color.hex;
    } else if (color && color.r !== undefined && color.g !== undefined && color.b !== undefined) {
        return `#${(1 << 24 | color.r << 16 | color.g << 8 | color.b).toString(16).slice(1)}`;
    }
    return '#000000';
};

const createGradientStops = (stops) => {
    return stops.map(stop => `${convertToHex(stop.color)} ${stop.at * 100}%`).join(', ');
};

const Gradient = (type, direction, stops, repeat) => {
    if (type.includes('radial-gradient')) {
        return `${repeat ? `repeating-${type}` : type}(${stops})`;
    }
    return `${repeat ? `repeating-${type}` : type}(${direction}, ${stops})`;
};

function applyShadows(shadows) {
    return shadows.map(shadow => {
        const colorString = convertToHex(shadow.color);
        return `drop-shadow(${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${colorString})`;
    }).join(' ');
};

function applyPaint(paintData, paintDiv, sample1Div, sample2Div) {
    if (!paintData || !paintData.layers) return;
    
    const applyStyles = (div, styles) => Object.assign(div.style, styles);
    let imageSet = false;
    

    paintData.layers.forEach(layer => {
        if (!layer.ty) return;
        
        if (layer.ty.images?.length && !imageSet) {
            const largestImage = layer.ty.images.reduce((max, img) => img.size > max.size ? img : max, layer.ty.images[0]);
            if (largestImage?.url) {
                const imgUrl = largestImage.url.replace('/1x.', '/3x.');
                const styles = {
                    backgroundImage: `url('${imgUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    color: 'transparent',
                    backgroundClip: 'text',
                    webkitBackgroundClip: 'text',
                    filter: 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)',
                };
                [sample1Div, sample2Div, paintDiv].forEach(div => applyStyles(div, styles));
                imageSet = true;
            }
        } else if (layer.ty.stops && !imageSet) {
            const gradientStops = createGradientStops(layer.ty.stops);
            const gradientType = layer.ty.angle !== undefined ? 'linear-gradient' : 'radial-gradient';
            const gradientDirection = layer.ty.angle !== undefined ? `${layer.ty.angle}deg` : 'circle';
            const gradientString = Gradient(gradientType, gradientDirection, gradientStops, layer.ty.repeating);
            const styles = {
                backgroundImage: gradientString,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: 'transparent',
                backgroundClip: 'text',
                webkitBackgroundClip: 'text',
                filter: 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)',
            };
            [sample1Div, sample2Div, paintDiv].forEach(div => applyStyles(div, styles));
        } else if (layer.ty.color && !imageSet) {
            const hexColor = convertToHex(layer.ty.color);
            const styles = {
                backgroundColor: hexColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                color: hexColor,
                backgroundClip: 'unset',
                webkitBackgroundClip: 'unset',
                backgroundImage: 'unset',
                filter: 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)',
            };
            [sample1Div, sample2Div, paintDiv].forEach(div => applyStyles(div, styles));
        }
    });
    
    if (paintData.shadows?.length) {
        const shadowStyle = applyShadows(paintData.shadows);
        [sample1Div, sample2Div, paintDiv].forEach(div => div.style.filter = shadowStyle);
    }
};

getPaint();
