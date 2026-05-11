// app.js — entry. Depende de greet() y pickRandomHouse() que existan ya en window.
// Si cambias el orden de los <script> en index.html, esto se rompe.

var app = document.querySelector('#app');
app.textContent = greet('mago') + ' — Hoy gana: ' + pickRandomHouse();
