export class Joueur {
  #numero;
  #symbole;
  #score;

  static SYMBOLES_JOUEURS = ['X', 'O'];

  constructor(numero, symbole) {
    this.numero = numero;
    this.score = 0;

    if (symbole === undefined) {
      symbole = Joueur.SYMBOLES_JOUEURS[numero - 1];
    }
    this.symbole = symbole;
  }

  set numero(numero) {
    if (numero > 0 || numero <= 2) {
      this.#numero = numero;
    } else {
      throw new Error('Le n° de joueur doit être 1 ou 2 !');
    }
  }

  get numero() {
    return this.#numero;
  }

  set symbole(symbole) {
    if (Joueur.SYMBOLES_JOUEURS.includes(symbole)) {
      this.#symbole = symbole;
    } else {
      throw new Error(
        'Le symbole du joueur doit être choisi parmi :' +
          Joueur.SYMBOLES_JOUEURS.toString()
      );
    }
  }

  get symbole() {
    return this.#symbole;
  }

  set score(score) {
    if (score >= 0) {
      this.#score = score;
    } else {
      throw new Error('Le score doit être supérieur ou égal à 0');
    }
  }

  get score() {
    return this.#score;
  }

  incrementeScore() {
    this.#score++;
  }

  toString() {
    return this.#symbole + ' : ' + this.#score;
  }
}
