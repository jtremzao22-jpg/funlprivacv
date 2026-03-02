document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("popupOverlay");
  const closeButton = document.getElementById("closePopup");
  const socialLinks = document.querySelectorAll(".social-link");
  // Add globe icon selector
  const globeIcon = document.querySelector(
    ".navbar svg[viewBox='0 0 30 30.000001']"
  );

  function openPopup() {
    if (window.innerWidth <= 768) {
      // Só abre em telas mobile
      popup.classList.add("active");
      document.body.classList.add("popup-active");
      document.documentElement.classList.add("popup-active"); // Lock html
    }
  }

  function closePopup() {
    popup.classList.remove("active");
    document.body.classList.remove("popup-active");
    document.documentElement.classList.remove("popup-active"); // Unlock html
  }

  // Event Listeners
  socialLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      openPopup();
    });
  });

  // Add click event for globe icon
  if (globeIcon) {
    globeIcon.parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      openPopup();
    });
  }

  closeButton.addEventListener("click", closePopup);

  // Fecha o popup ao clicar fora dele
  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      closePopup();
    }
  });

  // Fecha o popup com a tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && popup.classList.contains("active")) {
      closePopup();
    }
  });

  // =============================================
  // Feed cards click → scroll to pricing panel
  // =============================================
  const feedCards = document.querySelectorAll(".feed-card");
  const pricingPanel = document.getElementById("pricing-panel");

  feedCards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      // Não interferir com links ou botões dentro do card
      if (e.target.closest("a") || e.target.closest("button")) return;
      if (pricingPanel) {
        pricingPanel.scrollIntoView({ behavior: "smooth", block: "center" });
        // Efeito de destaque temporário
        pricingPanel.style.transition = "box-shadow 0.3s ease";
        pricingPanel.style.boxShadow = "0 0 25px rgba(255, 107, 61, 0.5)";
        setTimeout(function () {
          pricingPanel.style.boxShadow = "";
        }, 1500);
      }
    });
  });

  // =============================================
  // Plans Popup (VEJA TUDO AGORA)
  // =============================================
  const plansPopup = document.getElementById("plansPopupOverlay");
  const openPlansBtn = document.getElementById("openPlansPopup");
  const closePlansBtn = document.getElementById("closePlansPopup");

  function openPlansPopup() {
    plansPopup.classList.add("active");
    document.body.classList.add("popup-active");
    document.documentElement.classList.add("popup-active");
  }

  function closePlansPopup() {
    plansPopup.classList.remove("active");
    document.body.classList.remove("popup-active");
    document.documentElement.classList.remove("popup-active");
  }

  if (openPlansBtn) {
    openPlansBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openPlansPopup();
    });
  }

  if (closePlansBtn) {
    closePlansBtn.addEventListener("click", closePlansPopup);
  }

  if (plansPopup) {
    plansPopup.addEventListener("click", function (e) {
      if (e.target === plansPopup) {
        closePlansPopup();
      }
    });
  }

  // ESC também fecha plans popup
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && plansPopup && plansPopup.classList.contains("active")) {
      closePlansPopup();
    }
  });
});
