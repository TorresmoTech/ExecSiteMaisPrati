document.addEventListener("DOMContentLoaded", () => {
    if (typeof Twitch === "undefined") {
        console.error("API da Twitch não carregou.");
        return;
    }

    new Twitch.Embed("twitch-embed", {
        width: "100%",
        height: 500,
        channel: "torresmo_tech",
        layout: "video",
        autoplay: false,
        parent: [
            "localhost",
            "127.0.0.1",
            window.location.hostname
        ]

    });

});