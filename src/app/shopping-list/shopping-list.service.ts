import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientService } from '../shared/ingredientGenerator/ingredients.service';
//import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ShoppingListService {
  //ingredientsChanged = new EventEmitter<Ingredient[]>(); //ok practice, but better is Subject
  ingredientsChanged = new Subject<Ingredient[]>();
  ingredientsList: Ingredient[] = [];
  staredEditing = new Subject<number>();

  constructor() {
    this.ingredientsList = IngredientService.RandomIngredients(1, 5);
  }
  public getIngredientsList(): Ingredient[] {
    return this.ingredientsList.slice();
  }
  public getIngredient(index:number):Ingredient{
    return this.ingredientsList[index];
  }
  public addIngredient(name: string, quantity: number, counter: string) {

    this.ingredientsList.push(new Ingredient(name, quantity, counter));
    this.ingredientsChanged.next(this.getIngredientsList());
  }
  public updateIngredient(index:number, ingredient:Ingredient){
    this.ingredientsList[index] = ingredient;
    this.ingredientsChanged.next(this.getIngredientsList());
  }
  public addIngredients(listToAdd: Ingredient[]) {
    let newList: Ingredient[] = listToAdd.slice();
    //check current list
    //if dupes, add amounts
    let isAlreadyOnList: boolean;
    for (let i = 0; i < newList.length; i++) {
      isAlreadyOnList = false;
      for (var j = 0; j < this.ingredientsList.length; j++) {
        if (this.ingredientsList[j].name === newList[i].name) {
          this.ingredientsList[j].amount += newList[i].amount;
          isAlreadyOnList = true;
          break;
        }
      }
      if (!isAlreadyOnList) {
        this.ingredientsList.push(newList[i]);
      }
    }
    this.ingredientsChanged.next(this.getIngredientsList());
  }

  public removeIngredientByName(name: string) {
    if (name) {
      for (let i = 0; i < this.ingredientsList.length; i++) {
        if (this.ingredientsList[i].name === name) {
          this.ingredientsList.splice(i,1);
        }
      }
      this.ingredientsChanged.next(this.getIngredientsList());
    }
  }
}
