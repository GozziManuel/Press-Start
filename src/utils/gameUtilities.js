const gameGifs = {
  "super-mario-bros": "/mario-bros.gif",
  "the-legend-of-zelda": "/zelda-nes.gif",
  "pac-man": "/pacman.gif",
  "tetris-nes": "/tetris.gif",
  "sonic-the-hedgehog": "/sonic.gif",
  "street-fighter-ii": "/sf2.gif",
  "final-fantasy-vii": "/ff7.gif",
  doom: "/doom.gif",
  "metal-gear-solid": "/mgs.gif",
  "panzer-dragoon": "/panzer-dragoon.gif",
  "resident-evil": "/resident-evil.gif",
  "crash-bandicoot": "/crash.gif",
  "nights-into-dreams": "/nights.gif",
  "donkey-kong-country": "/dkc.gif",
  metroid: "/metroid.gif",
  "chrono-trigger": "/chrono-trigger.gif",
  "castlevania-sotn": "/sotn.gif",
  "mega-man-2": "/megaman2.gif",
  "virtua-fighter-2": "/vf2.gif",
  "goldeneye-007": "/goldeneye.gif",
  "super-mario-64": "/mario64.gif",
  "zelda-ocarina-of-time": "/oot.gif",
  "silent-hill": "/silent-hill.gif",
  "daytona-usa": "/daytona.gif",
  "mario-kart-64": "/mk64.gif",
  "tomb-raider": "/tomb-raider.gif",
  "star-fox-64": "/starfox64.gif",
  "gran-turismo": "/gt1.gif",
  contra: "/contra.gif",
  "sega-rally": "/sega-rally.gif",
};

/** Funzione che ritorna la GIF corretta basandosi sullo slug del gioco attualmente renderizzato.
 *
 * @param {string} slug --> lo slug unico del gioco (es. 'super-mario-bros')
 * @returns {string} --> il percorso relativo della GIF (es. '/gifs/mario-bros.gif')
 */
export const getGameGif = (slug) => {
  return gameGifs[slug] || "/gifs/default-gaming.gif";
};
