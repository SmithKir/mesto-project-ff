import './pages/index.css';
import {initialCards} from './components/cards.js';
import createCard from './components/card.js';
import {deleteCard} from './components/card.js';
import {likeCard} from './components/card.js';
import {openPopup} from './components/modal.js';
import {closePopup} from './components/modal.js';
import {resetPopup}  from './components/modal.js';
import {closeClickBackground} from './components/modal.js';
import {closeKeyEscape} from './components/modal.js';
import {closeKeyEscapeAdd} from './components/modal.js';

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




function zoomCard(link, name) {
  imagePopupImg.src = link;
  imagePopupImg.alt = name;
  imagePopupCaption.textContent = name;
  openPopup(popupImage);
  closeKeyEscape(popupImage);
  closeClickBackground(popupImage);
}

initialCards.forEach( (dataCard) => {
  const addCard = createCard(dataCard, deleteCard, likeCard, zoomCard);
  placesList.append(addCard);
})

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  closeClickBackground(popupEdit);
  closeKeyEscapeAdd(popupAddCard);
  nameInputEdit.value = profileName.textContent;
  descriptionInputEdit.value = profileDescription.textContent;
  
})

addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  closeClickBackground(popupAddCard);
  closeKeyEscapeAdd(popupAddCard);
})

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


