function getDataAndCreateCards(limit, sort, cardBodyTemplate, preloader) {
  showPreloader(preloader);

  fetch(`/api/news?limit=${limit}&sort=${sort}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Response error.");
      }

      return response.json();
    })
    .then((jsonData) => {
      createCards(jsonData, cardBodyTemplate);

      hidePreloader(preloader);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showPreloader(preloader) {
  preloader.style.display = "flex";
}

function hidePreloader(preloader) {
  preloader.style.display = "none";
}

function createCards(jsonDatas, cardBodyTemplate) {
  const cardsInLineCount = 3;

  const container = document.getElementById("news-wrapper");

  jsonDatas.forEach((jsonData) => {
    const card = createCard(jsonData, cardBodyTemplate);
    container.appendChild(card);
  });

  const remainder = jsonDatas.length % cardsInLineCount;

  if (
    remainder !== 0 &&
    jsonDatas.length > cardsInLineCount &&
    window.innerWidth > 768
  ) {
    const itemsToAdd = cardsInLineCount - remainder;
    for (let i = 0; i < itemsToAdd; i++) {
      const card = createCard(jsonDatas[i], cardBodyTemplate, true);
      container.appendChild(card);
    }
  }
}

function createCard(jsonData, cardBodyTemplate, emptyCard = false) {
  const date = new Date(jsonData.CreateDate);
  const formattedDate = date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedBody = jsonData.Body.split(/(?<=\.)\s+/)[0];

  let cardBody = cardBodyTemplate
    .replace("{{Image}}", jsonData.Image)
    .replace("{{CreateDate}}", jsonData.CreateDate)
    .replace("{{formattedDate}}", formattedDate)
    .replace("{{Name}}", jsonData.Name)
    .replace("{{Body}}", jsonData.Body)
    .replace("{{formattedBody}}", formattedBody);

  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = cardBody;

  if (emptyCard) {
    cardBody = cardBodyTemplate;
    card.style.visibility = "hidden";
  }

  return card;
}

export { getDataAndCreateCards };
