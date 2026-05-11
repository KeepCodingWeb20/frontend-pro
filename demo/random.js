// random.js — más globals.
// Si otro archivo define HOUSES, lo pisa silenciosamente.

var HOUSES = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'];

function pickRandomHouse() {
  var index = Math.floor(Math.random() * HOUSES.length);
  return HOUSES[index];
}
