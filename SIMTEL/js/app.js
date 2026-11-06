// SIMTEL - interacciones de la interfaz
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuButton = document.getElementById("menuButton");

function toggleMenu(forceClose = false) {
  const shouldOpen = forceClose ? false : !sidebar.classList.contains("active");
  sidebar.classList.toggle("active", shouldOpen);
  overlay.classList.toggle("active", shouldOpen);
  menuButton.setAttribute("aria-expanded", String(shouldOpen));
}

menuButton.addEventListener("click", () => toggleMenu());
document.getElementById("closeMenu").addEventListener("click", () => toggleMenu(true));
overlay.addEventListener("click", () => toggleMenu(true));
sidebar.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => toggleMenu(true));
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modalTitle");
const modalTitles = {
  login: "Iniciar sesión",
  register: "Crear una cuenta",
  profile: "Acceder a mi perfil"
};

document.querySelectorAll("[data-modal]").forEach(button => {
  button.addEventListener("click", () => {
    modalTitle.textContent = modalTitles[button.dataset.modal];
    modal.classList.add("active");
  });
});

function closeModal() {
  modal.classList.remove("active");
}
document.getElementById("closeModal").addEventListener("click", closeModal);
modal.addEventListener("click", event => {
  if (event.target === modal) closeModal();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    closeModal();
    toggleMenu(true);
  }
});

document.getElementById("searchForm").addEventListener("submit", event => {
  event.preventDefault();
  const query = document.getElementById("search").value.trim().toLocaleLowerCase("es");
  const cards = [...document.querySelectorAll(".searchable")];
  let matches = 0;

  cards.forEach(card => {
    const match = !query || card.textContent.toLocaleLowerCase("es").includes(query);
    card.hidden = !match;
    if (match) matches++;
  });

  if (matches) {
    document.getElementById("servicios").scrollIntoView({ behavior: "smooth" });
  } else {
    alert("No encontramos resultados. Intenta con otra búsqueda.");
  }
});

document.getElementById("cartButton").addEventListener("click", () => {
  alert("Tu carrito está vacío. La función de compras requiere conectar un sistema de pedidos.");
});

document.getElementById("accountForm").addEventListener("submit", event => {
  event.preventDefault();
  alert("Formulario de demostración. Para autenticar usuarios debes conectar un backend y una base de datos.");
});


// CHAT SIMTEL

const chatToggle = document.getElementById("chatToggle");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");
const chatForm = document.getElementById("chatForm");
const chatText = document.getElementById("chatText");
const chatMessages = document.getElementById("chatMessages");

chatToggle.addEventListener("click", () => {
    chatWindow.classList.toggle("active");
});

closeChat.addEventListener("click", () => {
    chatWindow.classList.remove("active");
});

// Agregar mensajes
function addMessage(message, type) {
    const div = document.createElement("div");
    div.className = type + "-message";
    div.textContent = message;

    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Respuestas automáticas de demostración
function botReply(message) {
    const text = message.toLowerCase();

    if (text.includes("servicio")) {
        return "Contamos con servicios de ingeniería, telecomunicaciones e instalaciones. ¿Cuál te interesa?";
    }

    if (text.includes("producto") || text.includes("insumo")) {
        return "Puedes consultar nuestro catálogo de insumos, herramientas y maquinaria en la sección Productos.";
    }

    if (text.includes("asesor") || text.includes("persona")) {
        return "Con gusto te atenderemos. Puedes escribirnos a través de nuestra sección de contacto.";
    }

    return "Gracias por comunicarte con SIMTEL. Cuéntanos un poco más sobre lo que necesitas.";
}

// Enviar mensaje
chatForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const message = chatText.value.trim();

    if (!message) return;

    addMessage(message, "user");
    chatText.value = "";

    setTimeout(() => {
        addMessage(botReply(message), "bot");
    }, 500);
});

// Botones de opciones rápidas
document.querySelectorAll(".quick-options button").forEach(button => {
    button.addEventListener("click", () => {
        const question = button.dataset.question;

        addMessage(question, "user");

        setTimeout(() => {
            addMessage(botReply(question), "bot");
        }, 500);
    });
});



/* CARRUSEL AUTOMÁTICO SIMTEL */

const slides = document.querySelectorAll(".hero-slide");
const indicators = document.querySelectorAll(".indicator");

let currentSlide = 0;
let slideInterval;

function showSlide(index) {

    slides.forEach(slide => slide.classList.remove("active"));
    indicators.forEach(dot => dot.classList.remove("active"));

    currentSlide = index;

    slides[currentSlide].classList.add("active");
    indicators[currentSlide].classList.add("active");
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function startCarousel() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
}

indicators.forEach((indicator, index) => {

    indicator.addEventListener("click", () => {
        showSlide(index);
        startCarousel();
    });

});

if (slides.length > 0) {
    showSlide(0);
    startCarousel();
}
