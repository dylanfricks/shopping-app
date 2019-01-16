import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients:Ingredient[] = [];
  obsHandle:Subscription;

  constructor(private shoppingService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredientsList();
    this.obsHandle = this.shoppingService.ingredientsChanged.subscribe((newList:Ingredient[])=>{
      this.ingredients = newList;
    });
  }
  ngOnDestroy(){
    this.obsHandle.unsubscribe();
  }
  onEditItem(index:number){
    this.shoppingService.staredEditing.next(index);
  }
}
