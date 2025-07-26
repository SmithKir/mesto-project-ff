const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: 'baf2e86d-8a0c-4d94-956b-24917589976e',
    'Content-Type': 'application/json'
  }
};

const getResponseData = (res) => {
  return res.ok 
    ? res.json()
    : Promise.reject(`Ошибка: ${res.status}`);
};

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(getResponseData);
};

export const renderCard = ({name, link}) => {
  return fetch(`${config.baseUrl}/cards` , {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then(getResponseData)
};

export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(getResponseData);
};

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
  .then(getResponseData)
};

export const setUserInfo = ({name, about}) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    })
  })
  .then(getResponseData)
};

export const setUserAvatar = ({avatar}) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar
    })
  })
  .then(getResponseData)
};

export const changeLikeCardStatus = (cardId, like) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: like 
      ? "PUT"
      : "DELETE",
    headers: config.headers
  })
  .then((res) => getResponseData(res))
};