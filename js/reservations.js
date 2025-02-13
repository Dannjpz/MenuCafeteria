// js/reservations.js
document.addEventListener("DOMContentLoaded", function() {
  // Esperar a que el formulario se cargue en el DOM
  const checkFormExists = setInterval(() => {
    const form = document.querySelector("#reservationForm");
    if (form) {
      clearInterval(checkFormExists);
      initializeFormHandler(form);
    }
  }, 100);
});

function initializeFormHandler(form) {
  console.log("Formulario de reservas inicializado");

  form.addEventListener("submit", async function(e) {
    e.preventDefault();
    console.log("Formulario enviado");

    const submitButton = form.querySelector('button[type="submit"]');
    const btnText = submitButton.querySelector(".btn-text");
    const loadingSpinner = submitButton.querySelector(".loading-spinner");

    // Mostrar estado de carga
    submitButton.disabled = true;
    if (loadingSpinner) loadingSpinner.style.display = "block";
    if (btnText) btnText.style.opacity = "0";

    try {
      const formData = {
        name: form.querySelector("#name").value,
        email: form.querySelector("#email").value,
        reservation_date: form.querySelector("#date").value,
        reservation_time: form.querySelector("#time").value,
        people: form.querySelector("#people").value,
        special_requests: form.querySelector("#special_requests").value
      };

      console.log("Datos a enviar:", formData);

      const response = await fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);

      if (data.success) {
        alert("¡Reserva creada exitosamente!");
        form.reset();
      } else {
        throw new Error(data.message || "Error al procesar la reserva");
      }
    } catch (error) {
      console.error("Error al procesar la reserva:", error);
      alert(
        "Hubo un error al procesar tu reserva. Por favor, intenta nuevamente."
      );
    } finally {
      // Restaurar botón
      submitButton.disabled = false;
      if (loadingSpinner) loadingSpinner.style.display = "none";
      if (btnText) btnText.style.opacity = "1";
    }
  });
}