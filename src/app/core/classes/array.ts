export class ArrayOperations{

    static  arrayOfStringsToObject(array:any[]):{[key in string]:any}{
        return Object.assign({}, ...array?.map((item:any) => ({[item]: item})))
      }
}