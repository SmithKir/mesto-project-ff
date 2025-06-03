export default function createCard(dataCard, deleteCard, likeCard, zoomCard) {
    
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__title').textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;

  const deleteButton = cardElement.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.addEventListener('click', likeCard);

  const zoomImg = cardElement.querySelector('.card__image');
  zoomImg.addEventListener('click', () => zoomCard(dataCard.link, dataCard.name));

  return cardElement;
}

export function deleteCard(cards) {
    cards.remove();
  }

export function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}