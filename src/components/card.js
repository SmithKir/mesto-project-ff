import {changeLikeCardStatus} from "./api";
import { removeCard } from "./api";

export function likeCard(cardId, likeButton, likesCounter) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  changeLikeCardStatus(cardId, !isLiked)
    .then((dataCard) => {
      likeButton.classList.toggle('card__like-button_is-active');
      likesCounter.textContent = dataCard.likes.length;
    })
    .catch((err) => {
      console.log(`Ошибка изменения статуса лайка: ${err}`)
    })
}

export function deleteCard(cardId, cardElement) {
  removeCard(cardId, cardElement) 
    .then(() => {
    cardElement.remove()
    })
    .catch((err) => {
      console.log(`Не удалось удалить карточку: ${err}`);
    })
  }

export function createCard(dataCard, { onDeleteCard, onLikeIcon, onPreviewPicture }, userId) {
    
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesCounter = cardElement.querySelector('.likes-counter');
  const zoomImg = cardElement.querySelector('.card__image');
  
  cardElement.querySelector('.card__title').textContent = dataCard.name;
  cardImage.src = dataCard.link;
  cardImage.alt = dataCard.name;

  const isLiked = dataCard.likes.some((like) => like._id === userId);
  
  if (isLiked) 
    likeButton.classList.add('card__like-button_is-active');
    likesCounter.textContent = dataCard.likes.length;

  if (dataCard.owner._id === userId && onDeleteCard) {
    deleteButton.addEventListener('click', () => {
      onDeleteCard(dataCard._id, cardElement);
    })
  } else {
    deleteButton.remove();
  }

  if (onLikeIcon) {
    likeButton.addEventListener('click', () => 
      onLikeIcon(dataCard._id, likeButton, likesCounter)
    );
    
  }

  if (onPreviewPicture) {
    zoomImg.addEventListener('click', () => {
      onPreviewPicture(dataCard.link, dataCard.name);
    })
  }

  return cardElement;
}

