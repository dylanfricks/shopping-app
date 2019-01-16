import { Component, OnInit, OnDestroy} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipesService } from '../recipes.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})

export class RecipeListComponent implements OnInit, OnDestroy {

  obsHandle:Subscription;
  recipes: Recipe[];

  constructor(private recipeService:RecipesService, private router:Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.obsHandle = this.recipeService.recipesUpdated.subscribe((updatedList:Recipe[])=>{
      this.recipes = updatedList;
    });
    this.recipes = this.recipeService.getRecipes();
  }
  ngOnDestroy(){
    this.obsHandle.unsubscribe();
  }
  onNewRecipe(){ //alternative to using routerlink
    //this.router.navigate(['new'], {relativeTo:this.activatedRoute});
  }

}
