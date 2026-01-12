const query = `SELECT name, focus, interests
FROM students
WHERE field IN ('statistics', 'economics') AND curiosity = TRUE;`;

const result = `-- query executed in 16 ms

Hello! My name is Avril, and I am a student at the University of Michigan pursuing a double major in Statistics and Economics. I'm the one people turn to when they need ad-hoc spreadsheets turned into reliable systems.
In my free time, I like to canoe, raise tradescantia plants, and read science fiction novels. I've also started learning how to play the kalimba!

> Resume: <a href="https://github.com/yuavril/yuavril.github.io/blob/main/Avril%20Yu%20Resume.pdf" target="_blank">view_pdf</a>
> Linkedin: <a href="https://www.linkedin.com/in/avril-yu-b0a62a2b0/" target="_blank">open_profile</a>
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
  outputEl.innerHTML = result;
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

