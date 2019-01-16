import { Injectable } from '@angular/core';

@Injectable()
export class ArrayService {

    constructor() { }
    //https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript
    public static removeDuplicates(anyArray: any[], filterByProperty:string = '') {
        let uniqueArray:any[] = [];
        if(!filterByProperty){
            uniqueArray = anyArray.filter((value, index, self) => self.indexOf(value) === index);
        }else{
            uniqueArray =  anyArray.filter((value, index, self) => self.map(x => x[filterByProperty]).indexOf(value[filterByProperty]) == index);
        }
        //console.log(uniqueArray.filter(Boolean));
        //uniqueArray = uniqueArray.filter((value, index, self) => self.indexOf(value[filterByProperty]) === index);
        // let shortenedArray:any[] = [];
        // for(let i=0;i<uniqueArray.length;i++){
        //     if(uniqueArray[i]){
        //         console.log(uniqueArray[i]);
        //         shortenedArray.push(uniqueArray[i]);
        //     }
        // }
        //return uniqueArray.filter(Boolean);
        return uniqueArray;
    }
}