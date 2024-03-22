let allData = [];

Cypress.Commands.add('getRowsWithData', (tableSelector) => {
  return cy.get(tableSelector)
    .find('tr')
    .filter((index, el) => {
      const $tr = Cypress.$(el);
      return $tr.find('td').length === 5 && !$tr.find('td > tbody').length && !$tr.find('td > table').length;
    });
})

Cypress.Commands.add('createData', (name) => {
  const allRowData = [];
  cy.getRowsWithData('tbody').each(($row, index) => {

    const nomEnt = $row.find('td').eq(0).text();
    const ville = $row.find('td').eq(1).text();
    const motsClefs = $row.find('td').eq(2).text();
    const nbStage = $row.find('td').eq(3).text();
    const rowData = {
      nomEnt: nomEnt,
      ville: ville,
      motsClefs: motsClefs,
      nbStage: nbStage
    };

    allRowData.push(rowData);
  }).then(() => {
    const data = {
      nom: name,
      informations: allRowData
    }

    allData.push(data);
  });
})

Cypress.Commands.add('createJson', () => {
  const allDataJson = {
    name : "Recherche stage",
    info : allData
  }
  const jsonData = JSON.stringify(allDataJson, null, 2);
  
  cy.writeFile(`cypress/fixtures/data.json`, `${jsonData}`).then(() => {
    cy.log('Données écrites dans test_data.js');
  });
})

describe('recherche', () => {
  beforeEach(() => {
    cy.visit('https://dptinfo.iutmetz.univ-lorraine.fr/applis/stages/portail.php')
    cy.get('#login').type("nportais54")
    cy.get('#psw').type("i$Ju6PHR")
    cy.get('.btn').click()
    cy.visit('https://dptinfo.iutmetz.univ-lorraine.fr/applis/stages/stages_historique.php')
  })
  it('Recherche Mot clé ', () => {
    cy.get('#MotCleValue').select("API")
    cy.get('#MotCle1Value').select("IA")
    cy.get('#LogiqueValue').select("Or")
    cy.get('.btn-success').click()

    cy.createData("Mot Clef API IA")
  });

  it('Recherche Ville ', () => {
    cy.get('#VilleValue').select("Paris")
    cy.get('.btn-success').click()

    cy.createData("Ville  Paris")
  })

  it('Recherche Entreprise ', () => {
    cy.get('#EntrepriseValue').select("CERAH")
    cy.get('.btn-success').click()

    cy.createData("Entreprise CERAH")
  })

  it('Recherche Pays ', () => {
    cy.get('#PaysValue').select("Angleterre")
    cy.get('.btn-success').click()

    cy.createData("Pays Angleterre")
  })

  it('Recherche Section ', () => {
    cy.get('#SectionValue').select("BUT2RA")
    cy.get('.btn-success').click()

    cy.createData("Section BUT2RA")
  })

  it('Recherche Année ', () => {
    cy.get('#AnneeValue').select("2023")
    cy.get('.btn-success').click()

    cy.createData("Année 2023")
    cy.createJson()
  })

  it('Recherche Département ', () => {
    cy.get('#CPValue').select("75")
    cy.get('.btn-success').click()

    cy.createJson("Département 75");
  })

})





