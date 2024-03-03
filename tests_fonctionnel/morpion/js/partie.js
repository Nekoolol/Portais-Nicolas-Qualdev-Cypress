import { Morpion } from './morpion.js';
import { Joueur } from './joueur.js';

export class Partie {
  #grille;
  #nbCoups;
  #joueurs;
  #joueurCourant;

  constructor(joueurs = [new Joueur(1), new Joueur(2)]) {
    this.joueurs = joueurs;
  }

  commence(grille) {
    this.grille = grille;
    this.#joueurCourant = 0;
    this.#nbCoups = 0;
  }

  set grille(grille) {
    if (grille instanceof Morpion) {
      this.#grille = grille;
    } else {
      throw new Error('La partie doit être initialisée avec un morpion.');
    }
  }

  get grille() {
    return this.#grille;
  }

  set joueurs(joueurs) {
    if (Array.isArray(joueurs) && joueurs.length === 2) {
      this.#joueurs = joueurs;
    } else {
      throw new Error(
        'La partie doit être initialisée avec un tableau de 2 joueurs.'
      );
    }
  }

  getJoueurCourant() {
    return this.#joueurs[this.#joueurCourant];
  }

  joue(y, x) {
    const victoire = this.#grille.setCase(
      this.getJoueurCourant().symbole,
      y,
      x
    );
    if (victoire) {
      this.getJoueurCourant().incrementeScore();
    }
    return victoire;
  }

  passeAuCoupSuivant() {
    this.#nbCoups++;
    this.#joueurCourant = (this.#joueurCourant + 1) % 2;
  }

  estFinie() {
    return this.#nbCoups === this.#grille.taille ** 2;
  }

  scoresToString() {
    let chScores = '';
    for (let j = 0; j < 2; j++) {
      chScores += this.#joueurs[j].toString() + ' - ';
    }
    return chScores.substr(0, chScores.length - 3);
  }
}
