import axios from "axios";

export default class Recipe {
   constructor(id) {
      this.id = id;
   }
   async getRecipe(){
      try{
         const result = await axios(`https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bc886?key=<insert your key>`);
         console.log(result);
         this.status = result.status;
         this.time = result.data.data.recipe.cooking_time;
         this.image = result.data.data.recipe.image_url;
         this.ingredients = result.data.data.recipe.ingredients;
         this.publisher = result.data.data.recipe.publisher;
         this.servings = result.data.data.recipe.servings;
         this.source = result.data.data.recipe.source_url;
         this.title = result.data.data.recipe.title;
         console.log(this.title);
         console.log(this.ingredients);
         
      }catch(e){
         console.log(`Алдаа гарлаа: ${e.message}`);
      }
   }
}