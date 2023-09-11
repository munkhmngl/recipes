import axios from "axios";
export default class Search{
   constructor(query){
      this.query = query;
   }
   async doSearch(){
      try {
         let result = await axios(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${this.query}`);
         console.log(result);
         this.result= result.data.data.recipes;
         console.log(this.result);
         return this.result;
      }catch(error){
         alert(`Асуудал гарлаа: ${error.message}`);
      }
   }
};