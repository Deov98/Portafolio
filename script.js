const btn = document.getElementById('themeBtn');
const pf = document.getElementById('pf');
let dark = true;

btn.addEventListener('click', () => {
  dark = !dark;
  pf.className = 'pf ' + (dark ? 'dark' : 'light');
  btn.textContent = dark ? '🌙' : '☀️';
});

const cvBtn = document.getElementById("cvBtn");

cvBtn.addEventListener("click", () => {
  window.open("archivos/CVDanielOlavarria.pdf", "_blank");
});