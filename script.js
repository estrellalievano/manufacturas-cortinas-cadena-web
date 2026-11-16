// Navegación móvil y animaciones suaves al entrar en pantalla.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("is-open");
  menuButton.setAttribute("aria-expanded", String(isOpen));
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
  });
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// El formulario prepara un mensaje de WhatsApp con los datos capturados.
const quoteForm = document.querySelector("#quote-form");
quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = new FormData(quoteForm);
  const message = [
    "Hola, quiero solicitar una cotización.",
    `Nombre: ${data.get("nombre")}`,
    `Teléfono: ${data.get("telefono")}`,
    `Correo: ${data.get("correo") || "No proporcionado"}`,
    `Producto: ${data.get("producto")}`,
    `Proyecto: ${data.get("proyecto") || "Sin detalles adicionales"}`
  ].join("\n");
  const whatsappUrl = `https://wa.me/527731218597?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, "_blank", "noopener");
});
