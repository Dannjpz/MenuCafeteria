
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

const models = [
  {
    ios: "./images/pizzaPeperoni.usdz",
    androidAR: "./models/taco.glb",
    androidWeb: "./models/taco_0.4_draco.glb",
    fallback: "./images/pizza.jpg",
  },
  {
    ios: "./images/pizzaPeperoni.usdz",
    androidAR: "./models/taco2.glb",
    androidWeb: "./models/taco_0.4_draco2.glb",
    fallback: "./images/pizza2.jpg",
  },
];

const container = document.getElementById("3d-container");

// Función para crear contenido para cada modelo
function createModelViewer(model) {
  if (isIOS()) {
    const link = document.createElement("a");
    link.setAttribute("rel", "ar");
    link.setAttribute("href", model.ios);

    const previewImage = document.createElement("img");
    previewImage.alt = "Ver modelo en AR";
    previewImage.src = model.fallback;
    previewImage.style.width = "300px";
    previewImage.style.cursor = "pointer";

    link.appendChild(previewImage);

    const message = document.createElement("p");
    message.textContent =
      "Haz clic en la imagen para ver el modelo en realidad aumentada";
    message.style.textAlign = "center";

    container.appendChild(link);
    container.appendChild(message);
  } else if (isAndroid()) {
    console.log(
      "Dispositivo Android detectado. Cargando modelo en segundo plano..."
    );

    fetch(model.androidWeb)
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);

        // Crear <model-viewer> para el modelo
        const viewer = document.createElement("model-viewer");
        viewer.setAttribute("src", objectURL);
        viewer.setAttribute("poster", model.fallback);
        viewer.setAttribute("ar", "");
        viewer.setAttribute("auto-rotate", "");
        viewer.setAttribute("camera-controls", "");
        viewer.setAttribute("reveal", "auto");
        viewer.setAttribute("loading", "eager");
        viewer.setAttribute("ar-modes", "scene-viewer webxr quick-look");
        viewer.setAttribute("ar-scale", "auto");
        viewer.setAttribute("ar-src", model.androidAR);

        viewer.style.width = "100%";
        viewer.style.height = "250px";

        container.appendChild(viewer);
      })
      .catch((error) => {
        console.error("Error al cargar el modelo:", error);

        const fallbackImage = document.createElement("img");
        fallbackImage.src = model.fallback;
        fallbackImage.alt = "Vista previa del producto";
        fallbackImage.style.width = "300px";
        fallbackImage.style.display = "block";
        fallbackImage.style.margin = "0 auto";
        container.appendChild(fallbackImage);
      });

  } else {
    const fallbackImage = document.createElement("img");
    fallbackImage.src = model.fallback;
    fallbackImage.alt = "Vista previa del producto";
    fallbackImage.style.width = "300px";
    fallbackImage.style.display = "block";
    fallbackImage.style.margin = "0 auto";

    const message = document.createElement("p");
    message.textContent =
      "La visualización interactiva no está disponible en este dispositivo.";
    message.style.textAlign = "center";

    container.appendChild(fallbackImage);
    container.appendChild(message);
  }
}

// Generar contenido para todos los modelos
models.forEach((model) => createModelViewer(model));
