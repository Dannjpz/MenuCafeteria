document.addEventListener("DOMContentLoaded", () => {
  const portada = document.getElementById("portada");

  const loadComponent = (url, containerId) => {
    return fetch(url).then(res => res.text()).then(html => {
      document.getElementById(containerId).innerHTML = html;
    });
  };

  Promise.all([
    loadComponent("components/header.html", "header"),
    loadComponent("components/footer.html", "footer"),
    loadComponent("components/reservas.html", "reservas"),
    loadComponent("components/testimonials.html", "testimonios"),
    loadComponent("components/membership.html", "membership"),
    loadComponent("components/login.html", "inicio-sesion"),
    loadComponent("components/ubicacion.html", "ubicacion"),
    loadComponent("components/inicio.html", "inicio"),
    loadComponent("components/portada.html", "portada")
  ])
    .then(() => {
      const header = document.querySelector(".header");
      const menuToggle = document.getElementById("menu-toggle");
      const navMenu = document.getElementById("nav-menu");
      const portadaHeight = portada.offsetHeight;

      header.classList.add("hidden");

      window.addEventListener("scroll", () => {
        if (window.scrollY >= portadaHeight) {
          header.classList.add("visible");
          header.classList.remove("hidden");
        } else {
          header.classList.remove("visible");
          header.classList.add("hidden");
        }
      });

      if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
          navMenu.classList.toggle("active");
        });

        // Contraer el menú al hacer clic en cualquier enlace
        navMenu.addEventListener("click", event => {
          if (event.target.tagName === "A") {
            navMenu.classList.remove("active");
          }
        });
      }

      console.log("Todos los componentes cargados.");
    })
    .catch(error => {
      console.error("Error al cargar los componentes:", error);
    });
});
