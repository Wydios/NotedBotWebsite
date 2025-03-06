function getUrlParams() {
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const elementID = urlParams.get('paint');
    const paintID = urlParams.get('PaintID');
    const paintName = urlParams.get('paintName');
    return { name, elementID, paintID, paintName };
};

function loadPaint() {
    const { name, elementID, paintID, paintName } = getUrlParams();
    
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

    if (paintName) {
        const paintNameElement = document.getElementById('paint-name');
        paintNameElement.textContent = paintName;
        paintNameElement.style.fontWeight = 'bold'; 
        paintNameElement.style.color = 'transparent';
        paintNameElement.style.backgroundClip = 'text';
        paintNameElement.style.webkitBackgroundClip = 'text';

        const paintUrl = `https://cdn.7tv.app/paint/${elementID}/layer/${paintID}/1x.webp`;
        paintNameElement.style.backgroundImage = `url('${paintUrl}')`;
        paintNameElement.style.backgroundSize = '100% auto';
        paintNameElement.style.filter = 'drop-shadow(#39d21eff 0px 0px 0.1px) drop-shadow(#005557ff 1px 1px 0.1px)';
        
        document.title = `NotedBot │ 7TV ${paintName} Paint`;
    }
};

window.onload = loadPaint;