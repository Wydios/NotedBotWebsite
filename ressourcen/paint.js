function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const elementID = urlParams.get('paint');
    const paintID = urlParams.get('PaintID');
    return { name, elementID, paintID };
};

function loadPaint() {
    const { name, elementID, paintID } = getUrlParams();
    
    if (elementID && paintID) {
        const paintUrl = `https://cdn.7tv.app/paint/${elementID}/layer/${paintID}/1x.webp`;
        
        const paintElements = document.querySelectorAll('.paint-text');
        paintElements.forEach((element) => {
            element.style.color = 'transparent'; 
            element.style.backgroundClip = 'text'; 
            element.style.webkitBackgroundClip = 'text';
            element.style.backgroundImage = `url('${paintUrl}')`; 
            element.style.backgroundSize = '100% auto'; 
            element.style.filter = 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)'; 
        });
    }

    if (name) {
        const nameElement = document.getElementById('sample1');
        nameElement.textContent = name;
        
        const spanElement = document.createElement('span');
        spanElement.textContent = name;
        nameElement.appendChild(spanElement); 
        
        nameElement.style.fontSize = '5em'; 
        nameElement.style.fontWeight = 'bold'; 
    }
};

window.onload = loadPaint;
