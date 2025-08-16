const select = document.getElementById("municipio");
const datosDiv = document.getElementById("datos");

async function cargarDatos(codigo) {
  datosDiv.innerHTML = "<p>Mostrando datos...</p>";
  try {
    const res = await fetch(`https://censopoblacion.azurewebsites.net/API/indicadores/2/1${codigo}`);
    const data = await res.json();

    datosDiv.innerHTML = "";
    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
        <h3>${item.indicador}</h3>
        <p><strong>Valor:</strong> ${item.valor}</p>
        <p><strong>Unidad:</strong> ${item.unidad || "N/A"}</p>
      `;
      datosDiv.appendChild(card);
    });
  } catch (error) {
    datosDiv.innerHTML = "<p>Error al mostrar los datos.</p>";
    console.error(error);
  }
}

select.addEventListener("change", e => {
  cargarDatos(e.target.value);
});


cargarDatos(999);