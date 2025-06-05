import './pages/index.css';
import {initialCards} from './components/cards.js';
import createCard from './components/card.js';
import {deleteCard} from './components/card.js';
import {likeCard} from './components/card.js';
import {openPopup} from './components/modal.js';
import {closePopup} from './components/modal.js';

const placesList = document.querySelector('.places__list');

const profile = document.querySelector('.profile');
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const formEdit = popupEdit.querySelector('.popup__form');
const formAdd = popupAddCard.querySelector('.popup__form');

const nameInputEdit = formEdit.querySelector('.popup__input_type_name');
const descriptionInputEdit = formEdit.querySelector('.popup__input_type_description');

const inputPlace = popupAddCard.querySelector('.popup__input_type_card-name');
const inputUrl = popupAddCard.querySelector('.popup__input_type_url');

const imagePopupImg = popupImage.querySelector('.popup__image');
const imagePopupCaption = popupImage.querySelector('.popup__caption');

const popups= document.querySelectorAll('.popup');

popups.forEach((element) => {
  element.querySelector('.popup__close').addEventListener('click', () => {
    closePopup(element);
  });

  element.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(element);
    }
  });
})

function zoomCard(link, name) {
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupCaption.textContent = name;
  openPopup(popupImage);
}

initialCards.forEach((dataCard) => {
  const addCard = createCard(dataCard, deleteCard, likeCard, zoomCard);
  placesList.append(addCard);
})

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInputEdit.value = profileName.textContent;
  descriptionInputEdit.value = profileDescription.textContent;
})

addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  resetPopup(popupAddCard)
})

function resetPopup(form) {
  if (form.querySelector('.popup__form')) {
    form.querySelector('.popup__form').reset();
  }
}

function handleFormEditSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInputEdit.value;
  profileDescription.textContent = descriptionInputEdit.value;
  closePopup(popupEdit);
}

function handleFormAddSubmit(evt) {
  evt.preventDefault();
  renderCard({name: inputPlace.value, link: inputUrl.value});
  closePopup(popupAddCard);
}

function renderCard(dataCard) {
  placesList.prepend(createCard(dataCard));
}

formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);




