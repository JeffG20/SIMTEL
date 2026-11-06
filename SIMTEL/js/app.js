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
