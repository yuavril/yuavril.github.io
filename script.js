const query = `SELECT name, focus, interests
FROM students
WHERE field IN ('statistics', 'economics') AND curiosity = TRUE;`;

const result = `
-- query executed in 16 ms

> name: Avril

> focus:
  - statistics
  - economics

> interests:
  - decision-making
  - incentives
  - systems
`;

const codeEl = document.getElementById("code");
const cursorEl = document.getElementById("cursor");
const outputEl = document.getElementById("output");
const terminalBoxEl = document.getElementById("terminalbox");

let i = 0;
let buffer = "";


function typeQuery() {
  if (i < query.length) {
    buffer += query[i];
    i++;

    codeEl.innerHTML = highlightSQL(buffer) + `<span id="cursor"></span>`;

    setTimeout(typeQuery, 35);
  } 
  else {
    document.getElementById("cursor").style.display = "none";
    showResult();
  }
}

function showResult() {
  outputEl.textContent = result;
  terminalBoxEl.classList.remove("hidden");

  requestAnimationFrame(() => {
    terminalBoxEl.classList.add("show");
  });
}

function highlightSQL(text) {
  return text
    .replace(/\b(SELECT|FROM|WHERE)\b/g, `<span class="sql-keyword">$1</span>`)
    .replace(/\b(IN|AND)\b/g, `<span class="sql-operator">$1</span>`)
    .replace(/'([^']*)'/g, `<span class="sql-string">'$1'</span>`);
}

typeQuery();

