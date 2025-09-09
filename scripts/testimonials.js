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

// Inicialização do intlTelInput
const input = document.querySelector("#phone");

const iti = window.intlTelInput(input, {
    initialCountry: "auto",
    preferredCountries: ["us", "br", "pt", "mz"],
    nationalMode: false,
    formatOnDisplay: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    geoIpLookup: function (callback) {
        fetch('https://ipinfo.io/json') // ou use seu token: ?token=SEU_TOKEN
            .then(response => response.json())
            .then(data => callback(data.country))
            .catch(() => callback("us"));
    }
});

input.addEventListener("blur", function () {
    console.log("Número internacional formatado:", iti.getNumber());
});





/*================================ BACKEND SCRIPTS ====================================*/
import apiUrl from '../config/urlConfig.js';
import { showMessage } from '../config/responseMsg.js';

const clientUrl = `${apiUrl}/api/client`;

function errorMsg(error) {
    if (error.response) {
        const status = error.response.status;

        if (status === 401) {
            showMessage('error', 'Sessão expirada. Faça login novamente.');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 3000);
        } else {
            showMessage('error', error.response.data?.error_msg || 'Erro inesperado.');
        }
    } else {
        console.error('Error fetching client data:', error);
        showMessage('error', 'Erro de conexão com o servidor.');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById('contact-form').addEventListener('submit', (event) => {
        event.preventDefault();
        sendContact();
    });
});

async function sendContact() {
    const name = document.querySelector('input[name="name"]').value;
    const fullPhoneNumber = iti.getNumber();
    const email = document.querySelector('input[name="email"]').value;
    const service = document.querySelector('select[name="service"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const formData = {
        name,
        phone: fullPhoneNumber,
        email,
        service,
        message
    };

    try {
        const response = await axios.post(`${clientUrl}/contact`, formData);
        const data = response.data;

        if (data.success_msg) {
            showMessage('success', data.success_msg);
        } else {
            showMessage('error', data.error_msg);
        }
    } catch (error) {
        errorMsg(error)
    }
}
