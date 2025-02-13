const menuItems = [
  {
    id: 1,
    name: "Pizza Peperoni",
    price: "$159",
    category: "entradas",
    description:
      "DeliciosARa pizza con peperoni, queso mozzarella y salsa de tomate",
    models: {
      iosAR: "./images/id1.usdz",
      androidAR: "./models/id1.glb",
      modelAR: "./models/id1R0.2C10.glb",
      /*fallback: "./images/pizza.jpg"*/
    }
  },
  {
    id: 2,
    name: "Tacos al Pastor",
    price: "$89",
    category: "fuertes",
    description: "Tacos tradicionales con carne al pastor, piña y cilantro",
    models: {
      iosAR: "./images/id2.usdz",
      androidAR: "./models/id2.glb",
      modelAR: "./models/id2R0.4C10.glb",
      /*fallback: "./images/taco.jpg"*/
    }
  },
  {
    id: 3,
    name: "Tacos al Pastor",
    price: "$89",
    category: "fuertes",
    description: "Tacos tradicionales con carne al pastor, piña y cilantro",
    models: {
      iosAR: "./images/id2.usdz",
      androidAR: "./models/id2.glb",
      modelAR: "./models/id2R0.4C10.glb",
      /*fallback: "./images/taco.jpg"*/
    }
  },
  {
    id: 4,
    name: "Tacos al Pastor",
    price: "$89",
    category: "fuertes",
    description: "Tacos tradicionales con carne al pastor, piña y cilantro",
    models: {
      iosAR: "./images/id2.usdz",
      androidAR: "./models/id2.glb",
      modelAR: "./models/id2R0.4C10.glb",
      /*fallback: "./images/taco.jpg"*/
    }
  }
];

function createMenuItem(item) {
  const menuItem = document.createElement("div");
  menuItem.className = "menu-item";
  menuItem.dataset.category = item.category;

  const content = `
  <model-viewer
    src="${item.models.androidAR}"
    iosAR-src="${item.models.iosAR}"
    ar
    ar-modes="scene-viewer quick-look"
    camera-controls
    auto-rotate
    camera-orbit="0deg 75deg 0.7m"
    min-camera-orbit="auto auto 0.5m"
    max-camera-orbit="auto auto 2m"
    style="width: 100%; height: 300px; touch-action: none; background-color: #1c1c1c;"
  ></model-viewer>
  <div class="menu-item-content">
    <h3 class="menu-item-title">${item.name}</h3>
    <p class="menu-item-price">${item.price}</p>
    <p class="menu-item-description">${item.description}</p>
  </div>
`;

  menuItem.innerHTML = content;
  return menuItem;
}

// Filtrado por categorías
document.querySelectorAll(".category-btn").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;

    // Actualizar botones activos
    document
      .querySelectorAll(".category-btn")
      .forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    // Filtrar items
    document.querySelectorAll(".menu-item").forEach(item => {
      if (category === "todos" || item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

// Inicializar el menú
const container = document.getElementById("3d-container");
menuItems.forEach(item => {
  container.appendChild(createMenuItem(item));
});

function filterInitialMenu() {
  const filteredItems = document.querySelectorAll(".menu-item");
  filteredItems.forEach(item => {
    if (item.dataset.category === "entradas") {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function initializeARMenu() {
  const container = document.getElementById("3d-container");
  menuItems.forEach(item => {
    container.appendChild(createMenuItem(item));
  });

  filterInitialMenu(); 

  // Agregar event listeners a los botones de categoría
  document.querySelectorAll(".category-btn").forEach(button => {
    button.addEventListener("click", filterMenuByCategory);
  });
}

function filterMenuByCategory(event) {
  const category = event.target.dataset.category;

  // Actualizar botones activos
  document
    .querySelectorAll(".category-btn")
    .forEach(btn => btn.classList.remove("active"));
  event.target.classList.add("active");

  // Filtrar elementos del menú
  document.querySelectorAll(".menu-item").forEach(item => {
    if (category === "todos" || item.dataset.category === category) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function initializeCategorySlider() {
  const wrapper = document.querySelector(".categories-wrapper");
  let startX = 0;
  let scrollLeft = 0;
  let isDragging = false;

  // Solo activar para pantallas móviles
  function isMobile() {
    return window.innerWidth <= 768;
  }

  // Detectar arrastre y evitar conflictos con clics
  wrapper.addEventListener("mousedown", e => {
    if (!isMobile()) return;
    isDragging = true;
    startX = e.pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
    wrapper.style.cursor = "grabbing";
    e.preventDefault();
  });

  wrapper.addEventListener("mouseleave", () => {
    isDragging = false;
    wrapper.style.cursor = "grab";
  });

  wrapper.addEventListener("mouseup", () => {
    isDragging = false;
    wrapper.style.cursor = "grab";
  });

  wrapper.addEventListener("mousemove", e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - walk;
  });

  // Manejo de touch
  wrapper.addEventListener("touchstart", e => {
    if (!isMobile()) return;
    startX = e.touches[0].pageX - wrapper.offsetLeft;
    scrollLeft = wrapper.scrollLeft;
  });

  wrapper.addEventListener("touchmove", e => {
    if (!startX) return;
    const x = e.touches[0].pageX - wrapper.offsetLeft;
    const walk = (x - startX) * 2;
    wrapper.scrollLeft = scrollLeft - walk;
  });
}

document.querySelector(".categories-wrapper").addEventListener("click", e => {
  if (e.target.classList.contains("category-btn")) {
    filterMenuByCategory(e);
  }
});