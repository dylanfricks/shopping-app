import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { LorumService } from '../shared/lorum/lorum.service';
import { GuidService } from '../shared/guid/guid.service';
import { Ingredient } from '../shared/ingredient.model';
import { IngredientService } from '../shared/ingredientGenerator/ingredients.service';
import { ArrayService } from '../shared/util/array.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [];
  recipesUpdated:Subject<Recipe[]> = new Subject<Recipe[]>();

  ///////////////////////
  //CREATING PSEUDODATA//
  private createRecipes(){
    let count:number = Math.floor(Math.random() * 4 + 1);
    for(let i=0;i<count;i++){
      this.recipes.push(new Recipe(LorumService.RandomWord(), LorumService.RandomSentence(), 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', IngredientService.RandomIngredients(1, 4)));
    }
  }
  // private createIngredients(): Ingredient[]{
  //   let count:number = Math.floor(Math.random() * 4 + 1);
  //   let group:Ingredient[] = [];
  //   for(let i=0;i<count;i++){
  //     group.push(IngredientService.RandomIngredient());
  //   }
  //   return group;
  // }
  //CREATING PSEUDODATA//
  //////////////////////


  constructor() { 
    this.createRecipes();
  }

  getRecipes(){
    return this.recipes.slice(); // returns copy rather than reference
  }
  getRecipeById(id:string){
    for(let recipe of this.recipes){
      if(id === recipe.id){
        return recipe;
      }
    }
  }
  getRecipeIndex(recipe:Recipe):number | null{
    for(let i=0;i<this.recipes.length;i++){
      if(this.recipes[i].id === recipe.id){
        return i;
      }
    }
    return null;
  }
  // addRecipe(name:string, desc:string, imgPath:string){
  //   let newRecipe:Recipe = new Recipe(name, desc, imgPath, GuidService.generateUUID());
  //   this.recipes.push(newRecipe);
  // }
  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipesUpdated.next(this.getRecipes());
  }
  updateRecipe(recipe:Recipe){
    let index = this.getRecipeIndex(recipe);
    this.recipes[index] = recipe;
    this.recipesUpdated.next(this.getRecipes());
  }
  deleteRecipe(id:string){
    let index = this.getRecipeIndex(this.getRecipeById(id));
    this.recipes.splice(index, 1);
    this.recipesUpdated.next(this.getRecipes());
  }
}
