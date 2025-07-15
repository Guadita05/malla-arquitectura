const correlatividades = {
  "Arquitectura II": ["Arquitectura I", "Sistemas Gráficos de Expresión"],
  "Morfología II": ["Sistemas Gráficos de Expresión"]
};

let aprobadas = JSON.parse(localStorage.getItem("materiasAprobadas")) || [];

aprobadas.forEach(materia => {
  document.getElementById(materia)?.classList.add("aprobada");
});

function actualizarDesbloqueo() {
  Object.keys(correlatividades).forEach(materia => {
    const requisitos = correlatividades[materia];
    const cumplidos = requisitos.every(req => aprobadas.includes(req));
    const div = document.getElementById(materia);
    if (cumplidos && div) {
      div.classList.remove("bloqueada");
    }
  });
}

function toggleMateria(nombre) {
  const index = aprobadas.indexOf(nombre);
  const div = document.getElementById(nombre);

  if (index === -1) {
    aprobadas.push(nombre);
    div.classList.add("aprobada");
  } else {
    aprobadas.splice(index, 1);
    div.classList.remove("aprobada");
    location.reload();
  }

  localStorage.setItem("materiasAprobadas", JSON.stringify(aprobadas));
  actualizarDesbloqueo();
}

actualizarDesbloqueo();
