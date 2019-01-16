import { PipeTransform, Pipe } from "@angular/core";
@Pipe({
    name:'filter-list',
    pure: false
})
export class FilterListPipe implements PipeTransform{
    transform(list:any[], filterString:string, propName:string){
        if(list.length === 0) return list;
        let resultArray = [];
        for(const item of list){
            if(item[propName] === filterString){
                resultArray.push(item);
            }
        }
        return resultArray;
    }
}