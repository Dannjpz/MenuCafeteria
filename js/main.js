document.addEventListener("DOMContentLoaded", () => {
  // Función mejorada para cargar componentes
  const loadComponent = (url, containerId) => {
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.warn(`Contenedor '${containerId}' no encontrado. Componente ${url} no se cargará.`);
      return Promise.resolve(); // Retornamos una promesa resuelta para no romper Promise.all
    }

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error cargando ${url}: ${response.status} ${response.statusText}`);
        }
        return response.text();
      })
      .then(html => {
        container.innerHTML = html;
      })
      .catch(error => {
        console.error(`Error cargando componente ${url}:`, error);
        container.innerHTML = `<p>Error cargando componente. Por favor, recarga la página.</p>`;
      });
  };

  // Definimos los componentes a cargar
  const components = [
    { url: "components/header.html", id: "header" },
    { url: "components/footer.html", id: "footer" },
    { url: "components/reservas.html", id: "reservas" },
    { url: "components/testimonials.html", id: "testimonios" },
    // { url: "components/membership.html", id: "membership" },
    // { url: "components/login.html", id: "inicio-sesion" },
    { url: "components/ubicacion.html", id: "ubicacion" },
    { url: "components/inicio.html", id: "inicio" },
    { url: "components/portada.html", id: "portada" }
  ];

  // Verificamos que existan todos los contenedores necesarios
  const missingContainers = components
    .filter(comp => !document.getElementById(comp.id))
    .map(comp => comp.id);

  if (missingContainers.length > 0) {
    console.warn('Contenedores faltantes:', missingContainers);
  }

  // Cargamos los componentes
  Promise.all(
    components.map(comp => loadComponent(comp.url, comp.id))
  )
  .then(() => {
    // Inicialización del header y menú
    const header = document.querySelector(".header");
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const portada = document.getElementById("portada");

    if (header && portada) {
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
    }

    if (menuToggle && navMenu) {
      menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
      });

      navMenu.addEventListener("click", event => {
        if (event.target.tagName === "A") {
          navMenu.classList.remove("active");
        }
      });
    }

    console.log("Componentes cargados exitosamente.");
  })
  .catch(error => {
    console.error("Error en la carga de componentes:", error);
  });
});