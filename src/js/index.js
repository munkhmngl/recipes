require("@babel/polyfill");
import Search from './model/search';
import { elements, renderLoader, clearLoader } from './view/base';
import Recipe from './model/Recipe';
import * as searchView from './view/searchView';
import List from './model/List';
import * as listView from './view/listView';
import Like from './model/like';
import * as likesView from './view/likesView';
import { renderRecipe, clearRecipe, selectedRecipe } from './view/recipeView';

// Web app төлөв
// Хайлтын quety, үр дүн
// Тухайн үзүүлж байгаа жор
// Лайкласан жорууд
// Захиалж байгаа жорын найрлаганууд
const state = {};

// хайлтын контроллер
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
};

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
   // id байгаа эсэхийг шалгах
   if(url){
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
      renderRecipe(state.recipe, state.likes.isLiked(url));
   }
};

['hashchange', 'load'].forEach(e => window.addEventListener(e, controlRecipe));
window.addEventListener('load', e => {
   // шинээр лайк моделийг апп дөнгөж ачаалагдахад үүсгэнэ
   if(!state.likes) state.likes = new Like();
   // Лайк цэсийг хаах
   likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
   // лайкууд байвал тэдгээрийг цэсэнд нэмж харуулна
   state.likes.likes.forEach(e => likesView.renderLike(like));
});

// Найрлаганы контроллер
const controlList = () => {
   try {
      // найрлаганы моделийг үүсгнэ
      state.list = new List();
      // Өмнө харагдаж байсан найрлагануудыг дэлгэцнээс арилгана
      listView.clearItems();
      // Уг модел рүү одоо харагдаж байгаа жорны бүх найрлагыг авч хийнэ
      state.recipe.ingredients.forEach(e => {
         const item = state.list.addItem(e);
         listView.renderItem(item);
      });
   }catch(e) {
      console.log(e.message);
   }
};

// Like Контроллер
const controlLike = () => {
   // 1) Лайкийн моделийг үүсгэнэ
   if(!state.likes) state.likes = new Like();
   // 2) Одоо харагдаж байгаа id олж авах
   const currentRecipeId = state.recipe.id;
   // 3) Энэ жорыг лайкласан эсэхийг шалгах
   if(state.likes.isLiked(currentRecipeId)){
      // 4) лайкласан бол лайкийг нь болиулна
      state.likes.deleteLike(currentRecipeId);
      // лайкын цэснээс устгана
      likesView.deleteLike(currentRecipeId);
      // лайк товчны лайкласан төлөвлийг болиулах
      likesView.toggleLikeBtn(false);
   } else {
      // 5) лайклаагйү бол лайклана
      const newLike = state.likes.addLike(currentRecipeId, state.recipe.title, state.recipe.publisher, state.recipe.image);
      // Лайк цэсэнд энэ лайкыг оруулах
      likesView.renderLike(newLike);
      // лайк товчны лайкласан төлөвт оруулах
      likesView.toggleLikeBtn(true);
   }
   likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};

elements.resipeDiv.addEventListener('click', e => {
   if(e.target.matches(".recipe__btn, .recipe__btn *")){
      controlList();
   } else if(e.target.matches(".recipe__love, .recipe__love *")){
      controlLike();
   }
});
elements.shoppingList.addEventListener('click', e => {
   // Клик хийсэн li элементийн data-itemid аттрибутыг шүүж гаргаж авах
   const id = e.target.closest('.shopping__item').dataset.itemid;
   // Олдсон ID-тай орцыг моделоос устгана
   state.list.deleteItem(id);
   // Дэлгэцээс ийм id-тай орцыг олж бас устгана
   listView.deleteItem(id);
});