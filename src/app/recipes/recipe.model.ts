import { GuidService } from "../shared/guid/guid.service";
import { Ingredient } from "../shared/ingredient.model";

export class Recipe {
    
    public name:string;
    public description:string;
    public imagePath:string;
    public id:string;
    public ingredients:Ingredient[];

    constructor( name:string, desc:string, imgPath:string, ingredients:Ingredient[] = [], id:string = ''){
        this.name = name;
        this.description = desc;
        this.imagePath = imgPath;
        this.ingredients = ingredients;
        
        if(id === ''){
            this.id = GuidService.generateUUID();
        }else{
            this.id = id;
        }
    }
}