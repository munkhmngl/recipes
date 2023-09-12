import Search from './model/search';
import { elements, renderLoader, clearLoader } from './view/base';
import * as searchView from './view/searchView';
import Recipe from './model/Recipe';
import { renderRecipe, clearRecipe, selectedRecipe } from './view/recipeView';
// Web app төлөв
// Хайлтын quety, үр дүн
// Тухайн үзүүлж байгаа жор
// Лайкласан жорууд
// Захиалж байгаа жорын найрлаганууд
const state = {};

const controlSearch = async () => {
   // 1) Вэбээс хайлтын түлхүүр үгийг гаргаж авна
   const query = searchView.getInput();
   if(query){
      // 2) шинээр хайлтын обьектийг үүсгэж өгнө
      state.search = new Search(query);
      // 3) хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ
      searchView.clearSearchQuery();
      searchView.clearSearchResult();
      renderLoader(elements.searchResultDiv);
      // 4) хайлтыг гүйцэтгэнэ
      await state.search.doSearch(query);
      // 5) хайлтын үр дүнг дэлгэцэнд үзүүлнэ
      clearLoader();
      if(state.search.result === undefined) alert('Хайлтаар илэрцгүй...');
      else searchView.renderRecipes(state.search.result);
   }
}

elements.searchForm.addEventListener('submit', e => {
   e.preventDefault();
   controlSearch();
});

elements.pageButtons.addEventListener('click', e => {
   const btn = e.target.closest('.btn-inline');
   if(btn){
      const goto = parseInt(btn.dataset.goto, 10);
      searchView.clearSearchResult();
      searchView.renderRecipes(state.search.result, goto);
   }
});

// Жорын контроллер
const controlRecipe = async () => {
   // 1) URL-аас ID-ийг салгаж авах
   const url = window.location.hash.replace('#', '');
   // 2) Жорын моделийг үүсгэж өгнө
   state.recipe = new Recipe(url);
   // 3) UI дэлгэцийг бэлтгэнэ
   clearRecipe();
   renderLoader(elements.resipeDiv);
   selectedRecipe(url);
   // 4) Жороо татаж авчирна
   await state.recipe.getRecipe();
   // 5) Жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно
   clearLoader();
   // 6) Жороо дэлгэцэнд гаргана
   renderRecipe(state.recipe);
}
window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);