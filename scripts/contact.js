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
    const email = document.querySelector('input[name="email"]').value;
    const service = document.querySelector('select[name="service"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const formData = {
        name,
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
