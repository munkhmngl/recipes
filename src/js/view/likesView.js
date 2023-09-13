import { elements } from "./base";

export const toggleLikeBtn = isLiked => {
   const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
   elements.selectLike.setAttribute('href', `href="img/icons.svg#${iconString}`);
};