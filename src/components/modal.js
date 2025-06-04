export function openPopup(form) {
  form.classList.add('popup_is-opened');
  closeClickBackground(form);
  closeKeyEscapeAdd(form);
}

export function closePopup(form) {
  document.removeEventListener('keydown', closeClickBackground);
  document.removeEventListener('click', closeKeyEscape);
  form.classList.remove('popup_is-opened');
}

const closeClickBackground = (form) => {
  document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup')) {
      closePopup(form);
    }
  });
}

const closeKeyEscape = (evt) => {
  const openedPopup = document.querySelector('.popup_is-opened');
  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}
const closeKeyEscapeAdd = (form) => {
  document.addEventListener('keydown', closeKeyEscape);
}