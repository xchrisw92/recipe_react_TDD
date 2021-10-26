import React from "react";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';


const setup = () =>{
  const app = render(<App />);

  userEvent.click(app.getByText('Add Recipe'));

  const submitButton = app.getByRole('button');
  const instructionsInput = app.getByLabelText('Instructions:');
  const nameInput = app.getByLabelText('Recipe name:');

  return {
    instructionsInput,
      nameInput,
      submitButton
  }
}

async function addRecipe(instructionsInput, recipeInstructions, nameInput, recipeName, submitButton) {
    await userEvent.type(instructionsInput, recipeInstructions)
    await userEvent.type(nameInput, recipeName)
    userEvent.click(submitButton);
}
test('Add recipe button toggles visibility of a form on the page ', () => {
  render(<App/>);
  const recipeForm = screen.queryByText("Instructions:");
  expect(recipeForm).toBeNull();
  userEvent.click(screen.getByText(`Add Recipe`));
  expect(screen.getByLabelText("Instructions:")).toBeInTheDocument();
})
test('typing in the recipe name makes the recipe name appear in the input', async () =>{
    render(<App />);
    const recipeName = 'No pockets';
    userEvent.click(screen.getByText('Add Recipe'));
    await userEvent.type(screen.getByLabelText("Recipe name:"), recipeName);

    expect(screen.getByLabelText("Recipe name:").value).toEqual(recipeName);
  })
test('typing in the recipe instructions makes the recipe instructions appear in the form', async () =>{
  const {instructionsInput} = setup();
  const recipeInstructions = "kinda hard to write instructions without knowing what I\'m cooking";

  await userEvent.type(instructionsInput, recipeInstructions)
  expect(instructionsInput.value).toEqual(recipeInstructions);
})


test('recipe name from state appears in an unordered list', async () =>{
    const {instructionsInput, nameInput, submitButton} = setup();
    const recipeName = 'Lean Pockets';
    const recipeInstructions = 'place in toaster oven on 350 for 45 minutes';
    await addRecipe(instructionsInput, recipeInstructions, nameInput, recipeName, submitButton);

    expect(screen.getByRole('listitem')).toBeInTheDocument();
    expect(screen.getByText(recipeName)).toBeInTheDocument();
})
it('should display multiple recipe names when multiple are submitted', async () => {
    const {instructionsInput, nameInput, submitButton} = setup();
    await addRecipe(instructionsInput, 'cook 350 for 20 min', nameInput, 'cookies', submitButton);
    await addRecipe(instructionsInput, 'bake 400 50 min', nameInput, 'fish', submitButton);

    expect(screen.getAllByRole('listitem')).toHaveLength(2);
    expect(screen.getAllByRole('listitem')[1]).toHaveTextContent(/^fish$/)

});





