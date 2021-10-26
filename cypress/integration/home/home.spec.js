function addRecipe(name, instructions) {
    const recipeName = name;
    cy.findByRole('textbox', {name: /Recipe name/i}).type(recipeName)
    cy.findByRole('textbox', {name: /instructions/i}).type(instructions)
    cy.findByRole('button').click()
}

describe("Home page", () =>{
    beforeEach(() => {
        cy.visit('/')
    })
    it("header contains recipe heading with a message that there are no recipes", ()=>{
        cy.findByRole('heading').should('contain', 'My Recipes')
        cy.get('p')
            .findByText('There are no recipes to list.')
            .should('exist')
    })

    it("contains an add recipe button that when clicked opens a form", () =>{
        cy.findByRole('button').click();
        cy.get('form')
            .findByRole('button')
            .should('exist')
    })
    it("contains a form with fields 'Recipe Name' and 'Recipe Instructions' after clicking the 'Add Recipe' button", () =>{
    cy.findByRole('button').click();
    expect(cy.findByRole('textbox', {name: /Recipe name/i})).toExist();
    cy.findByRole('textbox',{name: /instructions/i}).should('exist')
    })
    it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", ()=>{
        cy.findByRole('button').click()
        addRecipe('Tofu Scramble Tacos', "1. head a skilled on medium with a dollop of coconut oil {enter} 2. warm flour tortillas");

        expect(cy.findByRole('listitem', /tofu scramble tacos/i)).toExist();
    })
    it('displays a list of recipe names when given multiple recipes', () => {
        cy.findByRole('button').click();
        addRecipe('Tofu Scramble Tacos', "1. head a skilled on medium with a dollop of coconut oil {enter} 2. warm flour tortillas");
        addRecipe('cookies', 'bake 350 20 min');

        cy.findAllByRole('listitem').should("have.length", 2);
        cy.findAllByRole('listitem').eq(1).should("have.text", 'cookies');
    });
})