// Función para cargar una imagen con placeholder
export function loadImageWithPlaceholder(imageElement, placeholderURL, actualURL) {
    imageElement.src = placeholderURL;
  
    const actualImage = new Image();
    actualImage.onload = function () {
      imageElement.src = actualURL;
    };
    actualImage.onerror = function () {
      console.error("Error al cargar la imagen:", actualURL);
    };
    actualImage.src = actualURL;
  }
  