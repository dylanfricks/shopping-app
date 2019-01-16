import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  newIngredient:FormGroup;
  obsHandle:Subscription;
  editMode:boolean = false;
  currentIngredientIndex:number = 0;
  currentEditingItem:Ingredient;
  constructor(private shoppingService:ShoppingListService, private fb:FormBuilder) { }

  ngOnInit() {
    this.newIngredient = this.fb.group({
      'name': new FormControl('', Validators.required),
      'amount': new FormControl('', [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      'counter': new FormControl('', Validators.required)
    });

    this.obsHandle = this.shoppingService.staredEditing.subscribe((index:number)=>{
      this.currentIngredientIndex = index;
      this.editMode = true;
      this.currentEditingItem = this.shoppingService.getIngredient(index);
      this.newIngredient.setValue({
        'name' : this.currentEditingItem.name,
        'amount': this.currentEditingItem.amount,
        'counter': this.currentEditingItem.counter
      });
    });
  }
  ngOnDestroy(){
    this.obsHandle.unsubscribe();
  }
  onSubmit(){
    if(!this.newIngredient.valid) return;
    const newIngredient = new Ingredient(this.newIngredient.controls['name'].value, this.newIngredient.controls['amount'].value, this.newIngredient.controls['counter'].value);
    if(this.editMode){
      this.shoppingService.updateIngredient(this.currentIngredientIndex, newIngredient);
    }else{
      this.shoppingService.addIngredients( [newIngredient]);
    }
    this.newIngredient.reset();
    this.editMode = false;
  }
  onDelete(){
    this.shoppingService.removeIngredientByName(this.newIngredient.controls['name'].value);
    this.newIngredient.reset();
    this.editMode = false;
  }
  onReset(){
    this.newIngredient.reset();
    this.editMode = false;
  }
}
