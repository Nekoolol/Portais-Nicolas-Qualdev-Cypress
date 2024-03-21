describe('affichage', () => {
    it('Affichage  ', () => {
        cy.visit('site/index.php')
        cy.fixture('data.json').then(jsonData => {
            cy.get('textarea').type(JSON.stringify(jsonData));
        });
        cy.get('input').click();
    });
  
})