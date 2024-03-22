describe('affichage', () => {
    it('Affichage  ', () => {
        cy.visit('https://devweb.iutmetz.univ-lorraine.fr/~portais1u/2eme_annee/site/')
        cy.fixture('data.json').then(jsonData => {
            const jsonString = JSON.stringify(jsonData);
            const chunkSize = 500; // Taille de chaque morceau
            for (let i = 0; i < jsonString.length; i += chunkSize) {
                const chunk = jsonString.substring(i, i + chunkSize);
                cy.get('textarea').type(chunk, { parseSpecialCharSequences: false });
            }
            //cy.get('textarea').type(JSON.stringify(jsonData), { parseSpecialCharSequences: false });
        });
        cy.get('input').click();
    });
  
})
