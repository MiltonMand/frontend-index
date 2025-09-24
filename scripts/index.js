/*================================ FRONTEND SCRIPTS ===================================*/
window.addEventListener("scroll", () => {
  const header = document.querySelector("header");
  header.classList.toggle("scroll-active", window.scrollY > 0);
});

document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    const isExternal = href.startsWith("http") || href.startsWith("www");

    const isInternal = href.startsWith("#");

    if (isExternal || !isInternal) {
      return;
    }

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 50,
        behavior: "smooth",
      });
    }

    const menuMobile = document.querySelector(".menu-mobile");
    if (menuMobile) {
      menuMobile.classList.remove("active");
    }
  });
});

const menuToggle = document.getElementById("menu-toggle");
const menuMobile = document.getElementById("menu-mobile");
const closeBtn = document.getElementById("close-btn");

menuToggle.addEventListener("click", () => {
  menuMobile.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  menuMobile.classList.remove("active");
});

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  const header = faq.querySelector(".faq-header");

  header.addEventListener("click", () => {
    faq.classList.toggle("active");

    faqs.forEach((otherFaq) => {
      if (otherFaq !== faq && otherFaq.classList.contains("active")) {
        otherFaq.classList.remove("active");
      }
    });
  });
});

/*================================ BACKEND SCRIPTS =================================*/
import apiUrl from "../config/urlConfig.js";
import { showMessage } from "../config/responseMsg.js";

const clientUrl = `${apiUrl}/api/client`;

function errorMsg(error) {
  if (error.response) {
    const status = error.response.status;

    if (status == 401) {
      showMessage("error", "Sessão expirada. Faça login novamente.");
      setTimeout(() => {
        window.location.href = "login.html";
      }, 3000);
    } else {
      showMessage(
        "error",
        error.response.data?.error_msg || "Erro inesperado."
      );
    }
  } else {
    console.error("Error fetching client data:", error);
    showMessage("error", "Erro de conexão com o servidor.");
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await axios.get("./data.json");
    const data = res.data;

    document
      .getElementById("contact-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        sendContact();
      });

    window.loadedData = data;
    loadFeedbacks(data.feedbacks);
    loadServices(data.services);
    loadProjects(data.projects);

    document.getElementById("all-projects-btn").onclick = () => {
      fullModalProjects();
    };

    document.getElementById("all-feedbacks-btn").onclick = () => {
      fullModalFeedbacks();
    };
  } catch (err) {
    errorMsg(err);
  }
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
    message,
  };

  try {
    const response = await axios.post(`${clientUrl}/contact`, formData);
    const data = response.data;

    if (data.success_msg) {
      showMessage("success", data.success_msg);
    } else {
      showMessage("error", data.error_msg);
    }
  } catch (error) {
    errorMsg(error);
  }
}

async function loadFeedbacks(feedbacks) {
  try {
    const containers = document.querySelectorAll(".feedback-container");

    containers.forEach((element, index) => {
      // Filtra apenas os que devem ser exibidos
      let visibleFeedbacks = feedbacks.filter((item) => item.view == true);

      // Se for o primeiro container, mostra só 4
      if (index == 0) {
        visibleFeedbacks = visibleFeedbacks.slice(0, 3);
      }

      visibleFeedbacks.forEach((item) => {
        const card = document.createElement("div");
        card.className = "testimonial-card";

        const fullStars = Math.floor(item.stars);
        const hasHalf = item.stars % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

        let starIcons = "";
        starIcons += '<i class="fa-solid fa-star"></i>'.repeat(fullStars);
        if (hasHalf) {
          starIcons += '<i class="fa-solid fa-star-half-stroke"></i>';
        }
        starIcons += '<i class="fa-regular fa-star"></i>'.repeat(emptyStars);

        card.innerHTML = `
          <div class="testimonial-content">
            <i class="fas fa-quote-left"></i>
            <p>"${item.message}"</p>
          </div>
          <div class="stars">${starIcons}</div>
          <div class="testimonial-author">
            <img src="${item.photo}" class="client-photo" alt="${item.name} photo" />
            <div class="author-info">
              <h4>${item.name}</h4>
              <p>${item.profession}</p>
            </div>
          </div>
        `;

        card.onclick = () => openModal("feedback", item._id, loadedData);
        element.appendChild(card);
      });
    });
  } catch (err) {
    errorMsg(err);
  }
}

async function loadServices(services) {
  try {
    const container = document.querySelectorAll(".services-container");

    container.forEach((element) => {
      services.forEach((service) => {
        const card = document.createElement("div");
        card.className = "card-service";

        card.innerHTML = `
        <div class="service-card-title">
          <i class="${service.classIcon}"></i>
          <h3>${service.title}</h3>
        </div>
        <div class="service-card-text">
          <p>${service.description}</p>
        </div>
      `;

        card.onclick = () => openModal("service", service._id, loadedData);

        element.appendChild(card);
      });
    });
  } catch (err) {
    errorMsg(err);
  }
}
async function loadProjects(projects) {
  try {
    const containers = document.querySelectorAll(".projects-container");

    containers.forEach((element, index) => {
      // se for o primeiro container, pega só os 4 primeiros
      const list = index === 0 ? projects.slice(0, 4) : projects;

      list.forEach((project) => {
        const card = document.createElement("div");
        card.className = "project-card";

        const techHTML = project.techStack
          .map((tech) => `<p>${tech}</p>`)
          .join("");

        card.innerHTML = `
          <div class="project-img">
            <img src="${project.image}" alt="${project.title}" />
          </div>
          <div class="description">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tecnologies">
              ${techHTML}
            </div>
          </div>
        `;

        card.onclick = () => openModal("project", project._id, loadedData);
        element.appendChild(card);
      });
    });
  } catch (err) {
    errorMsg(err);
  }
}


function fullModalProjects() {
  const modal = document.getElementById("fullscreen-modal");
  const projectsContainer = document.getElementById("modalFullP");
  const feedbacksContainer = document.getElementById("modalFullF");

  projectsContainer.style.display = "grid";
  feedbacksContainer.style.display = "none";

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

function fullModalFeedbacks() {
  const modal = document.getElementById("fullscreen-modal");
  const projectsContainer = document.getElementById("modalFullP");
  const feedbacksContainer = document.getElementById("modalFullF");

  projectsContainer.style.display = "none";
  feedbacksContainer.style.display = "grid";

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
}

// Função geral para abrir modal
function openModal(type, id, data) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = ""; // limpar conteúdo

  let item;

  if (type == "feedback") {
    item = data.feedbacks.find((f) => f._id == id);
    if (!item) return;

    const fullStars = Math.floor(item.stars);
    const hasHalf = item.stars % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);
    let starIcons = "";
    starIcons += '<i class="fa-solid fa-star"></i>'.repeat(fullStars);
    if (hasHalf) starIcons += '<i class="fa-solid fa-star-half-stroke"></i>';
    starIcons += '<i class="fa-regular fa-star"></i>'.repeat(emptyStars);

    modalBody.innerHTML = `
      <h3>${item.name}</h3>
      <p><strong>Profession:</strong> ${item.profession}</p>
      <div class="stars">${starIcons}</div>
      <p>${item.message}</p>
      <img src="${item.photo}" alt="${item.name}" style="width:80px;border-radius:50%;margin-top:15px;">
    `;
  } else if (type == "service") {
    item = data.services.find((s) => s._id == id);
    if (!item) return;

    modalBody.innerHTML = `
      <div class="service-modal">
        <i class="${item.classIcon}" style="font-size:36px;margin-bottom:10px;"></i>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <img src="${item.image}" alt="${item.title}" style="width:100%;margin-top:10px;border-radius:8px;">
      </div>
    `;
  } else if (type == "project") {
    item = data.projects.find((p) => p._id == id);
    if (!item) return;

    const techHTML = item.techStack
      .map(
        (t) =>
          `<span style="margin-right:6px;padding:4px 8px;background:#eee;border-radius:4px;">${t}</span>`
      )
      .join("");

    const featuresHTML = item.features.map((f) => `<li>${f}</li>`).join("");

    modalBody.innerHTML = `
      <img src="${item.image}" alt="${item.title}" style="width:100%;border-radius:8px;margin-bottom:10px;">
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <div style="margin-top:10px;"><strong>Technologies:</strong> ${techHTML}</div>
      <div style="margin-top:10px;"><strong>Features:</strong><ul>${featuresHTML}</ul></div>
    `;
  }

  modal.style.display = "flex";
}

// Fechar modal
document.querySelector(".modal-close").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

// Fechar clicando fora do modal
window.addEventListener("click", (e) => {
  const modal = document.getElementById("modal");
  if (e.target == modal) modal.style.display = "none";
});

// Fechar o modal
document.getElementById("fs-back-btn").onclick = () => {
  document.getElementById("fullscreen-modal").style.display = "none";
  document.body.style.overflow = "";
};
