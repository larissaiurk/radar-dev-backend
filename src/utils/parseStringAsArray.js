module.exports = function parseStringAsArray(arrayAsString) {
  return arrayAsString.split(',').map(teste => teste.trim());
};