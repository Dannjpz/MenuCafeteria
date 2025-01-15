// Función para detectar si el dispositivo es iOS
function isIOS() {
  return (
    /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) &&
    "ontouchend" in document
  );
}

// Función para detectar si el dispositivo usa Safari
function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// Función para detectar si el dispositivo es Android
function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

// Función para cargar una imagen con placeholder
function loadImageWithPlaceholder(imageElement, placeholderURL, actualURL) {
  // Mostrar el placeholder inicialmente
  imageElement.src = placeholderURL;

  // Cambiar a la imagen definitiva una vez cargada
  const actualImage = new Image();
  actualImage.onload = function () {
    imageElement.src = actualURL;
  };
  actualImage.onerror = function () {
    console.error("Error al cargar la imagen:", actualURL);
  };
  actualImage.src = actualURL;
}

// URLs de los archivos
const iosModelURL = "./images/pizzaPeperoni.usdz"; // Archivo para iOS (USDZ)
const androidModelURL = "./models/object_draco.glb"; // Archivo comprimido para Android (GLB)
const fallbackImageURL = "./images/pizza2.jpg"; // Imagen PNG para dispositivos no compatibles
const cargando1URL = "./images/cargando1.jpg"; // Placeholder durante la carga

// Contenedor donde se agregará el contenido
const container = document.getElementById("3d-container");

if (isIOS() && isSafari()) {
  console.log("Dispositivo iOS con Safari detectado");
  const link = document.createElement("a");
  link.setAttribute("rel", "ar");
  link.setAttribute("href", iosModelURL);

  const previewImage = document.createElement("img");
  previewImage.alt = "Ver modelo en AR";
  previewImage.style.width = "300px";
  previewImage.style.cursor = "pointer";
  
  // Cargar la imagen con placeholder
  loadImageWithPlaceholder(previewImage, cargando1URL, fallbackImageURL);
  link.appendChild(previewImage);

  container.appendChild(link);

} else if (isIOS()) {
  console.log("Dispositivo iOS detectado, pero no es Safari");
  alert(
    "Por favor, utiliza Safari para visualizar este modelo en realidad aumentada."
  );

} else if (isAndroid()) {
  console.log("Dispositivo Android detectado. Cargando modelo en segundo plano...");

  // Carga en segundo plano usando fetch
  fetch(androidModelURL)
    .then((response) => response.blob())
    .then((blob) => {
      const objectURL = URL.createObjectURL(blob);

      // Crear <model-viewer> para el modelo
      const viewer = document.createElement("model-viewer");
      viewer.setAttribute("src", objectURL);
      viewer.setAttribute("poster", cargando1URL); // Placeholder como poster
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
    .catch((error) => {
      console.error("Error al cargar el modelo:", error);

      // Mostrar el placeholder como fallback
      const fallbackImage = document.createElement("img");
      fallbackImage.src = cargando1URL;
      fallbackImage.alt = "Vista previa del producto";
      fallbackImage.style.width = "300px";
      fallbackImage.style.display = "block";
      fallbackImage.style.margin = "0 auto";
      container.appendChild(fallbackImage);
    });


} else {
  console.log("Dispositivo no compatible detectado");
  const fallbackImage = document.createElement("img");
  fallbackImage.src = fallbackImageURL;
  fallbackImage.alt = "Vista previa del producto";
  fallbackImage.style.width = "300px";
  fallbackImage.style.display = "block";
  fallbackImage.style.margin = "0 auto";

  container.appendChild(fallbackImage);
}
