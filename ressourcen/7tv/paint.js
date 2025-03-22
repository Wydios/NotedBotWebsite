function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const paintID = urlParams.get('paintID');
    return { paintID };
}

function getPaint() {
    const { paintID } = getUrlParams();
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
        if (data.data && data.data.paints && data.data.paints.paints) {
            const paintData = data.data.paints.paints.find(paint => paint.id === paintID);
            if (paintData) {
                console.log(`Paint Daten für ${paintData.name} ID: ${paintID} ->`);
                console.log(JSON.stringify(paintData, null, 2));

                const sample1Element = document.getElementById('sample1');
                const sample2Element = document.getElementById('sample2');
                const paintNameElement = document.getElementById('paint-name');

                if (paintNameElement) {
                    paintNameElement.textContent = paintData.name;
                    document.title = `NotedBot │ 7TV ${paintData.name} Paint`;
                }

                applyPaint(paintData.data, paintNameElement, sample1Element, sample2Element);
            } else {
                console.error('Keine Paint Daten gefunden für ID:', paintID);
            }
        } else {
            console.error('Keine Paint Daten gefunden');
        }
    })
    .catch(error => {
        console.error('getPaint | Fehler beim fetchen vom Paints', error);
    });
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

function applyPaint(paintData, paintDiv, sample1Div, sample2Div) {
    if (paintData && paintData.layers && paintData.layers.length > 0) {
        paintData.layers.forEach(layer => {
            if (layer.ty) {
                if (layer.ty.images && layer.ty.images.length > 0) {
                    const gifImage = layer.ty.images.find(img => img.mime === 'image/gif');
                    if (gifImage) {
                        const img = new Image();
                        img.crossOrigin = 'Anonymous';
                        img.onload = function() {
                            const colorThief = new ColorThief();
                            const dominantColor = colorThief.getColor(img);
                            const hexColor = `#${((1 << 24) + (dominantColor[0] << 16) + (dominantColor[1] << 8) + dominantColor[2]).toString(16).slice(1)}`;
                            sample1Div.style.color = hexColor;
                            sample2Div.style.color = hexColor;
                            paintDiv.style.color = hexColor;
                        };
                        img.src = gifImage.url;
                    }
                    const largestImage = layer.ty.images.reduce((max, img) => img.size > max.size ? img : max, layer.ty.images[0]);
                    sample1Div.style.backgroundImage = `url('${largestImage.url.replace('/1x.', '/3x.')}')`;
                    sample2Div.style.backgroundImage = `url('${largestImage.url.replace('/1x.', '/3x.')}')`;

                    const paintElements = document.querySelectorAll('.paint-text');
                    paintElements.forEach((element) => {
                        element.style.color = 'transparent';
                        element.style.backgroundClip = 'text';
                        element.style.webkitBackgroundClip = 'text';
                        element.style.backgroundImage = `url('${largestImage.url.replace('/1x.', '/3x.')}')`;
                        element.style.backgroundSize = '100% auto';
                        element.style.filter = 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)';
                    });

                    paintDiv.style.color = 'transparent';
                    paintDiv.style.backgroundClip = 'text';
                    paintDiv.style.webkitBackgroundClip = 'text';
                    paintDiv.style.backgroundImage = `url('${largestImage.url.replace('/1x.', '/3x.')}')`;
                    paintDiv.style.backgroundSize = '100% auto';
                    paintDiv.style.filter = 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)';
                } else if (layer.ty.stops) { 
                    const gradientStops = createGradientStops(layer.ty.stops);
                    const gradientType = layer.ty.angle !== undefined ? 'linear-gradient' : 'radial-gradient';
                    const gradientDirection = layer.ty.angle !== undefined ? `${layer.ty.angle}deg` : '';
                    const gradientString = Gradient(gradientType, gradientDirection, gradientStops, layer.ty.repeating);

                    sample1Div.style.backgroundImage = gradientString;
                    sample2Div.style.backgroundImage = gradientString;
                    paintDiv.style.backgroundImage = gradientString;

                    const paintElements = document.querySelectorAll('.paint-text');
                    paintElements.forEach((element) => {
                        element.style.color = 'transparent';
                        element.style.backgroundClip = 'text';
                        element.style.webkitBackgroundClip = 'text';
                        element.style.backgroundImage = gradientString;
                        element.style.backgroundSize = '100% auto';
                        element.style.filter = 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)';
                    });

                    paintDiv.style.color = 'transparent';
                    paintDiv.style.backgroundClip = 'text';
                    paintDiv.style.webkitBackgroundClip = 'text';
                    paintDiv.style.backgroundImage = gradientString;
                    paintDiv.style.backgroundSize = '100% auto';
                    paintDiv.style.filter = 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)';
                } else if (layer.ty.color) {
                    const hexColor = convertToHex(layer.ty.color);
                    sample1Div.style.backgroundColor = hexColor;
                    sample2Div.style.backgroundColor = hexColor;
                    paintDiv.style.backgroundColor = hexColor;

                    const paintElements = document.querySelectorAll('.paint-text');
                    paintElements.forEach((element) => {
                        element.style.color = hexColor;
                        element.style.backgroundClip = 'unset';
                        element.style.webkitBackgroundClip = 'unset';
                        element.style.backgroundImage = 'unset';
                        element.style.filter = 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)';
                    });
                     paintDiv.style.color = hexColor;
                     paintDiv.style.backgroundClip = 'unset';
                     paintDiv.style.webkitBackgroundClip = 'unset';
                     paintDiv.style.backgroundImage = 'unset';
                     paintDiv.style.filter = 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)';

                }

                if (paintData.data) {
                    applyPaint(paintData.data, paintDiv, sample1Div, sample2Div);
                }
            }
        });
    }
};

getPaint();
