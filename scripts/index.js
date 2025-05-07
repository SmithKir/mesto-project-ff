const placesList = document.querySelector('.places__list');

function createCard(dataCard, deleteCard) {
    
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__title').textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;

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