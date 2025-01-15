import { isIOS, isSafari, isAndroid } from './utils/device-detection.js';
import { loadImageWithPlaceholder } from './utils/image-loader.js';

// URLs de los archivos
const iosModelURL = "./images/pizzaPeperoni.usdz";
const androidModelURL = "./models/object_draco.glb";
const fallbackImageURL = "./images/pizza2.jpg";
const cargando1URL = "./images/placeholders/cargando1.jpg";

// Contenedor donde se agregará el contenido
const container = document.getElementById("3d-container");

if (isIOS() && isSafari()) {
  const link = document.createElement("a");
  link.setAttribute("rel", "ar");
  link.setAttribute("href", iosModelURL);

  const previewImage = document.createElement("img");
  previewImage.alt = "Ver modelo en AR";
  previewImage.style.width = "300px";
  previewImage.style.cursor = "pointer";

  loadImageWithPlaceholder(previewImage, cargando1URL, fallbackImageURL);
  link.appendChild(previewImage);

  container.appendChild(link);

} else if (isIOS()) {
  alert("Por favor, utiliza Safari para visualizar este modelo en realidad aumentada.");
} else if (isAndroid()) {
  fetch(androidModelURL)
    .then(response => response.blob())
    .then(blob => {
      const objectURL = URL.createObjectURL(blob);
      const viewer = document.createElement("model-viewer");
      viewer.setAttribute("src", objectURL);
      viewer.setAttribute("poster", cargando1URL);
      viewer.setAttribute("ar", "");
      viewer.setAttribute("auto-rotate", "");
      viewer.setAttribute("camera-controls", "");
      viewer.setAttribute("reveal", "auto");
      viewer.setAttribute("loading", "eager");
      viewer.setAttribute("environment-image", "./images/object_texture.png");

      viewer.style.width = "100%";
      viewer.style.height = "500px";

      container.appendChild(viewer);
    })
    .catch(error => {
      console.error("Error al cargar el modelo:", error);
      const fallbackImage = document.createElement("img");
      fallbackImage.src = cargando1URL;
      fallbackImage.alt = "Vista previa del producto";
      fallbackImage.style.width = "300px";
      fallbackImage.style.display = "block";
      fallbackImage.style.margin = "0 auto";
      container.appendChild(fallbackImage);
    });
} else {
  const fallbackImage = document.createElement("img");
  fallbackImage.src = fallbackImageURL;
  fallbackImage.alt = "Vista previa del producto";
  fallbackImage.style.width = "300px";
  fallbackImage.style.display = "block";
  fallbackImage.style.margin = "0 auto";
  container.appendChild(fallbackImage);
}
