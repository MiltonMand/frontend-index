/*================================ FRONTEND SCRIPTS ===================================*/
// Efeito de rolagem suave no header
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    header.classList.toggle('scroll-active', window.scrollY > 0);
});

// Função de navegação suave
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Verifica se o link é externo (diferente do domínio atual)
        const isExternal = href.startsWith('http') || href.startsWith('www');

        // Verifica se o link é para uma navegação interna (âncora dentro da mesma página)
        const isInternal = href.startsWith('#');

        // Se for um link externo ou para outro arquivo HTML, permite a navegação padrão
        if (isExternal || !isInternal) {
            return; // Permite que a navegação aconteça normalmente
        }

        // Caso contrário, é um link interno (âncora), aplica rolagem suave
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 50,
                behavior: 'smooth'
            });
        }

        // Fecha o menu mobile ao clicar em qualquer link
        const menuMobile = document.querySelector('.menu-mobile');
        if (menuMobile) {
            menuMobile.classList.remove('active');
        }
    });
});

const menuToggle = document.getElementById('menu-toggle');
const menuMobile = document.getElementById('menu-mobile');
const closeBtn = document.getElementById('close-btn');

menuToggle.addEventListener('click', () => {
    menuMobile.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    menuMobile.classList.remove('active');
});

const faqs = document.querySelectorAll('.faq');

faqs.forEach(faq => {
    const header = faq.querySelector('.faq-header');

    header.addEventListener('click', () => {
        faq.classList.toggle('active');

        faqs.forEach(otherFaq => {
            if (otherFaq !== faq && otherFaq.classList.contains('active')) {
                otherFaq.classList.remove('active');
            }
        });
    });
});