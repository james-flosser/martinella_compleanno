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
    "FUERTEVENTURA": "Posto in cui mi è venuta molta spissa e tu sei diventata super marroncina.",
    "PARIGI":        "Pangoccioli giganti, Disneyland, e \"ooooooh, les champs elysees\"!",
    "SHARM":         "Dove si trova il \"lago magico\", che tanto magico non è stato per il tuo piede!",
    "MADRID":        "Il tuo luogo preferito della spagna (per il cappello giallo e il Parque Warner!)",
    "DOLO":          "Magica città della Pianura Padana in cui ti trasferiresti senza pensarci 2 volte.",
    "ALICANTE":      "Dove quella notte tutto è iniziato.",
    "VALENCIA":      "La città con 360 giorni di sole l'anno, in cui noi abbiamo trovato la pioggia e ci siamo anche bruciati!",
    "SHANGHAI":      "Il più bello dei viaggi fatti insieme finora; Posto pieno di Zhongguo ren (molto bendan) in cui abbiamo scoperto gli spaghetti fantastici!",
    "ZARAGOZA":      "All'inizio di quest'anno hai vissuto più qui che a casa tua e la tua frase preferita era \"Limpieza Potente\".",
    "SCHIEPPO":      "Da quella finestra della casetta di ___ ogni mattina possiamo ammirare il Puscio in tutto il suo splendore.",
    "VERONA":        "Dopo numerose uscite, è stato il luogo in cui ci siamo conosciuti veramente ed innamorati. (In un posto di tale provincia mi hai anche sporcato la maglietta!)"
  }
};
