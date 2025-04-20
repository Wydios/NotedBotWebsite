function applyNotedBotColor(styles) {
    const notedBotElement = document.getElementById("notedbotColor");
    if (notedBotElement && styles) {
        Object.assign(notedBotElement.style, styles);
    }
};

function getPaint2() {
    const query = `
        query Users {
            users {
                user(id: "01HNQD27GR000FG935RNS75NMM") {
                    style {
                        activePaintId
                        activePaint {
                            id
                            data {
                                layers {
                                    id
                                    ty {
                                        ... on PaintLayerTypeSingleColor {
                                            color {
                                                hex
                                                r
                                                g
                                                b
                                                a
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
                                }
                                opacity
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
        }
    }`;

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
        
        const paintData = data?.data?.users?.user?.style?.activePaint || {};

        if (!paintData) return;

        applyPaint2(paintData.data);
    })
    .catch(error => {
        console.error('getPaint | Fehler beim fetchen vom Paints', error);
    });
};

const convertToHex2 = (color) => { 
    if (color && color.hex) {
        return color.hex;
    } else if (color && color.r !== undefined && color.g !== undefined && color.b !== undefined) {
        return `#${(1 << 24 | color.r << 16 | color.g << 8 | color.b).toString(16).slice(1)}`;
    }
    return '#000000';
};

const createGradientStops2 = (stops) => {
    return stops.map(stop => `${convertToHex2(stop.color)} ${stop.at * 100}%`).join(', ');
};

const Gradient2 = (type, direction, stops, repeat) => {
    if (type.includes('radial-gradient')) {
        return `${repeat ? `repeating-${type}` : type}(${stops})`;
    }
    return `${repeat ? `repeating-${type}` : type}(${direction}, ${stops})`;
};

function applyShadows2(shadows) {
    return shadows.map(shadow => {
        const colorString = convertToHex2(shadow.color);
        return `drop-shadow(${shadow.offsetX}px ${shadow.offsetY}px ${shadow.blur}px ${colorString})`;
    }).join(' ');
};

function applyPaint2(paintData) {
    if (!paintData || !paintData.layers) return;
    
    const applyStyles2 = (div, styles) => Object.assign(div.style, styles);
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
                imageSet = true;
                applyNotedBotColor(styles);
            }
        } else if (layer.ty.stops && !imageSet) {
            const gradientStops = createGradientStops2(layer.ty.stops);
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
            applyNotedBotColor(styles);
        } else if (layer.ty.color && !imageSet) {
            const hexColor = convertToHex2(layer.ty.color);
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
            applyNotedBotColor(styles);
        }
    });
    
    if (paintData.shadows?.length) {
        const shadowStyle = applyShadows2(paintData.shadows);
        applyNotedBotColor(shadowStyle);
    }
};

getPaint2();
