import { elements } from "./base";

export const renderItem = item => {
   const html = `
   <li class="shopping__item" data-itemid=${item.id}>
      <p class="shopping__description">${item.item.quantity} ${item.item.unit}, ${item.item.description}</p>
      <button class="shopping__delete btn-tiny">
         <svg>
            <use href="img/icons.svg#icon-circle-with-cross"></use>
         </svg>
      </button>
   </li>`
   elements.shoppingList.insertAdjacentHTML('beforeend', html);
};

export const clearItems = () => {
   elements.shoppingList.innerHTML = '';
}