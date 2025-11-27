const listadoPaises = document.getElementById("countries-list");
const URL_API = "https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital";

const modal = document.createElement("div");
modal.id = "ventanaFlotante";
modal.style.display = "none";

modal.innerHTML = `
  <div id="contenidoModal">
    <button id="botonCerrar">Cerrar</button>
    <img id="banderaModal">
    <h2 id="nombreModal"></h2>
    <p id="capitalModal"></p>
    <p id="poblacionModal"></p>
    <p id="conduccionModal"></p>
  </div>
`;

document.body.appendChild(modal);

const banderaModal = document.getElementById("banderaModal");
const nombreModal = document.getElementById("nombreModal");
const capitalModal = document.getElementById("capitalModal");
const poblacionModal = document.getElementById("poblacionModal");
const conduccionModal = document.getElementById("conduccionModal");
const botonCerrar = document.getElementById("botonCerrar");

botonCerrar.addEventListener("click", function () {
  modal.style.display = "none";
});

function mostrarModal(pais) {

  banderaModal.src = pais.flags.png;
  nombreModal.textContent = pais.name.common;

  if (pais.capital) {
    capitalModal.textContent = "Capital: " + pais.capital[0];
  } else {
    capitalModal.textContent = "Capital: No disponible";
  }

  poblacionModal.textContent = "Población: " + pais.population.toLocaleString("es-ES");

    if (pais.car && pais.car.side) {
        let lado = "";

     if (pais.car.side === "right") {
        lado = "Derecha";
    } else if (pais.car.side === "left") {
        lado = "Izquierda";
    } else {
        lado = "Desconocido";
    }

    conduccionModal.textContent = "Se conduce por la: " + lado;
    } else {
    conduccionModal.textContent = "Se conduce por un lado desconocido";
    }

  modal.style.display = "flex";
}

async function cargarPaises() {
  const respuesta = await fetch(URL_API);
  const paises = await respuesta.json();

  paises.sort(function (a, b) {
    const nombreA = a.name.common.toUpperCase();
    const nombreB = b.name.common.toUpperCase();

    if (nombreA < nombreB) return -1;
    if (nombreA > nombreB) return 1;
    return 0;
  });

  paises.forEach(function (pais) {

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjetaPais";

    const bandera = document.createElement("img");
    bandera.src = pais.flags.png;
    bandera.className = "banderaPais";

    const nombre = document.createElement("p");
    nombre.textContent = pais.name.common;

    tarjeta.appendChild(bandera);
    tarjeta.appendChild(nombre);

    tarjeta.addEventListener("click", function () {
      mostrarModal(pais);
    });

    listadoPaises.appendChild(tarjeta);
  });
}

document.addEventListener("DOMContentLoaded", cargarPaises);