import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import { Response } from '@angular/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [];
  headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) {
  }

  getIngredients() {
    return this.http.get('http://localhost:3000/api/shoppingList')
      .map(
        (response: Response) => {
          const data = response.json();
          return data['ingredients'];
        }
      );
    // return this.ingredients.slice();

  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    // this.ingredients.push(ingredient);
    // this.ingredientsChanged.next(this.ingredients.slice());

    return this.http.post('http://localhost:3000/api/shoppingList/ingredient', ingredient, {headers: this.headers})
      .map(
        (response: Response) => {
          const data = response.json();
          return data['ingredients'];
        }
      );

    // this.ingredients.push(ingredient);
    // this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.next(this.ingredients.slice());

    return this.http.post('http://localhost:3000/api/shoppingList/ingredient', ingredients, {headers: this.headers})
      .map(
        (response: Response) => {
          const data = response.json();
          return data['ingredients'];
        }
      );


    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    // this.ingredients.push(...ingredients);
    // this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
