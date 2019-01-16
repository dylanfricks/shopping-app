import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipesService } from '../recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  receivedData:Recipe;
  recipe:Recipe = null;
  id:string;
  obsHandle;
  constructor(private shoppingService:ShoppingListService, private activatedRoute:ActivatedRoute, private router:Router, private recipeService:RecipesService) { }

  ngOnInit() {
    this.obsHandle = this.activatedRoute.params.subscribe((params:Params)=>{
      this.id = params['id'];
      this.receivedData = this.recipeService.getRecipeById(this.id);
      if(this.receivedData) this.recipe = this.receivedData;
    })
  }
  onAddToShoppingList(){
    console.log(this.shoppingService.getIngredientsList());
    this.shoppingService.addIngredients(this.recipe.ingredients);
  }
  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../']);
  }
}
