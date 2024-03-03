import { MorpionSimple } from './morpionSimple.js';
import { Morpion } from './morpion.js';
import { Partie } from './partie.js';

const partie = new Partie();

let zone_message;

// nécessaire pour pouvoir désactiver les listeners, car je leur passe des paramètres lors du addEventListener
let ecouteurs = [];

function recommence() {
  zone_message = document.getElementById('messages');
  const taille = document.getElementById('taille').value;
  const modeJeu = document.getElementById('simple').checked
    ? 'simple'
    : 'complet';

  const table = document.getElementById('table_morpion');
  for (let l = table.rows.length - 1; l >= 0; l--) {
    table.deleteRow(l);
  }

  try {
    if (modeJeu === 'simple') {
      partie.commence(new MorpionSimple(Number.parseInt(taille)));
    } else {
      partie.commence(new Morpion(Number.parseInt(taille)));
    }
  } catch (error) {
    zone_message.innerHTML = error.message;
    return;
  }

  for (let i = 0; i < taille; i++) {
    const ligne = table.insertRow(i);
    for (let j = 0; j < taille; j++) {
      const id = '' + ((i + 1) * 10 + (j + 1));
      const cell = ligne.insertCell(j);
      cell.innerHTML = "<input type='button' id='" + id + "' class='case' />";
      const monEcouteur = () => clicBouton(cell.firstChild, i, j);
      ecouteurs.push(monEcouteur);
      cell.firstChild.addEventListener('click', monEcouteur);
    }
  }

  zone_message.innerHTML =
    'Joueur ' + partie.getJoueurCourant().numero + ', à toi de jouer !';
  document.getElementById('btn_reset').disabled = true;
  document.getElementById('score').innerHTML = partie.scoresToString();
  document.getElementById('btn_reset').addEventListener('click', recommence);
}

function clicBouton(uneCase, y, x) {
  try {
    const victoire = partie.joue(y, x);
    uneCase.value = partie.getJoueurCourant().symbole;
    uneCase.classList.add('joueur' + partie.getJoueurCourant().numero);

    if (victoire) {
      zone_message.innerHTML =
        'Le joueur ' + partie.getJoueurCourant().numero + ' a gagné !';
      desactiveEcouteurs();
      document.getElementById('score').innerHTML = partie.scoresToString();
    } else {
      partie.passeAuCoupSuivant();
      if (partie.estFinie()) {
        zone_message.innerHTML = 'Match nul !';
        desactiveEcouteurs();
      } else {
        zone_message.innerHTML =
          'Joueur ' + partie.getJoueurCourant().numero + ', à toi de jouer !';
      }
    }
  } catch (error) {
    zone_message.innerHTML = error.message;
  }
}

function desactiveEcouteurs() {
  let l = 0;
  for (let i = 0; i < partie.grille.taille; i++) {
    for (let j = 0; j < partie.grille.taille; j++) {
      document
        .getElementById('' + ((i + 1) * 10 + (j + 1)))
        .removeEventListener('click', ecouteurs[l]);
      l++;
    }
  }
  ecouteurs = [];
  document.getElementById('btn_reset').disabled = false;
}

recommence();
