const menuItems = [
  {
    id: 1,
    name: "Pizza Peperoni",
    price: "$159",
    category: "pizzas",
    description:
      "Deliciosa pizza con peperoni, queso mozzarella y salsa de tomate",
    models: {
      ios: "./images/pizzaPeperoni.usdz",
      androidAR: "./models/pizza.glb",
      androidWeb: "./models/pizza_0.4_draco.glb",
      fallback: "./images/pizza.jpg"
    }
  },
  {
    id: 2,
    name: "Tacos al Pastor",
    price: "$89",
    category: "tacos",
    description: "Tacos tradicionales con carne al pastor, piña y cilantro",
    models: {
      ios: "./images/tacos.usdz",
      androidAR: "./models/taco.glb",
      androidWeb: "./models/taco_0.4_draco.glb",
      fallback: "./images/taco.jpg"
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
      ios-src="${item.models.ios}"
      ar
      ar-modes="scene-viewer quick-look"
      camera-controls
      auto-rotate
      camera-orbit="0deg 75deg 0.7m"
      min-camera-orbit="auto auto 0.5m"
      max-camera-orbit="auto auto 2m"
      style="width: 100%; height: 150px"
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

function initializeARMenu() {
  const container = document.getElementById("3d-container");
  menuItems.forEach(item => {
    container.appendChild(createMenuItem(item));
  });

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
