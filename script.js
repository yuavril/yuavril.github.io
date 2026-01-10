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
const outputEl = document.getElementById("output");
const cursorEl = document.getElementById("cursor");

let i = 0;

function typeQuery() {
  if (i < query.length) {
    cursorEl.insertAdjacentText("beforebegin", query[i]);
    i++;
    setTimeout(typeQuery, 35);
  } else {
    setTimeout(() => {
      cursorEl.style.display = "none";
      showResult();
      highlightSQL();
    }, 400);
  }
}

function showResult() {
  outputEl.textContent = result;
  outputEl.classList.remove("hidden");
  requestAnimationFrame(() => {
    outputEl.classList.add("show");
  });
}

function highlightSQL() {
  let html = codeEl.textContent;
  /* For the keywords SELECT, FROM, WHERE */
  html = html.replace(
    /\b(SELECT|FROM|WHERE)\b/g,
    `<span class="sql-keyword">$1</span>`
  );

  /* For the keywords IN, AND */
  html = html.replace(
    /\b(IN|AND)\b/g,
    `<span class="sql-operator">$1</span>`
  );

  html = html.replace(
    /'([^']*)'/g,
    `<span class="sql-string">'$1'</span>`
  )
codeEl.innerHTML = html + `<span id="cursor">▍</span>`;
}
typeQuery();
