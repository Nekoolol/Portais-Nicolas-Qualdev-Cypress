describe('Fonctionnalité', () => {
   beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/morpion/vue/morpion.html')
   })
    it('Rejouer Disable', () => {
        cy.get('#23').click()
        cy.get('#btn_reset').should('be.disabled')
     }),
     it('Rejouer Enable', () => {
      const tabCases = [11, 22, 23, 13, 31,21,33,32,12]
      cy.wrap(tabCases).each((index) => {
      cy.get('#'+index).click()
      })
        cy.get('#btn_reset').should('be.enabled')
     }),
     it('Taille de la grille trop grande', () => {
      const tabCases = [11, 22, 23, 13, 31,21,33,32,12]
         cy.wrap(tabCases).each((index) => {
         cy.get('#'+index).click()
      })
      cy.get('#taille').clear()
      cy.get('#taille').type('9')
      cy.get('#btn_reset').click()
      cy.get('#messages').should('have.text', 'Taille invalide !')
     }),
     it('Taille de la grille trop petite', () => {
      const tabCases = [11, 22, 23, 13, 31,21,33,32,12]
         cy.wrap(tabCases).each((index) => {
         cy.get('#'+index).click()
      })
      cy.get('#taille').clear()
      cy.get('#taille').type('1')
      cy.get('#btn_reset').click()
      cy.get('#messages').should('have.text', 'Taille invalide !')
     })
});