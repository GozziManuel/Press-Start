const gameGifs = {
  "super-mario-bros": "/gif-detail/super-mario-bros.gif",
  "the-legend-of-zelda": "/gif-detail/zelda1986.gif",
  "pac-man": "/gif-detail/pac-man.gif",
  "tetris-nes": "/gif-detail/tetris.gif",
  "sonic-the-hedgehog": "/gif-detail/sonic1991.gif",
  "street-fighter-ii": "/gif-detail/street-fighter2.gif",
  "final-fantasy-vii": "/gif-detail/ff7-1997.gif",
  doom: "/gif-detail/doom.gif",
  "metal-gear-solid": "/gif-detail/mgs1.gif",
  "panzer-dragoon": "/gif-detail/panzer-dragoon.gif",
  "resident-evil": "/gif-detail/re1.gif",
  "crash-bandicoot": "/gif-detail/crash-b-1.gif",
  "nights-into-dreams": "/gif-detail/nights-into-dreams.gif",
  "donkey-kong-country": "/gif-detail/dkc.gif",
  metroid: "/gif-detail/metroid.gif",
  "chrono-trigger": "/gif-detail/chrono-trigger.gif",
  "castlevania-sotn": "/gif-detail/castlevania.gif",
  "mega-man-2": "/gif-detail/megaman2.gif",
  "virtua-fighter-2": "/gif-detail/vf2.gif",
  "goldeneye-007": "/gif-detail/goldeneye007.gif",
  "super-mario-64": "/gif-detail/mario64.gif",
  "zelda-ocarina-of-time": "/gif-detail/loz-oot.gif",
  "silent-hill": "/gif-detail/silent-hill.gif",
  "daytona-usa": "/gif-detail/daytona-usa.gif",
  "mario-kart-64": "/gif-detail/mariokart64.gif",
  "tomb-raider": "/gif-detail/tomb-raider1996.gif",
  "star-fox-64": "/gif-detail/starfox64.gif",
  "gran-turismo": "/gif-detail/gt1.gif",
  contra: "/gif-detail/contra.gif",
  "sega-rally": "/gif-detail/sega-rally-champ.gif",
};

/** Funzione che ritorna la GIF corretta basandosi sullo slug del gioco attualmente renderizzato.
 *
 * @param {string} slug --> lo slug unico del gioco (es. 'super-mario-bros')
 * @returns {string} --> il percorso relativo della GIF (es. '/gifs/mario-bros.gif')
 */
export const getGameGif = (slug) => {
  return gameGifs[slug] || "/default-gaming.gif";
};
