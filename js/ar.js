// Función para detectar si el dispositivo es iOS
function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
}

// Función para detectar si el dispositivo es Android
function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

// Función para cargar una imagen con un placeholder
function loadImageWithPlaceholder(imageElement, placeholderURL, actualURL) {
  imageElement.src = placeholderURL; // Mostrar el placeholder inicialmente
  const actualImage = new Image();
  actualImage.onload = () => {
    imageElement.src = actualURL; // Cambiar a la imagen definitiva una vez cargada
  };
  actualImage.onerror = () => {
    console.error("Error al cargar la imagen:", actualURL);
  };
  actualImage.src = actualURL;
}

// URLs de los archivos 3D y fallback
const iosModelURL = './images/pizzaPeperoni.usdz'; // Archivo USDZ para iOS
const androidModelURL = './models/object_draco.glb'; // Archivo GLB para Android
const fallbackImageURL = './images/pizza.jpg'; // Imagen para dispositivos no compatibles
const placeholderURL = './images/cargando1.jpg'; // Placeholder durante la carga

// Contenedor donde se agregará el contenido
const container = document.getElementById('3d-container');

// Verifica el dispositivo y añade el contenido al contenedor
if (isIOS()) {
  const link = document.createElement('a');
  link.setAttribute('rel', 'ar'); // Habilitar AR Quick Look
  link.setAttribute('href', iosModelURL);

  const previewImage = document.createElement('img');
  previewImage.alt = 'Ver modelo en AR';
  previewImage.style.width = '300px';
  previewImage.style.cursor = 'pointer';

  loadImageWithPlaceholder(previewImage, placeholderURL, fallbackImageURL);
  link.appendChild(previewImage);

  const message = document.createElement('p');
  message.textContent = 'Haz clic en la imagen para ver el modelo en realidad aumentada';
  message.style.textAlign = 'center';

  container.appendChild(link);
  container.appendChild(message);

} else if (isAndroid()) {
  console.log("Dispositivo Android detectado. Cargando modelo en segundo plano...");

  // Carga en segundo plano usando fetch
  fetch(androidModelURL)
    .then((response) => response.blob())
    .then((blob) => {
      const objectURL = URL.createObjectURL(blob);

      // Crear <model-viewer> para el modelo
      const viewer = document.createElement('model-viewer');
      viewer.setAttribute('src', objectURL); // Cargar el modelo desde el objeto Blob
      viewer.setAttribute('poster', placeholderURL); // Placeholder como poster
      viewer.setAttribute('ar', '');
      viewer.setAttribute('auto-rotate', '');
      viewer.setAttribute('camera-controls', '');
      viewer.setAttribute('reveal', 'auto'); // Revelar automáticamente
      viewer.setAttribute('loading', 'eager'); // Carga rápida
      viewer.setAttribute('environment-image', './models/textures/object_texture.png');

      viewer.style.width = '100%';
      viewer.style.height = '500px';

      container.appendChild(viewer);
    })
    .catch((error) => {
      console.error("Error al cargar el modelo:", error);

      // Mostrar el placeholder como fallback
      const fallbackImage = document.createElement('img');
      fallbackImage.src = placeholderURL;
      fallbackImage.alt = 'Vista previa del producto';
      fallbackImage.style.width = '300px';
      fallbackImage.style.display = 'block';
      fallbackImage.style.margin = '0 auto';
      container.appendChild(fallbackImage);
    });

} else {
  const fallbackImage = document.createElement('img');
  fallbackImage.alt = 'Vista previa del producto';
  fallbackImage.style.width = '300px';
  fallbackImage.style.display = 'block';
  fallbackImage.style.margin = '0 auto';

  loadImageWithPlaceholder(fallbackImage, placeholderURL, fallbackImageURL);

  const message = document.createElement('p');
  message.textContent = 'La visualización interactiva no está disponible en este dispositivo.';
  message.style.textAlign = 'center';

  container.appendChild(fallbackImage);
  container.appendChild(message);
}
