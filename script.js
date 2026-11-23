(function () {
  var NOME = CONFIG.nome || "";
  var SECRET = CONFIG.parolaSegreta;
  var KEYS = SCHEMA.lettereCerchiate;
  var WORDS = SCHEMA.parole.map(function (p) {
    var clue = CONFIG.definizioni[p.word];
    if (!clue) { console.warn("Manca la definizione per: " + p.word); clue = "(definizione mancante)"; }
    return { word: p.word, row: p.row, col: p.col, dir: p.dir, clue: clue };
  });

  var ROWS = SCHEMA.righe, COLS = SCHEMA.colonne;
  var grid = [], inputs = [];
  var activeWord = null, activeCell = null, solvedCount = 0, finished = false;

  function cellsOf(w) {
    var out = [];
    for (var i = 0; i < w.word.length; i++)
      out.push([w.row + (w.dir === "V" ? i : 0), w.col + (w.dir === "H" ? i : 0)]);
    return out;
  }

  /* ---- costruzione dati ---- */
  for (var r = 0; r < ROWS; r++) { grid.push([]); inputs.push([]); for (var c = 0; c < COLS; c++) { grid[r].push(null); inputs[r].push(null); } }
  WORDS.forEach(function (w, wi) {
    w.idx = wi;
    cellsOf(w).forEach(function (p, i) {
      var cur = grid[p[0]][p[1]];
      if (cur && cur.ch !== w.word[i]) throw new Error("Incrocio errato: " + w.word + " @ " + p);
      if (!cur) cur = grid[p[0]][p[1]] = { ch: w.word[i], words: {} };
      cur.words[w.dir] = w;
    });
  });
  // numerazione per ordine di lettura
  var n = 0;
  for (var rr = 0; rr < ROWS; rr++) for (var cc = 0; cc < COLS; cc++) {
    var starts = WORDS.filter(function (w) { return w.row === rr && w.col === cc; });
    if (starts.length) { n++; starts.forEach(function (w) { w.num = n; }); grid[rr][cc].num = n; }
  }
  // controllo lettere cerchiate
  var secretCheck = KEYS.map(function (k) { return grid[k[0]][k[1]].ch; }).join("");
  if (secretCheck !== SECRET) console.warn("Le lettere cerchiate formano", secretCheck, "invece di", SECRET);

  /* ---- DOM ---- */
  var board = document.getElementById("board");
  board.style.setProperty("--cols", COLS);
  var keyIndex = {};
  KEYS.forEach(function (k, i) { keyIndex[k[0] + "," + k[1]] = i + 1; });

  for (var r2 = 0; r2 < ROWS; r2++) for (var c2 = 0; c2 < COLS; c2++) {
    var d = document.createElement("div");
    var g = grid[r2][c2];
    if (!g) { d.className = "cell empty"; board.appendChild(d); continue; }
    d.className = "cell" + (keyIndex[r2 + "," + c2] ? " key" : "");
    d.dataset.r = r2; d.dataset.c = c2;
    if (g.num) { d.classList.add("has-num"); var s = document.createElement("span"); s.className = "num"; s.textContent = g.num; d.appendChild(s); }
    var inp = document.createElement("input");
    inp.type = "text"; inp.maxLength = 2; inp.autocomplete = "off"; inp.autocapitalize = "characters";
    inp.spellcheck = false; inp.setAttribute("aria-label", "Riga " + (r2 + 1) + ", colonna " + (c2 + 1));
    inp.dataset.r = r2; inp.dataset.c = c2;
    d.appendChild(inp);
    if (keyIndex[r2 + "," + c2]) { var ix = document.createElement("span"); ix.className = "idx"; ix.textContent = keyIndex[r2 + "," + c2]; d.appendChild(ix); }
    board.appendChild(d);
    inputs[r2][c2] = inp;
    g.el = d; g.inp = inp;
  }

  /* ---- definizioni ---- */
  var clueEls = {};
  function addClue(w) {
    var li = document.createElement("li");
    li.innerHTML = '<span class="n">' + w.num + '</span><span class="t"></span><span class="l">' + w.word.length + ' lettere</span>';
    li.querySelector(".t").textContent = w.clue;
    li.addEventListener("click", function () { selectWord(w, cellsOf(w)[0]); focusCell(activeCell); });
    clueEls[w.idx] = li;
    document.getElementById(w.dir === "H" ? "acrossList" : "downList").appendChild(li);
  }
  WORDS.filter(function (w) { return w.dir === "H"; }).sort(function (a, b) { return a.num - b.num; }).forEach(addClue);
  WORDS.filter(function (w) { return w.dir === "V"; }).sort(function (a, b) { return a.num - b.num; }).forEach(addClue);

  /* ---- slot parola segreta ---- */
  var slotsEl = document.getElementById("slots");
  var slotEls = KEYS.map(function (k, i) {
    var s = document.createElement("div"); s.className = "slot"; s.innerHTML = "<small>" + (i + 1) + "</small><span>?</span>";
    slotsEl.appendChild(s); return s;
  });

  /* ---- selezione ---- */
  function selectWord(w, cell) { activeWord = w; activeCell = cell; render(); }
  function focusCell(p) { if (p && inputs[p[0]][p[1]]) inputs[p[0]][p[1]].focus({ preventScroll: true }); }

  function render() {
    var inWord = {};
    if (activeWord) cellsOf(activeWord).forEach(function (p) { inWord[p[0] + "," + p[1]] = 1; });
    for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) {
      var g = grid[r][c]; if (!g) continue;
      g.el.classList.toggle("in-word", !!inWord[r + "," + c]);
      g.el.classList.toggle("active", !!activeCell && activeCell[0] === r && activeCell[1] === c);
    }
    Object.keys(clueEls).forEach(function (k) { clueEls[k].classList.toggle("current", !!activeWord && activeWord.idx === +k); });
    var t = document.getElementById("ccTag"), x = document.getElementById("ccTxt"), l = document.getElementById("ccLen");
    if (activeWord) {
      t.textContent = activeWord.num + (activeWord.dir === "H" ? " Orizz." : " Vert.");
      x.textContent = activeWord.clue; l.textContent = activeWord.word.length + " lettere";
    }
  }

  board.addEventListener("focusin", function (e) {
    var t = e.target; if (t.tagName !== "INPUT") return;
    var r = +t.dataset.r, c = +t.dataset.c, g = grid[r][c];
    var keep = activeWord && g.words[activeWord.dir] === activeWord;
    var w = keep ? activeWord : (g.words.H || g.words.V);
    activeWord = w; activeCell = [r, c]; render();
    try { t.select(); } catch (_) {}
  });
  board.addEventListener("pointerdown", function (e) {
    var t = e.target; if (t.tagName !== "INPUT") return;
    var r = +t.dataset.r, c = +t.dataset.c, g = grid[r][c];
    // secondo tocco sulla casella attiva con incrocio: cambia direzione
    if (activeCell && activeCell[0] === r && activeCell[1] === c && g.words.H && g.words.V) {
      activeWord = activeWord === g.words.H ? g.words.V : g.words.H; render();
    }
  });

  function step(dir, delta) {
    if (!activeCell) return;
    var r = activeCell[0] + (dir === "V" ? delta : 0), c = activeCell[1] + (dir === "H" ? delta : 0);
    if (r < 0 || c < 0 || r >= ROWS || c >= COLS || !grid[r][c]) return false;
    var g = grid[r][c];
    if (g.words[dir]) activeWord = g.words[dir];
    activeCell = [r, c]; focusCell(activeCell); render(); return true;
  }
  function stepInWord(delta) {
    var cs = cellsOf(activeWord);
    var i = cs.findIndex(function (p) { return p[0] === activeCell[0] && p[1] === activeCell[1]; }) + delta;
    if (i < 0 || i >= cs.length) return;
    activeCell = cs[i]; focusCell(activeCell); render();
  }

  board.addEventListener("input", function (e) {
    var t = e.target; if (t.tagName !== "INPUT") return;
    var v = (t.value || "").toUpperCase().replace(/[^A-ZÀ-Ý]/g, "");
    t.value = v.slice(-1);
    clearMarks();
    update();
    if (t.value) stepInWord(1);
  });
  board.addEventListener("keydown", function (e) {
    var t = e.target; if (t.tagName !== "INPUT") return;
    var k = e.key;
    if (k === "Backspace" && !t.value) { e.preventDefault(); stepInWord(-1); var p = activeCell; if (inputs[p[0]][p[1]]) { inputs[p[0]][p[1]].value = ""; update(); } }
    else if (k === "ArrowRight") { e.preventDefault(); step("H", 1); }
    else if (k === "ArrowLeft")  { e.preventDefault(); step("H", -1); }
    else if (k === "ArrowDown")  { e.preventDefault(); step("V", 1); }
    else if (k === "ArrowUp")    { e.preventDefault(); step("V", -1); }
    else if (k === " ") { e.preventDefault(); var g = grid[activeCell[0]][activeCell[1]]; if (g.words.H && g.words.V) { activeWord = activeWord === g.words.H ? g.words.V : g.words.H; render(); } }
  });

  function clearMarks() {
    for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) if (grid[r][c]) grid[r][c].el.classList.remove("wrong");
  }

  /* ---- verifica / avanzamento ---- */
  function wordOk(w) {
    return cellsOf(w).every(function (p, i) { return (inputs[p[0]][p[1]].value || "").toUpperCase() === w.word[i]; });
  }
  function update() {
    for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) if (grid[r][c]) grid[r][c].el.classList.remove("correct");
    var solved = 0;
    WORDS.forEach(function (w) {
      var ok = wordOk(w);
      clueEls[w.idx].classList.toggle("solved", ok);
      if (ok) { solved++; cellsOf(w).forEach(function (p) { grid[p[0]][p[1]].el.classList.add("correct"); }); }
    });
    solvedCount = solved;
    document.getElementById("progText").textContent = solved + " / " + WORDS.length;
    document.getElementById("progBar").style.width = (solved / WORDS.length * 100) + "%";
    if (solved === WORDS.length && !finished) { finished = true; setTimeout(win, 350); }
  }

  var noHint = document.getElementById("noHint");
  document.getElementById("noHintText").textContent = CONFIG.messaggioNoLettera || "Non puoi rivelare nessuna lettera.";
  document.getElementById("hintBtn").addEventListener("click", function () { noHint.classList.add("show"); });
  document.getElementById("noHintClose").addEventListener("click", function () { noHint.classList.remove("show"); });
  noHint.addEventListener("click", function (e) { if (e.target === noHint) noHint.classList.remove("show"); });
  document.getElementById("resetBtn").addEventListener("click", function () {
    for (var r = 0; r < ROWS; r++) for (var c = 0; c < COLS; c++) if (grid[r][c]) grid[r][c].inp.value = "";
    finished = false;
    slotEls.forEach(function (s) { s.querySelector("span").textContent = "?"; s.classList.remove("filled", "done"); });
    rewardEl.classList.remove("show"); clearMarks(); update();
  });

  /* ---- premio ---- */
  var rewardEl = document.getElementById("reward");
  function win() {
    // la parola segreta viene svelata solo ora, lettera per lettera
    slotEls.forEach(function (s, i) {
      setTimeout(function () {
        s.querySelector("span").textContent = SECRET[i];
        s.classList.add("filled", "done");
      }, i * 260);
    });
    setTimeout(function () { rewardEl.classList.add("show"); burst(); setTimeout(burst, 700); }, SECRET.length * 260 + 500);
  }
  document.getElementById("closeReward").addEventListener("click", function () { rewardEl.classList.remove("show"); });

  /* ---- "Scopri dove" ---- */
  var DOVE = CONFIG.scopriDove || {};
  var leadEl = document.getElementById("rewardLead");
  leadEl.textContent = DOVE.testo || "";
  leadEl.hidden = !DOVE.testo;
  var whereBtn = document.getElementById("whereBtn");
  if (DOVE.link) {
    whereBtn.addEventListener("click", function () { window.open(DOVE.link, "_blank", "noopener"); });
  } else {
    whereBtn.hidden = true;
  }
  var rewardTextEl = document.getElementById("rewardText");
  if (!CONFIG.messaggioPremio) rewardTextEl.hidden = true;

  /* ---- benvenuto ---- */
  if (NOME) document.getElementById("who").textContent = ", " + NOME + "!"; else document.getElementById("who").textContent = "!";
  document.getElementById("startBtn").addEventListener("click", function () {
    document.getElementById("welcome").classList.add("hidden");
    burst();
    var f = grid[WORDS[0].row][WORDS[0].col]; // prima casella
    activeWord = WORDS[0]; activeCell = cellsOf(WORDS[0])[0]; render();
  });

  /* ---- coriandoli (canvas, senza librerie esterne) ---- */
  var cv = document.getElementById("confetti"), ctx = cv.getContext("2d"), parts = [], raf = null;
  function size() { cv.width = window.innerWidth; cv.height = window.innerHeight; }
  size(); window.addEventListener("resize", size);
  var COLORS = ["#c9a24b", "#e6c577", "#14213d", "#ffffff", "#e63946", "#457b9d"];
  function burst() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    for (var i = 0; i < 140; i++) {
      var side = i % 2 ? 1 : 0;
      parts.push({
        x: side ? cv.width * 0.05 : cv.width * 0.95, y: cv.height * 0.75,
        vx: (side ? 1 : -1) * (4 + Math.random() * 9), vy: -(9 + Math.random() * 12),
        w: 6 + Math.random() * 6, h: 8 + Math.random() * 8, rot: Math.random() * 6.28, vr: (Math.random() - .5) * .35,
        col: COLORS[(Math.random() * COLORS.length) | 0], life: 0
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  }
  function tick() {
    ctx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter(function (p) { return p.y < cv.height + 30 && p.life < 260; });
    parts.forEach(function (p) {
      p.vy += .32; p.vx *= .99; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life++;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = p.col;
      ctx.globalAlpha = Math.max(0, 1 - p.life / 260);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h); ctx.restore();
    });
    raf = parts.length ? requestAnimationFrame(tick) : null;
    if (!parts.length) ctx.clearRect(0, 0, cv.width, cv.height);
  }

  update();
})();
