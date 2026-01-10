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

function typeQuery() {
  if (i < query.length) {
    cursorEl.insertAdjacentText("beforebegin", query[i]);
    i++;
    setTimeout(typeQuery, 35);
  } else {
    setTimeout(() => {
      cursorEl.style.display = "none";
      highlightSQL();
      showResult();
    }, 400);
  }
}

function showResult() {
  outputEl.textContent = result;
  terminalBoxEl.classList.remove("hidden");

  requestAnimationFrame(() => {
    terminalBoxEl.classList.add("show");
  });
}

function highlightSQL() {
  let html = codeEl.textContent;

  html = html.replace(
    /\b(SELECT|FROM|WHERE)\b/g,
    `<span class="sql-keyword">$1</span>`
  );

  html = html.replace(
    /\b(IN|AND)\b/g,
    `<span class="sql-operator">$1</span>`
  );

  html = html.replace(
    /'([^']*)'/g,
    `<span class="sql-string">'$1'</span>`
  );

  codeEl.innerHTML = html;
  codeEl.appendChild(cursorEl);
}

typeQuery();

