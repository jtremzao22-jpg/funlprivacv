document.addEventListener("DOMContentLoaded", () => {
  // Elementos DOM
  const navbar = document.querySelector(".navbar");
  // const bioText = document.getElementById("bioText");
  // const bioToggle = document.getElementById("bioToggle");
  const toggleBtns = document.querySelectorAll(".toggle-btn");
  const contentSections = document.querySelectorAll(".content-section");
  let lastScroll = 0;

  // Detectar dispositivos iOS
  const isIOS = () => {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
      // iPad no iOS 13+ não aparece como iPad no navigator.platform
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document);
  };

  // Função para inicializar vídeos (apenas atributos, sem overlay)
  function initializeVideos() {
    const videos = document.querySelectorAll('video');

    videos.forEach(video => {
      // Garantir atributos necessários para iOS
      video.setAttribute('webkit-playsinline', 'true');
      video.setAttribute('playsinline', 'true');
      video.muted = true;

      // Tentar reproduzir silenciosamente
      video.play().catch(() => {
        // Autoplay falhou, mas NÃO vamos mostrar overlay nenhum
        console.log('Autoplay iniciado (ou falhou silenciosamente)');
      });
    });
  }

  // Inicializar vídeos quando a página carregar
  initializeVideos();

  // Re-inicializar vídeos após interações do usuário (para contornar políticas de autoplay)
  let userInteracted = false;
  const enableAutoplayAfterInteraction = () => {
    if (!userInteracted) {
      userInteracted = true;
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        if (video.paused) {
          video.play().catch(e => console.log('Erro ao reproduzir vídeo:', e));
        }
      });
    }
  };

  // Eventos de interação do usuário
  ['touchstart', 'click', 'scroll'].forEach(event => {
    document.addEventListener(event, enableAutoplayAfterInteraction, { once: true });
  });

  // Função para alternar a bio
  function toggleBio() {
    const bioText = document.getElementById("bioText");
    const bioToggle = document.getElementById("bioToggle");

    if (bioText.classList.contains("expanded")) {
      bioText.classList.remove("expanded");
      bioToggle.textContent = "Mostrar mais";
      // Scroll suave para a bio se necessário
      bioText.scrollIntoView({ behavior: "smooth", block: "nearest" });
    } else {
      bioText.classList.add("expanded");
      bioToggle.textContent = "Mostrar menos";
    }
  }

  // Event listener para o botão de bio
  // if (bioToggle) bioToggle.addEventListener("click", toggleBio);

  // Controle da navbar durante o scroll
  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > lastScroll && currentScroll > 100) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    navbar.style.transition = "transform 0.3s ease";
    lastScroll = currentScroll;
  });
});
