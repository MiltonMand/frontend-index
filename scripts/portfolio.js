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





/*================================ BACKEND SCRIPTS ====================================*/
import apiUrl from '../config/urlConfig.js';
import { showMessage } from '../config/responseMsg.js';

const clientUrl = `${apiUrl}/api/client`;


const projects = [
    {
        id: 'ecommerce-premium',
        title: 'E-commerce Premium',
        category: 'Web Development',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXfZO3obE15TS3kuUeF7pv6XkNSOVJeihyQ&s',
        technologies: ['React.js', 'Node.js', 'MongoDB'],
        description: 'Plataforma completa de e-commerce com dashboard administrativo e análise de dados em tempo real.',
        tags: ['web', 'app'],
        fullDescription: 'Uma plataforma completa de e-commerce desenvolvida com as mais recentes tecnologias...',
        features: [
            'Dashboard Administrativo',
            'Análise em Tempo Real',
            'Gestão de Estoque',
            'Múltiplos Meios de Pagamento'
        ],
        techStack: ['React.js', 'Node.js', 'MongoDB', 'Redux', 'AWS']
    },
    {
        id: 'healthcare-pro1',
        title: 'HealthCare Pro',
        category: 'Mobile Development',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXfZO3obE15TS3kuUeF7pv6XkNSOVJeihyQ&s',
        technologies: ['Flutter', 'Firebase', 'UI/UX'],
        description: 'Aplicativo móvel para gestão de saúde e agendamento de consultas médicas.',
        tags: ['app', 'ui'],
        fullDescription: 'Sistema completo de gestão de saúde com recursos avançados...',
        features: [
            'Agendamento Online',
            'Prontuário Digital',
            'Telemedicina',
            'Prescrição Digital'
        ],
        techStack: ['Flutter', 'Firebase', 'Node.js', 'MongoDB']
    },
    {
        id: 'healthcare-pro2',
        title: 'HealthCare Pro',
        category: 'Mobile Development',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXfZO3obE15TS3kuUeF7pv6XkNSOVJeihyQ&s',
        technologies: ['Flutter', 'Firebase', 'UI/UX'],
        description: 'Aplicativo móvel para gestão de saúde e agendamento de consultas médicas.',
        tags: ['app', 'ui'],
        fullDescription: 'Sistema completo de gestão de saúde com recursos avançados...',
        features: [
            'Agendamento Online',
            'Prontuário Digital',
            'Telemedicina',
            'Prescrição Digital'
        ],
        techStack: ['Flutter', 'Firebase', 'Node.js', 'MongoDB']
    },
    {
        id: 'healthcare-pro3',
        title: 'HealthCare Pro',
        category: 'Mobile Development',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXfZO3obE15TS3kuUeF7pv6XkNSOVJeihyQ&s',
        technologies: ['Flutter', 'Firebase', 'UI/UX'],
        description: 'Aplicativo móvel para gestão de saúde e agendamento de consultas médicas.',
        tags: ['app', 'ui'],
        fullDescription: 'Sistema completo de gestão de saúde com recursos avançados...',
        features: [
            'Agendamento Online',
            'Prontuário Digital',
            'Telemedicina',
            'Prescrição Digital'
        ],
        techStack: ['Flutter', 'Firebase', 'Node.js', 'MongoDB']
    },
    {
        id: 'healthcare-pro4',
        title: 'HealthCare Pro',
        category: 'Mobile Development',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXfZO3obE15TS3kuUeF7pv6XkNSOVJeihyQ&s',
        technologies: ['Flutter', 'Firebase', 'UI/UX'],
        description: 'Aplicativo móvel para gestão de saúde e agendamento de consultas médicas.',
        tags: ['app', 'ui'],
        fullDescription: 'Sistema completo de gestão de saúde com recursos avançados...',
        features: [
            'Agendamento Online',
            'Prontuário Digital',
            'Telemedicina',
            'Prescrição Digital'
        ],
        techStack: ['Flutter', 'Firebase', 'Node.js', 'MongoDB']
    },
    {
        id: 'healthcare-pro5',
        title: 'HealthCare Pro',
        category: 'Mobile Development',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXfZO3obE15TS3kuUeF7pv6XkNSOVJeihyQ&s',
        technologies: ['Flutter', 'Firebase', 'UI/UX'],
        description: 'Aplicativo móvel para gestão de saúde e agendamento de consultas médicas.',
        tags: ['app', 'ui'],
        fullDescription: 'Sistema completo de gestão de saúde com recursos avançados...',
        features: [
            'Agendamento Online',
            'Prontuário Digital',
            'Telemedicina',
            'Prescrição Digital'
        ],
        techStack: ['Flutter', 'Firebase', 'Node.js', 'MongoDB']
    },
    {
        id: 'healthcare-pro6',
        title: 'HealthCare Pro',
        category: 'Mobile Development',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnXfZO3obE15TS3kuUeF7pv6XkNSOVJeihyQ&s',
        technologies: ['Flutter', 'Firebase', 'UI/UX'],
        description: 'Aplicativo móvel para gestão de saúde e agendamento de consultas médicas.',
        tags: ['app', 'ui'],
        fullDescription: 'Sistema completo de gestão de saúde com recursos avançados...',
        features: [
            'Agendamento Online',
            'Prontuário Digital',
            'Telemedicina',
            'Prescrição Digital'
        ],
        techStack: ['Flutter', 'Firebase', 'Node.js', 'MongoDB']
    },
];

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
        showMessage('error', 'Erro de conexão.');
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderProjects();
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

function renderProjects() {
    const wrapper = document.querySelector('.projects-wrapper');
    let projectsHTML = '';

    // Divide os projetos em grupos (2-3-2-3)
    for (let i = 0; i < projects.length; i++) {
        if (i % 5 === 0) {
            // Linha com 2 projetos
            const rowProjects = projects.slice(i, i + 2);
            projectsHTML += createProjectRow(rowProjects, 2);
        } else if (i % 5 === 2) {
            // Linha com 3 projetos
            const rowProjects = projects.slice(i, i + 3);
            projectsHTML += createProjectRow(rowProjects, 3);
        }
    }

    wrapper.innerHTML = projectsHTML;
}

function createProjectRow(projects, columns) {
    if (projects.length === 0) return '';

    return `
        <div class="projects-row row-${columns}">
            ${projects.map(project => createProjectCard(project)).join('')}
        </div>
    `;
}

function createProjectCard(project) {
    return `
       <div class="project-card">
            <div class="project-img">
                <img src="../public/images/pexels-goumbik-577210.jpg" alt="Project ${project._id}">
            </div>
            <div class="description">
                <h3>${project.title}</h3>
                <p>
                    ${project.description}
                </p>
                <div class="tecnologies">
                    <p>html</p>
                    <p>css</p>
                    <p>javascript</p>
                </div>
            </div>
        </div>
    `;
}
