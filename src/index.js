import './pages/index.css';
import {createCard} from './components/card.js';
import {deleteCard} from './components/card.js';
import {likeCard} from './components/card.js';
import {openPopup} from './components/modal.js';
import {closePopup} from './components/modal.js';
import {enableValidation} from './components/validation.js';
import {clearValidation} from './components/validation.js';
import {getInitialCards} from './components/api.js';
import {getUserInfo} from './components/api.js';
import {renderCard} from './components/api.js';
import {setUserInfo} from './components/api.js';
import {setUserAvatar} from './components/api.js';

const placesList = document.querySelector('.places__list');

const profile = document.querySelector('.profile');
const editAvatar = document.querySelector('.profile__image')
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');

const popupEditAvatar = document.querySelector('.popup_type_new-avatar');
const popupEdit = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');

const formEditAvatar = popupEditAvatar.querySelector('.popup__form'); 
const formEdit = popupEdit.querySelector('.popup__form');
const formAdd = popupAddCard.querySelector('.popup__form');

const avatarInputEdit = formEditAvatar.querySelector('.popup__input_type_avatar_url');

const nameInputEdit = formEdit.querySelector('.popup__input_type_name');
const descriptionInputEdit = formEdit.querySelector('.popup__input_type_description');

const inputPlace = popupAddCard.querySelector('.popup__input_type_card-name');
const inputUrl = popupAddCard.querySelector('.popup__input_type_url');

const imagePopupImg = popupImage.querySelector('.popup__image');
const imagePopupCaption = popupImage.querySelector('.popup__caption');

const popups = document.querySelectorAll('.popup');

const editAvatarSubmitButton = formEditAvatar.querySelector('.popup__button');
const editSubmitButton = formEdit.querySelector('.popup__button');
const addSubmitButton = formAdd.querySelector('.popup__button');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};

const defaultSubmitButtonText = 'Сохранить';
const updateSubmitButtonText  = 'Сохранение...';

let userId = null;

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

 enableValidation(validationConfig);

editAvatar.addEventListener('click', () => {
  openPopup(popupEditAvatar);
  resetPopup(popupEditAvatar);
  clearValidation(formEditAvatar, validationConfig);
})

editButton.addEventListener('click', () => {
  openPopup(popupEdit);
  nameInputEdit.value = profileName.textContent;
  descriptionInputEdit.value = profileDescription.textContent;
  clearValidation(formEdit, validationConfig);
})

addButton.addEventListener('click', () => {
  openPopup(popupAddCard);
  resetPopup(popupAddCard);
  clearValidation(formAdd, validationConfig);
})

function resetPopup(form) {
  if (form.querySelector('.popup__form')) {
    form.querySelector('.popup__form').reset();
  }
}

const setLoadingState = (button, isLoading, buttonText, loadingText) => {
  if (isLoading) {
    button.textContent = loadingText;
    button.disabled = true;
  } else {
    button.textContent = buttonText;
    button.disabled = false;
  }
}

function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();

  setLoadingState(editAvatarSubmitButton, true, defaultSubmitButtonText, updateSubmitButtonText);

  setUserAvatar({avatar: avatarInputEdit.value}) 
    .then((res) => {
      editAvatar.style.backgroundImage = `url(${res.avatar})`;
      closePopup(popupEditAvatar);
    })
    .catch((err) => {
      console.log(`Не удалось обновить аватар: ${err}`);
    })
    .finally(() => {
      setLoadingState(editAvatarSubmitButton, false, defaultSubmitButtonText, updateSubmitButtonText);
    })
};

function handleFormEditSubmit(evt) {
  evt.preventDefault();

  setLoadingState(editSubmitButton, true, defaultSubmitButtonText, updateSubmitButtonText);

  setUserInfo({name: nameInputEdit.value, about: descriptionInputEdit.value})
    .then((res) => {
      profileName.textContent = res.name;  
      profileDescription.textContent = res.about;
      closePopup(popupEdit);
    })
    .catch((err) => {
      console.log(`Не удалось обновить данные профиля: ${err}`);
    }) 
    .finally(() => {
      setLoadingState(editSubmitButton, false, defaultSubmitButtonText, updateSubmitButtonText);
    })
};

function handleFormAddSubmit(evt) {
  evt.preventDefault();

  setLoadingState(addSubmitButton, true, defaultSubmitButtonText, updateSubmitButtonText);

  renderCard({name: inputPlace.value, link: inputUrl.value})
    .then((dataCard) => {
      const addCard = createCard(
        dataCard, 
        {
          onDeleteCard: deleteCard,
          onLikeIcon: likeCard, 
          onPreviewPicture: zoomCard,
        }, 
        userId
      );
      placesList.prepend(addCard);
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log(`Не удалось создать новую карточку: ${err}`);
    })
    .finally(() => {
      setLoadingState(addSubmitButton, false, defaultSubmitButtonText, updateSubmitButtonText);
    })
};

formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit);
formEdit.addEventListener('submit', handleFormEditSubmit);
formAdd.addEventListener('submit', handleFormAddSubmit);

Promise.all([getInitialCards(), getUserInfo()])
  .then(([cards, user]) => {
    userId = user._id;
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    editAvatar.style.backgroundImage = `url(${user.avatar})`;
    cards.forEach((dataCard) => {
      const addCards = createCard(
        dataCard, 
        {
          onDeleteCard: deleteCard,
          onLikeIcon: likeCard, 
          onPreviewPicture: zoomCard,
        }, 
        userId
        
      );
      placesList.append(addCards);
      
    });
  })
  .catch((err) => {
    console.log(`Ошибка при загрузке: ${err}`);
  })


 
 