it('Match nul ok', () => {
    cy.visit('http://127.0.0.1:5500/morpion/vue/morpion.html')
    const tabCases = [11, 22, 23, 13, 31,21,33,32,12]
    cy.wrap(tabCases).each((index) => {
        cy.get('#'+index).click()
    })
    cy.get('#messages').should('have.text', 'Match nul !')
  }),
  it('Joueur 1 gagne', () => {
    cy.visit('http://127.0.0.1:5500/morpion/vue/morpion.html')
    const tabCases = [11, 33, 31, 22, 21]
    cy.wrap(tabCases).each((index) => {
        cy.get('#'+index).click()
    })

    cy.get('#messages').should('have.text', 'Le joueur 1 a gagné !')
    cy.get('#score').should('have.text', 'X : 1 - O : 0')
  }),
  it('Joueur 2 gagne', () => {
    cy.visit('http://127.0.0.1:5500/morpion/vue/morpion.html')
    const tabCases = [13, 33, 31, 22, 21,11]
    cy.wrap(tabCases).each((index) => {
        cy.get('#'+index).click()
    })

    cy.get('#messages').should('have.text', 'Le joueur 2 a gagné !')
    cy.get('#score').should('have.text', 'X : 0 - O : 1')
  }),
  it('Joueur 1 gagne deux foix', () => {
    cy.visit('http://127.0.0.1:5500/morpion/vue/morpion.html')
    const tabCases = [11, 33, 31, 22, 21]
    cy.wrap(tabCases).each((index) => {
        cy.get('#'+index).click()
    })

    cy.get('#messages').should('have.text', 'Le joueur 1 a gagné !')
    cy.get('#score').should('have.text', 'X : 1 - O : 0')
    cy.get('#btn_reset').click()
    cy.wrap(tabCases).each((index) => {
        cy.get('#'+index).click()
    })
    cy.get('#messages').should('have.text', 'Le joueur 1 a gagné !')
    cy.get('#score').should('have.text', 'X : 2 - O : 0')
  }),
  it('Joueur 1 gagne puis le joueur 2 gagne', () => {
    cy.visit('http://127.0.0.1:5500/morpion/vue/morpion.html')
    let tabCases = [11, 33, 31, 22, 21]
    cy.wrap(tabCases).each((index) => {
        cy.get('#'+index).click()
    })

    cy.get('#messages').should('have.text', 'Le joueur 1 a gagné !')
    cy.get('#score').should('have.text', 'X : 1 - O : 0')
    cy.get('#btn_reset').click()
    tabCases = [13, 33, 31, 22, 21,11]
    cy.wrap(tabCases).each((index) => {
        cy.get('#'+index).click()
    })
    cy.get('#messages').should('have.text', 'Le joueur 2 a gagné !')
    cy.get('#score').should('have.text', 'X : 1 - O : 1')
  })



