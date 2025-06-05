export function openPopup(form) {
  form.classList.add('popup_is-opened');
  closeKeyEscapeAdd(form);
}

export function closePopup(form) {
  document.removeEventListener('keydown', closeKeyEscape);
  form.classList.remove('popup_is-opened');
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