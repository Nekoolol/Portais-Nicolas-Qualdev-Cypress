function getMorpion(i) {
    cy.get('#taille').clear()
    cy.get('#taille').type(i)
    cy.get('#complet').click()
    cy.get('#btn_reset').click()
}

describe('morpion 4x4 simple', () => {
    beforeEach(() => {
        cy.visit('http://127.0.0.1:5500/morpion/vue/morpion.html')
        const tabCases = [11, 22, 23, 13, 31,21,33,32,12]
            cy.wrap(tabCases).each((index) => {
            cy.get('#'+index).click()
        })
    })
    for (let i = 3; i <= 8; i++) {
        it('CompletColonne ' +i, () => {
            getMorpion(i);
            for (let j = 1; j <= i; j++) {  
                cy.get('#'+j+'1').click()
                cy.get('#'+j+'2').click()              
            }
            cy.get('#messages').should('have.text', 'Le joueur 1 a gagné !')
            cy.get('#score').should('have.text', 'X : 1 - O : 0')
          }),
          it('CompletLigne ' +i, () => {
            getMorpion(i);
            for (let j = 1; j <= i; j++) {  
                cy.get('#1'+j).click()
                cy.get('#2'+j).click()              
            }
            cy.get('#messages').should('have.text', 'Le joueur 1 a gagné !')
            cy.get('#score').should('have.text', 'X : 1 - O : 0')
          }),
          it('Complet Diagonale ' +i, () => {
            getMorpion(i);
            for (let j = 1; j <= i; j++) {  
                cy.get('#'+j+j).click()
                if(j+1 <= i){
                    cy.get('#'+(j+1)+j).click() 
                }
            }
            cy.get('#messages').should('have.text', 'Le joueur 1 a gagné !')
            cy.get('#score').should('have.text', 'X : 1 - O : 0')
          })
    }
});