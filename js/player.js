// js/player.js - Versión simplificada (solo play/pause y volumen con popup)

// Elementos del DOM
const playBtn = document.getElementById('playPauseBtn');
const volumeBtn = document.getElementById('volumeBtn');

let isPlaying = false;
let currentVolume = 0.8; // Volumen inicial 80%
let isMuted = false;
let previousVolume = 0.8;

// Crear elemento de audio
const audio = new Audio();
audio.src = 'https://stream.zeno.fm/qcfwqxfgps8uv'; // <--- CAMBIA AQUÍ TU URL DE ZENO
audio.loop = false; // <--- CAMBIA A false (los streams en vivo no necesitan loop)
audio.volume = currentVolume;

// Crear control deslizante de volumen flotante
let volumeSlider = null;
let volumePopup = null;

// Función para crear el popup de volumen
function createVolumePopup() {
    if (volumePopup) return;
    
    volumePopup = document.createElement('div');
    volumePopup.style.position = 'fixed';
    volumePopup.style.bottom = '80px';
    volumePopup.style.right = '30px';
    volumePopup.style.backgroundColor = '#1a1919';
    volumePopup.style.backdropFilter = 'blur(20px)';
    volumePopup.style.borderRadius = '20px';
    volumePopup.style.padding = '15px';
    volumePopup.style.zIndex = '100';
    volumePopup.style.border = '1px solid rgba(255,128,228,0.3)';
    volumePopup.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
    volumePopup.style.display = 'none';
    
    // Barra de volumen vertical
    const sliderContainer = document.createElement('div');
    sliderContainer.style.width = '40px';
    sliderContainer.style.height = '120px';
    sliderContainer.style.position = 'relative';
    sliderContainer.style.cursor = 'pointer';
    
    const track = document.createElement('div');
    track.style.width = '4px';
    track.style.height = '100%';
    track.style.backgroundColor = '#494847';
    track.style.borderRadius = '2px';
    track.style.position = 'absolute';
    track.style.left = '18px';
    track.style.top = '0';
    
    const fill = document.createElement('div');
    fill.style.width = '100%';
    fill.style.height = `${currentVolume * 100}%`;
    fill.style.backgroundColor = '#f100bd';
    fill.style.borderRadius = '2px';
    fill.style.position = 'absolute';
    fill.style.bottom = '0';
    
    const knob = document.createElement('div');
    knob.style.width = '12px';
    knob.style.height = '12px';
    knob.style.backgroundColor = '#f100bd';
    knob.style.borderRadius = '50%';
    knob.style.position = 'absolute';
    knob.style.left = '14px';
    knob.style.bottom = `${currentVolume * 100}%`;
    knob.style.transform = 'translateY(50%)';
    knob.style.cursor = 'pointer';
    knob.style.boxShadow = '0 0 10px #f100bd';
    
    sliderContainer.appendChild(track);
    sliderContainer.appendChild(fill);
    sliderContainer.appendChild(knob);
    
    // Texto del porcentaje
    const percentText = document.createElement('div');
    percentText.style.textAlign = 'center';
    percentText.style.marginTop = '10px';
    percentText.style.fontSize = '12px';
    percentText.style.fontFamily = 'Space Grotesk, sans-serif';
    percentText.style.color = '#f100bd';
    percentText.innerText = `${Math.round(currentVolume * 100)}%`;
    
    volumePopup.appendChild(sliderContainer);
    volumePopup.appendChild(percentText);
    document.body.appendChild(volumePopup);
    
    // Función para actualizar el volumen desde el popup
    function updateVolumeFromPosition(clientY) {
        const rect = sliderContainer.getBoundingClientRect();
        let y = clientY - rect.top;
        y = Math.max(0, Math.min(rect.height, y));
        const newVolume = 1 - (y / rect.height);
        window.setVolume(newVolume);
    }
    
    // Eventos del slider
    sliderContainer.addEventListener('click', (e) => {
        updateVolumeFromPosition(e.clientY);
    });
    
    let isDragging = false;
    sliderContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateVolumeFromPosition(e.clientY);
        e.preventDefault();
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            updateVolumeFromPosition(e.clientY);
        }
    });
    
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
    
    return { volumePopup, fill, knob, percentText };
}

// Función para actualizar la UI del volumen
function updateVolumeUI() {
    if (volumePopup) {
        const fill = volumePopup.querySelector('div:nth-child(1) div:nth-child(2)');
        const knob = volumePopup.querySelector('div:nth-child(1) div:nth-child(3)');
        const percentText = volumePopup.querySelector('div:last-child');
        
        if (fill) fill.style.height = `${currentVolume * 100}%`;
        if (knob) knob.style.bottom = `${currentVolume * 100}%`;
        if (percentText) percentText.innerText = `${Math.round(currentVolume * 100)}%`;
    }
    
    // Cambiar ícono del botón de volumen
    if (volumeBtn) {
        if (currentVolume === 0) {
            volumeBtn.innerText = 'volume_off';
        } else if (currentVolume < 0.3) {
            volumeBtn.innerText = 'volume_mute';
        } else {
            volumeBtn.innerText = 'volume_up';
        }
    }
}

// Función para cambiar el volumen
window.setVolume = function(volume) {
    currentVolume = Math.max(0, Math.min(1, volume));
    audio.volume = currentVolume;
    updateVolumeUI();
    console.log(`Volumen: ${Math.round(currentVolume * 100)}%`);
};

// Función para mutear/desmutear
window.toggleMute = function() {
    if (currentVolume > 0) {
        previousVolume = currentVolume;
        window.setVolume(0);
    } else {
        window.setVolume(previousVolume);
    }
};

// Iniciar reproducción
window.playAudio = function() {
    if (!isPlaying) {
        isPlaying = true;
        const icon = playBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.innerText = 'pause';
        playBtn.classList.remove('bg-primary');
        playBtn.classList.add('bg-secondary');
        
        audio.play().catch(error => {
            console.log('Error al conectar con Zeno:', error);
            isPlaying = false;
            const icon = playBtn.querySelector('.material-symbols-outlined');
            if (icon) icon.innerText = 'play_arrow';
            playBtn.classList.remove('bg-secondary');
            playBtn.classList.add('bg-primary');
        });
    }
};

window.pauseAudio = function() {
    if (isPlaying) {
        isPlaying = false;
        const icon = playBtn.querySelector('.material-symbols-outlined');
        if (icon) icon.innerText = 'play_arrow';
        playBtn.classList.remove('bg-secondary');
        playBtn.classList.add('bg-primary');
        audio.pause();
    }
};

window.toggleAudio = function() {
    if (isPlaying) {
        window.pauseAudio();
    } else {
        window.playAudio();
    }
};

// Eventos
if (playBtn) {
    playBtn.addEventListener('click', window.toggleAudio);
}

if (volumeBtn) {
    let popupElements = null;
    
    volumeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (!popupElements) {
            popupElements = createVolumePopup();
        }
        
        // Mostrar/ocultar popup
        if (popupElements.volumePopup.style.display === 'none' || !popupElements.volumePopup.style.display) {
            popupElements.volumePopup.style.display = 'block';
            updateVolumeUI();
            
            // Cerrar después de 3 segundos de inactividad
            setTimeout(() => {
                if (popupElements.volumePopup.style.display === 'block') {
                    popupElements.volumePopup.style.display = 'none';
                }
            }, 3000);
        } else {
            popupElements.volumePopup.style.display = 'none';
        }
    });
    
    // Cerrar popup al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (popupElements && popupElements.volumePopup && !volumeBtn.contains(e.target)) {
            popupElements.volumePopup.style.display = 'none';
        }
    });
}

// Inicializar
updateVolumeUI();

// Botón ESCUCHAR EN VIVO
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(btn => {
        const text = btn.innerText.trim().toLowerCase();
        if (text === 'escuchar en vivo') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                window.playAudio();
            });
        }
        if (text === 'programación') {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const scheduleSection = document.querySelector('#schedule');
                if (scheduleSection) {
                    const headerOffset = 80;
                    const elementPosition = scheduleSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        }
    });
});

console.log('Player de radio simplificado inicializado');