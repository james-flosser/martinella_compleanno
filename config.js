/* ==========================================================
   CONFIG.JS  -  Qui puoi cambiare comodamente i contenuti
   senza toccare il resto del sito.
   Dopo ogni modifica: salva, poi git add / commit / push.
   ========================================================== */

var CONFIG = {

  // Nome della festeggiata: compare nel titolo ("Buon Compleanno, Maria!").
  // Lascialo vuoto "" per non mostrarlo.
  nome: "",

  // Testo sotto il titolo nella schermata di benvenuto
  testoBenvenuto:
    "Abbiamo nascosto il tuo regalo in un cruciverba fatto di luoghi e ricordi. " +
    "Risolvilo fino in fondo e scoprirai la sorpresa.",

  // Parola segreta formata dalle lettere cerchiate (nell'ordine dei numeri dorati).
  // Deve corrispondere alle caselle indicate in schema.js.
  parolaSegreta: "TERME",

  // Messaggio mostrato quando il cruciverba e' completato
  messaggioPremio:
    "Prepara costume e accappatoio: ti aspetta una giornata di totale relax alle Terme, tutta per te.",

  // DEFINIZIONI: a sinistra la parola (in MAIUSCOLO, non cambiarla),
  // a destra la definizione che appare nel cruciverba. Modifica solo il testo a destra.
  definizioni: {
    "FUERTEVENTURA": "Isola delle Canarie famosa per le dune di Corralejo e il surf",
    "PARIGI":        "La Ville Lumière, con la Torre Eiffel affacciata sulla Senna",
    "SHARM":         "___ el-Sheikh: la perla del Mar Rosso",
    "MADRID":        "Capitale della Spagna",
    "DOLO":          "Borgo della Riviera del Brenta, in provincia di Venezia",
    "ALICANTE":      "Città della Costa Blanca dominata dal castello di Santa Bárbara",
    "VALENCIA":      "Patria della paella e della Città delle Arti e delle Scienze",
    "SHANGHAI":      "Metropoli cinese dallo skyline sul Bund",
    "ZARAGOZA":      "Capoluogo dell'Aragona, bagnato dal fiume Ebro",
    "SCHIEPPO":      "Il nostro posto del cuore, solo per noi",
    "VERONA":        "La città dell'Arena e di Giulietta"
  }
};
