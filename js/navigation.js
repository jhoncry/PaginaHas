// js/navigation.js - Versión con rosado intenso para selección

document.addEventListener('DOMContentLoaded', () => {
    console.log('Navigation.js cargado');
    
    // ============================================
    // MENÚ DESKTOP
    // ============================================
    const desktopLinks = document.querySelectorAll('#desktopMenu .flex.gap-8 a');
    
    if (desktopLinks.length > 0) {
        console.log('Enlaces desktop encontrados:', desktopLinks.length);
        
        // Función para resetear enlaces desktop
        function resetDesktopLinks() {
            desktopLinks.forEach(link => {
                link.classList.remove('text-[#ff00cc]', 'border-b-2', 'border-[#ff00cc]');
                link.classList.add('text-[#adaaaa]');
                link.style.color = '';
                link.style.borderBottom = '';
            });
        }
        
        // Función para activar un enlace desktop
        function activateDesktopLink(activeLink) {
            resetDesktopLinks();
            activeLink.classList.remove('text-[#adaaaa]');
            activeLink.classList.add('text-[#ff00cc]', 'border-b-2', 'border-[#ff00cc]');
        }
        
        // Eventos de clic para desktop
        desktopLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                activateDesktopLink(link);
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });
    }
    
    // ============================================
    // MENÚ MÓVIL
    // ============================================
    const mobileLinks = document.querySelectorAll('nav.md\\:hidden a');
    
    if (mobileLinks.length > 0) {
        console.log('Enlaces móviles encontrados:', mobileLinks.length);
        
        // Función para resetear enlaces móviles
        function resetMobileLinks() {
            mobileLinks.forEach(link => {
                link.classList.remove('text-[#ff00cc]', 'bg-[#ff00cc]/20', 'rounded-full');
                link.classList.add('text-[#adaaaa]');
                link.style.backgroundColor = '';
            });
        }
        
        // Función para activar un enlace móvil
        function activateMobileLink(activeLink) {
            resetMobileLinks();
            activeLink.classList.remove('text-[#adaaaa]');
            activeLink.classList.add('text-[#ff00cc]', 'bg-[#ff00cc]/20', 'rounded-full');
        }
        
        // Eventos de clic para móvil
        mobileLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                activateMobileLink(link);
                
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                }
            });
        });
    }
    
    // ============================================
    // ACTUALIZAR POR SCROLL (ambos menús)
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveOnScroll() {
        const scrollPosition = window.scrollY + 100;
        let currentSection = 'home';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Actualizar desktop
        desktopLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                desktopLinks.forEach(l => {
                    l.classList.remove('text-[#ff00cc]', 'border-b-2', 'border-[#ff00cc]');
                    l.classList.add('text-[#adaaaa]');
                });
                link.classList.remove('text-[#adaaaa]');
                link.classList.add('text-[#ff00cc]', 'border-b-2', 'border-[#ff00cc]');
            }
        });
        
        // Actualizar móvil
        mobileLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentSection}`) {
                mobileLinks.forEach(l => {
                    l.classList.remove('text-[#ff00cc]', 'bg-[#ff00cc]/20', 'rounded-full');
                    l.classList.add('text-[#adaaaa]');
                });
                link.classList.remove('text-[#adaaaa]');
                link.classList.add('text-[#ff00cc]', 'bg-[#ff00cc]/20', 'rounded-full');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveOnScroll);
    
    // ============================================
    // INICIALIZAR: Activar "Inicio" al cargar
    // ============================================
    const homeDesktop = document.querySelector('#desktopMenu a[href="#home"]');
    if (homeDesktop) {
        desktopLinks.forEach(l => {
            l.classList.remove('text-[#ff00cc]', 'border-b-2', 'border-[#ff00cc]');
            l.classList.add('text-[#adaaaa]');
        });
        homeDesktop.classList.remove('text-[#adaaaa]');
        homeDesktop.classList.add('text-[#ff00cc]', 'border-b-2', 'border-[#ff00cc]');
    }
    
    const homeMobile = document.querySelector('nav.md\\:hidden a[href="#home"]');
    if (homeMobile) {
        mobileLinks.forEach(l => {
            l.classList.remove('text-[#ff00cc]', 'bg-[#ff00cc]/20', 'rounded-full');
            l.classList.add('text-[#adaaaa]');
        });
        homeMobile.classList.remove('text-[#adaaaa]');
        homeMobile.classList.add('text-[#ff00cc]', 'bg-[#ff00cc]/20', 'rounded-full');
    }
});