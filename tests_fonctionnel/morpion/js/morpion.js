export class Morpion {
  #taille;
  #grille;

  static MAX_GRILLE = 8;
  static MIN_GRILLE = 3;

  constructor(taille = 3) {
    // appel du setter !!!
    this.taille = taille;
    // this.#taille = taille -> pas d'appel du setter, initialisation directe
  }

  set taille(taille = 3) {
    if (
      Number.isNaN(taille) ||
      taille < Morpion.MIN_GRILLE ||
      taille > Morpion.MAX_GRILLE
    ) {
      throw new Error('Taille invalide !');
    }
    this.#taille = taille;
    this.#grille = new Array(taille);
    for (let i = 0; i < taille; i++) {
      this.#grille[i] = new Array(taille);
      for (let j = 0; j < taille; j++) {
        this.#grille[i][j] = ' ';
      }
    }
  }

  get taille() {
    return this.#taille;
  }

  get grille() {
    return this.#grille;
  }

  setCase(symbole, y, x) {
    if (this.#grille[y][x] === ' ') {
      this.#grille[y][x] = symbole;

      return this.aGagne(symbole, y, x);
    } else {
      throw new Error('Case déjà occupée !');
    }
  }

  aGagne(symbole, y, x) {
    let nbSymboles;

    // gagné en ligne ?
    const ligne = y;
    nbSymboles = 0;
    for (let col = 0; col < this.#taille; col++) {
      if (this.#grille[ligne][col] === symbole) {
        nbSymboles++;
      }
    }
    if (nbSymboles === this.#taille) {
      return true;
    }

    // gagné en colonne ?
    const col = x;
    nbSymboles = 0;
    for (let ligne = 0; ligne < this.#taille; ligne++) {
      if (this.#grille[ligne][col] === symbole) {
        nbSymboles++;
      }
    }
    if (nbSymboles === this.#taille) {
      return true;
    }

    // gagné diagonale
    if (x === y) {
      nbSymboles = 0;
      for (let lc = 0; lc < this.#taille; lc++) {
        if (this.#grille[lc][lc] === symbole) {
          nbSymboles++;
        }
      }
      if (nbSymboles === this.#taille) {
        return true;
      }
    }

    // gagné diag inverse
    if (x === this.#taille - (y + 1)) {
      nbSymboles = 0;
      for (let ligne = 0; ligne < this.#taille; ligne++) {
        if (this.#grille[ligne][this.#taille - (ligne + 1)] === symbole) {
          nbSymboles++;
        }
      }
      if (nbSymboles === this.#taille) {
        return true;
      }
    }
    return false;
  }
}
