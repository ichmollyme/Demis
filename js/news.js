import { getDataAndCreateCards } from "./modules/newsFunctions.js";

const cardBodyTemplate = `
    <figure class="card__thumb">
        <img src="{{Image}}" alt="" class="card__image">
        <time class="card__date" datetime="{{CreateDate}}">{{formattedDate}}</time>
        <figcaption class="card__caption">
            <h2 class="card__title">{{Name}}</h2>
            <p class="card__snippet">{{Body}}</p>
            <a href="" class="card__button">Читать</a>
        </figcaption>
    </figure>
`;

getDataAndCreateCards(5, "desc", cardBodyTemplate);
