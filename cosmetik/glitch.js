document.addEventListener("DOMContentLoaded", function () {
    if (window.PowerGlitch) {
        const glitchEffect = window.PowerGlitch.glitch;
        const logo = document.getElementById("notedbot-logo");
        logo.addEventListener("mouseenter", () => {
            glitchEffect("#notedbot-logo", { playMode: "hover" }).startGlitch();
        });
        logo.addEventListener("mouseleave", () => {
            glitchEffect("#notedbot-logo", { playMode: "hover" }).stopGlitch();
        });
        glitchEffect("#notedbot-logo", {
            playMode: "hover",
            shake: { velocity: 20, amplitudeX: 0.3, amplitudeY: 0.3 },
            slice: { count: 10, velocity: 25 }
        }).startGlitch();
    } else {
        console.error("PowerGlitch konnte nicht gefunden werden!");
    }
});
