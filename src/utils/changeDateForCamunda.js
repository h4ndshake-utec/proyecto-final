export function cambiarFechaInicio(date) {

  return `${date.toISOString().split("T")[0]}T00:00:00.000+0000`;
}

export function cambiarFechaFin(date) {

  return `${date.toISOString().split("T")[0]}T59:59:59.000+0000`;
}
