const placesList = document.querySelector('.places__list');

function createCard(dataCard, deleteCard) {
    
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__title').textContent = dataCard.name;
  cardElement.querySelector('.card__image').src = dataCard.link;
  cardElement.setAttribute('.card__image').alt = dataCard.name;

  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

function deleteCard(cards) {
    cards.remove();
  }

initialCards.forEach( (dataCard) => {
  const addCard = createCard(dataCard, deleteCard);
  placesList.append(addCard);
});