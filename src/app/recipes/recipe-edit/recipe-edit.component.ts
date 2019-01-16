import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  rForm: FormGroup;
  id: string;
  editMode: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private recipeService: RecipesService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] != null; //if 'id' param exists, then we are in edit mode
      this.initForm();
    });
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      if (recipe) {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if (recipe.ingredients && recipe.ingredients.length > 0) {
          for (let ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredient.name, Validators.required),
                'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
                'counter': new FormControl(ingredient.counter, Validators.required),
              })
            )
          }
        }
      } else {
        this.editMode = false;
      }
    }
    this.rForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    });
  }
  onRemoveIngredient(index: number) {
    (<FormArray>this.rForm.get('ingredients')).removeAt(index);
  }
  onAddIngredient() {
    (<FormArray>this.rForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'counter': new FormControl(null, Validators.required),
      })
    );
  }
  onSubmit() {
    if (!this.rForm.valid) return;

    const newRecipe: Recipe = new Recipe(
      this.rForm.value['name'],
      this.rForm.value['description'] || 'Edit to add a description',
      this.rForm.value['imagePath'] || 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      this.rForm.value['ingredients'],
      this.id
    )
    if (this.editMode) {
      this.recipeService.updateRecipe(newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    this.rForm.reset();
  }
  onReset() {
    this.rForm.reset();
    this.router.navigate(['/recipes']);
  }
}
