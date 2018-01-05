module.exports = function spanishText (text) {
  if (text === 'running') return 'En Marcha'
  if (text === 'inactive') return 'Inactivo'
  else if (text === 'active') return 'Activo'
  else if (text === 'cancel') return 'Cancelado'
  else if (text === 'paused') return 'Pausado'
  else if (text === 'waiting') return 'En espera'
  else if (text === 'finished') return 'Finalizado'
  else return text
}
