const form = document.getElementById("contactForm");
const btn = document.getElementById("btnEnviar");
const mensaje = document.getElementById("mensajeExito");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  btn.innerText = "Transmitiendo...";
  btn.disabled = true;

  const data = new FormData(form);

  fetch("https://formsubmit.co/ajax/jhonatan.camacho.ry@gmail.com", {
    method: "POST",
    headers: {
      'Accept': 'application/json'
    },
    body: data
  })
  .then(response => {
    if (!response.ok) throw new Error("Error en envío");
    return response.json();
  })
  .then(() => {
    mensaje.innerText = "Señal recibida 🔊";
    mensaje.classList.add("show");

    form.reset();

    btn.innerText = "Transmitir señal 🔊";
    btn.disabled = false;

    setTimeout(() => {
      mensaje.classList.remove("show");
    }, 3000);
  })
  .catch((error) => {
    console.error(error);
    alert("Error al enviar señal ⚠️");

    btn.innerText = "Transmitir señal 🔊";
    btn.disabled = false;
  });
});