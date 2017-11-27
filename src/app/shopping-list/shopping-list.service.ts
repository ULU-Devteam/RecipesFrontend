import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import { Response } from '@angular/http';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: any[] = [];
  headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  setIngredients(ingredients: Ingredient[]) {
    this.ingredients = ingredients;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  getIngredients() {

    return this.http.get('https://recipenosql.herokuapp.com/api/shoppingList')
      .map(
        (response: Response) => {
          const data = response.json();
          this.setIngredients(data['ingredients']);
          return data['ingredients'];
        }
      );

  }

  getIngredient(index: number) {

    return this.ingredients[index];

  }

  addIngredient(ingredient: Ingredient) {

    return this.http.post('https://recipenosql.herokuapp.com/api/shoppingList/ingredient', ingredient, {headers: this.headers})
      .map(
        (response: Response) => {
          const data = response.json();
          this.setIngredients(data['ingredients']);
          return data['ingredients'];
        }
      );

  }

  addIngredients(ingredients: Ingredient[]) {

    return this.http.post('https://recipenosql.herokuapp.com/api/shoppingList/ingredient', ingredients, {headers: this.headers})
      .map(
        (response: Response) => {
          const data = response.json();
          return data['ingredients'];
        }
      );

  }

  updateIngredient(index: number, newIngredient: Ingredient) {

    const id = this.ingredients[index]['_id'];
    this.http.put('https://recipenosql.herokuapp.com/api/shoppingList/ingredient/' + id, newIngredient)
      .subscribe(() => {
        this.ingredients[index].name = newIngredient.name;
        this.ingredients[index].amount = newIngredient.amount;
        this.ingredientsChanged.next(this.ingredients.slice());
      });

  }

  deleteIngredient(index: number) {

    const id = this.ingredients[index]['_id'];
    this.http.delete('http://localhost:3000/api/shoppingList/ingredient/' + id)
      .subscribe(() => {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      });

  }
}
