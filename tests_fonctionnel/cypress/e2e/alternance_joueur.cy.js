describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/morpion/vue/morpion.html')
  }),
  it('clic bien géré', () => {
    cy.visit('http://127.0.0.1:5500/morpion/vue/morpion.html')
    cy.get('#23').click()
    cy.get('#23').should('have.value', 'X')
    }),
    it('alternance joueur ok', () => {
    cy.visit('http://127.0.0.1:5500/morpion/vue/morpion.html')
    cy.get('#messages').should('have.text', 'Joueur 1, à toi de jouer !')
    cy.get('#11').click()
    cy.get('#messages').should('have.text', 'Joueur 2, à toi de jouer !')
    })
})

