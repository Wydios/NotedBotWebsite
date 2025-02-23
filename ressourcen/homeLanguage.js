document.addEventListener('DOMContentLoaded', () => {
    const deButton = document.getElementById('de-button');
    const usButton = document.getElementById('us-button');
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const p1 = document.getElementById('p1');
    const p2 = document.getElementById('p2');
    const a1 = document.getElementById('a1');
    const text3 = document.getElementById('text3');
    const p3 = document.getElementById('p3');
    const text4 = document.getElementById('text4');
    const p4 = document.getElementById('p4');
    const p5 = document.getElementById('p5');
    const p6 = document.getElementById('p6');
    const p7 = document.getElementById('p7');
    const p8 = document.getElementById('p8');
    const p9 = document.getElementById('p9');

    const switchToGerman = () => {
        text1.textContent = 'NotedBot Ein Twitch Chat Bot der für Spaß und Hilfe sorgen soll.';
        text2.textContent = 'Funktion vom Bot:';
        p1.textContent = 'Notis ist die interne Währung von NotedBot.';
        p2.textContent = 'Verdiene dir Notis durch verschiedene Aktivitäten und verwende sie, um an die Spitze der Rangliste zu gelangen!';
        a1.textContent = 'Mehr zu Notis Commands';
        text3.textContent = 'Channel Management';
        p3.innerHTML = 'Commands können mit dem Präfix <code>!</code> verwendet werden.';
        p4.innerHTML = 'Mit dem Befehl <code>!prefix</code> lässt sich das Präfix je Kanal ändern.</br>';
        text4.innerHTML  = 'Erste Schritte';
        p5.innerHTML = 'Füge NotedBot mit dem Befehl <code>!join</code> zu deinem Channel hinzu.';
        p6.innerHTML = 'Der Bot benötigt keine Moderatorenrechte, aber es wird empfohlen, sie zu vergeben, um den vollen Funktionsumfang nutzen zu können.';
        p7.innerHTML = 'Wenn du Fragen zum Bot hast oder eine Problem hast melde dich gerne bei <a href="https://twitch.tv/wydios" target="_blank" style="color: #4876ff;">Mir (Wydios)</a>';
        p8.innerHTML = 'Die/Der Seite/Bot würde mit 🩵 von <a href="https://github.com/Wydios" target="_blank" style="color: #4876ff;">Wydios</a> entwickelt';
        p9.innerHTML = 'Diese Seite und der Bot steht in keiner rechtlichen Verbindung zu Twitch';
    }

    const switchToEnglish = () => {
        text1.textContent = 'NotedBot A Twitch chat bot that is intended to provide fun and help.';
        text2.textContent = 'Function of the bot:';
        p1.textContent = 'Notis is the internal currency of NotedBot.';
        p2.textContent = 'Earn Notis through various activities and use them to get to the top of the leaderboard!';
        a1.textContent = 'More on Notis Commands';
        text3.textContent = 'Channel Management';
        p3.innerHTML = 'Commands can be used with the prefix <code>!</code>.';
        p4.innerHTML = 'The <code>!prefix</code> command can be used to change the prefix for each channel.<br/>';
        text4.innerHTML = 'Getting Started';
        p5.innerHTML = 'Add NotedBot to your channel with the command <code>!join</code>.';
        p6.innerHTML = 'The bot does not require moderator rights, but it is recommended to grant them in order to use the full functionality.';
        p7.innerHTML = 'If you have any questions about the bot or a problem, please feel free to contact <a href="https://twitch.tv/wydios" target="_blank" style="color: #4876ff;">Me (Wydios)</a>';
        p8.innerHTML = 'The site/bot would be marked with 🩵 by <a href="https://github.com/Wydios" target="_blank" style="color: #4876ff;">Wydios</a> developed';
        p9.innerHTML = 'This site and the bot have no legal connection to Twitch';
    }

    deButton.addEventListener('click', switchToGerman);
    usButton.addEventListener('click', switchToEnglish);
    
    switchToGerman(); 
});