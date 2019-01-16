import { Injectable } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { ArrayService } from '../util/array.service';

@Injectable()
export class IngredientService {
    private static objectList:string[] = [
        'apples', 'lemons', 'limes', 'sugar', 'salt', 'flour', 'butter', 'cinnamon'
    ];
    private static counterList:string[] = [
        'cups', 'tablespoons', 'teaspoons', 'dash'
    ];
    constructor(){}
    public static RandomIngredient() :Ingredient {
        return new Ingredient(this.RandomObject(), this.RandomInteger(1, 5), this.RandomCounter());
    }
    public static RandomIngredients(min, max) :Ingredient[] {
        
        let count:number = Math.floor(Math.random() * (max - min + 1) + min);
        let group:Ingredient[] = [];
        for(let i=0;i<count;i++){
            group.push(this.RandomIngredient());
        }
        let filteredGroup:Ingredient[] = [];
        filteredGroup = ArrayService.removeDuplicates(group, 'name');
        return filteredGroup;
    }
    private static RandomObject() :string {
        return this.objectList[Math.floor(Math.random() * this.objectList.length)];
    }
    private static RandomCounter() :string{
        return this.counterList[Math.floor(Math.random() * this.counterList.length)];
    }
    private static RandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };


}