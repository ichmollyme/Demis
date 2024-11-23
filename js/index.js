import { getDataAndCreateCards } from "./modules/newsFunctions.js";

const cardBodyTemplate = `
    <figure class="card__thumb">
        <img src="{{Image}}" alt="" class="card__image">
        <time class="card__date" datetime="{{CreateDate}}">{{formattedDate}}</time>
        <figcaption class="card__caption">
            <h2 class="card__title">{{Name}}</h2>
            <p class="card__snippet">{{formattedBody}}</p>
        </figcaption>
    </figure>
`;

const preloader = document.getElementById("preloader");

getDataAndCreateCards(3, "desc", cardBodyTemplate, preloader);
