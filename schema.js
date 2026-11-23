/* ==========================================================
   SCHEMA.JS  -  La griglia del cruciverba
   ATTENZIONE: non modificare se non sai cosa stai facendo.
   Le posizioni sono verificate: ogni incrocio e' coerente.
   Per cambiare le definizioni usa config.js.
   row / col partono da 0.  dir: "H" = orizzontale, "V" = verticale.
   ========================================================== */

var SCHEMA = {
  righe: 11,
  colonne: 15,

  parole: [
    { word: "FUERTEVENTURA", row: 3,  col: 0,  dir: "H" },
    { word: "PARIGI",        row: 1,  col: 1,  dir: "H" },
    { word: "SHARM",         row: 0,  col: 8,  dir: "H" },
    { word: "MADRID",        row: 7,  col: 1,  dir: "H" },
    { word: "DOLO",          row: 7,  col: 11, dir: "H" },
    { word: "ALICANTE",      row: 10, col: 4,  dir: "H" },
    { word: "VALENCIA",      row: 0,  col: 2,  dir: "V" },
    { word: "SHANGHAI",      row: 0,  col: 8,  dir: "V" },
    { word: "ZARAGOZA",      row: 2,  col: 12, dir: "V" },
    { word: "SCHIEPPO",      row: 0,  col: 14, dir: "V" },
    { word: "VERONA",        row: 5,  col: 4,  dir: "V" }
  ],

  // Caselle cerchiate [riga, colonna], nell'ordine che forma la parola segreta (T E R M E)
  lettereCerchiate: [ [10, 10], [4, 14], [1, 3], [0, 12], [6, 4] ]
};
