document.addEventListener("DOMContentLoaded", () => {

    VANTA.GLOBE({
        el: "#vanta-bg",

        mouseControls: true,
        touchControls: true,
        gyroControls: false,

        minHeight: 200,
        minWidth: 200,

        scale: 1,
        scaleMobile: 1,

        color: 0xf100bd,
        backgroundColor: 0x312026,

        size: 1.2
    });

});