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
  // (opzionale: sotto la parola segreta. Lascia "" per non mostrare nulla)
  messaggioPremio: "",

  // Messaggio del popup che compare premendo "Rivela una lettera"
  messaggioNoLettera: "Non puoi rivelare nessuna lettera, questo non è un giochetto di LinkedIn!",

  // "SCOPRI DOVE": nel popup finale, "testo" compare PRIMA della parola segreta
  // (es. "...andiamo alle" + TERME). Il pulsante "Scopri dove" apre "link" in una nuova scheda.
  // Se "link" e' vuoto, il pulsante non viene mostrato.
  scopriDove: {
    testo: "Prepara il costume perchè questo sabato andiamo alle",
    link: "https://www.aquardens.it/it"
  },

  // DEFINIZIONI: a sinistra la parola (in MAIUSCOLO, non cambiarla),
  // a destra la definizione che appare nel cruciverba. Modifica solo il testo a destra.
  definizioni: {
    "FUERTEVENTURA": "Posto in cui mi è venuta molta spissa e tu sei diventata super marroncina.",
    "PARIGI":        "Pangoccioli giganti, Disneyland, e \"ooooooh, les champs elysees\"!",
    "SHARM":         "Dove si trova il \"lago magico\", che tanto magico non è stato per il tuo piede!",
    "MADRID":        "Il tuo luogo preferito della spagna (per il cappello giallo e il Parque Warner!)",
    "DOLO":          "Magica città della Pianura Padana in cui ti trasferiresti senza pensarci 2 volte.",
    "ALICANTE":      "Dove quella notte tutto è iniziato.",
    "VALENCIA":      "La città con 360 giorni di sole l'anno, in cui noi abbiamo trovato la pioggia e ci siamo anche bruciati!",
    "SHANGHAI":      "Il più bello dei viaggi fatti insieme finora; Posto pieno di Zhongguo ren (molto bendan) in cui abbiamo scoperto gli spaghetti fantastici!",
    "ZARAGOZA":      "All'inizio di quest'anno hai vissuto più qui che a casa tua e la tua frase preferita era \"Limpieza Potente\". Patria del KB!",
    "SCHIEPPO":      "Da quella finestra della casetta di ___ ogni mattina possiamo ammirare il Puscio in tutto il suo splendore.",
    "VERONA":        "Dopo numerose uscite, è stato il luogo in cui ci siamo conosciuti veramente ed innamorati. (In un posto di tale provincia mi hai anche sporcato la maglietta!)"
  }
};
