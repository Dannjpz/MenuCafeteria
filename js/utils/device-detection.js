// Función para detectar si el dispositivo es iOS
export function isIOS() {
  return (
    /iPad|iPhone|iPod|Macintosh/.test(navigator.userAgent) &&
    "ontouchend" in document
  );
}

// Función para detectar si el dispositivo usa Safari
export function isSafari() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}

// Función para detectar si el dispositivo es Android
export function isAndroid() {
  return /Android/.test(navigator.userAgent);
}
