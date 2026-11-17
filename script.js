const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  document.documentElement.classList.add("has-reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible", entry.isIntersecting);
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -24px 0px"
  });

  revealItems.forEach((item) => revealObserver.observe(item));
}

const menuButton = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#site-nav");

    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Abrir menu" : "Fechar menu");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navigation.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        navigation.classList.remove("is-open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Abrir menu");
      }
    });

    document.querySelector("#current-year").textContent = new Date().getFullYear();

    document.querySelector("#booking-form").addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const optional = [
        ["Porte ou raça", data.get("porte")],
        ["Preferência de horário", data.get("horario")],
        ["Observação", data.get("observacao")]
      ].filter(([, value]) => String(value).trim());
      const lines = [
        "Olá! Gostaria de consultar um horário.",
        "",
        `Meu nome: ${data.get("nome").trim()}`,
        `Nome do pet: ${data.get("pet").trim()}`,
        `Serviço: ${data.get("servico")}`,
        ...optional.map(([label, value]) => `${label}: ${String(value).trim()}`)
      ];
      const whatsappUrl = `https://wa.me/5535998310866?text=${encodeURIComponent(lines.join("\n"))}`;
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    });
