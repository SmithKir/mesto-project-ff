export function openPopup(form) {
  form.classList.add('popup_is-animated')
  const closeButton = form.querySelector('.popup__close');
  form.classList.add('popup_is-opened');
  closeButton.addEventListener('click', () => {
    closePopup(form);
  });
  
}

export function closePopup(form) {
  document.removeEventListener('keydown', closeClickBackground);
  document.removeEventListener('click', closeKeyEscape);
  form.classList.remove('popup_is-opened');
  resetPopup(form);
}

export function resetPopup(form) {
  if (form.querySelector('.popup__form')) {
    form.querySelector('.popup__form').reset();
  }
}

export const closeClickBackground = (form) => {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(form);
    }
  });
}

export const closeKeyEscape = (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}

export const closeKeyEscapeAdd = (form) => {
  document.addEventListener('keydown', closeKeyEscape);
}