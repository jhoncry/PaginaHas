// ======================================
// ESPERAR QUE CARGUE EL HTML
// ======================================

window.addEventListener("DOMContentLoaded", () => {

    // ======================================
    // PARTICULAS
    // ======================================

    const particles =
    document.getElementById("particles");

    for(let i = 0; i < 100; i++){

        const particle =
        document.createElement("div");

        particle.classList.add("particle");

        const size =
        Math.random() * 5 + 2;

        particle.style.width =
        `${size}px`;

        particle.style.height =
        `${size}px`;

        particle.style.left =
        `${Math.random() * 100}%`;

        particle.style.animationDuration =
        `${Math.random() * 8 + 4}s`;

        particle.style.animationDelay =
        `${Math.random() * 5}s`;

        const colors = [
            "#00ffff",
            "#ff00ff",
            "#8a2be2",
            "#ffffff"
        ];

        const color =
        colors[Math.floor(Math.random() * colors.length)];

        particle.style.background =
        color;

        particle.style.boxShadow =
        `0 0 10px ${color},
        0 0 20px ${color}`;

        particles.appendChild(particle);
    }

    // ======================================
    // LOADING
    // ======================================

    const percent =
    document.getElementById("percent");

    const loader =
    document.getElementById("cinematic-loader");

    const flash =
    document.querySelector(".flash");

    let load = 0;

    const interval = setInterval(()=>{

        load++;

        percent.innerText =
        `${load}%`;

        // FLASH FINAL

        if(load === 95){

            flash.animate([

                {opacity:0},
                {opacity:.8},
                {opacity:0}

            ],{
                duration:500
            });
        }

        // FINAL

        if(load >= 100){

            clearInterval(interval);

            loader.classList.add("loader-end");

            setTimeout(()=>{

                loader.style.display = "none";

            },1000);
        }

    },40);

});