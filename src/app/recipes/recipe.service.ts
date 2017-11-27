import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Http} from '@angular/http';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private http: Http) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.http.get('https://recipenosql.herokuapp.com/api/recipes');
    // return this.recipes.slice();
  }

  getRecipeFromList() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];

  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    return this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {

    return this.http.post('https://recipenosql.herokuapp.com/api/recipes', recipe);

  }

  updateRecipe(id: number, newRecipe: Recipe) {
    return this.http.put('https://recipenosql.herokuapp.com/api/recipes/' + id, newRecipe);
  }

  deleteRecipe(id: number) {
    return this.http.delete('https://recipenosql.herokuapp.com/api/recipes/' + id);
  }

  private handleError(error: any): Promise<any> {
    console.log('handleError');
    return Promise.reject(error.message || error);
  }
}
