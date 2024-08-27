import {
  BASE_URL,
  CARD_NOT_FOUND_ERROR,
  CREATE_CARD_ERROR,
  DELETE_CARD_ERROR,
  FETCH_CARDS_ERROR,
  INVALID_CARD_ID_ERROR,
  INVALID_DECK_ID_ERROR,
  INVALID_USER_ID_ERROR,
  UNKNOWN_ERROR,
  UPDATE_CARD_ERROR,
} from "../utils/constants.js";

// Get all cards
export const fetchCards = async (deckId) => {
  const response = await fetch(`${BASE_URL}/decks/${deckId}/cards`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(INVALID_USER_ID_ERROR);
      case 500:
        throw new Error(FETCH_CARDS_ERROR);
      default:
        throw new Error(UNKNOWN_ERROR);
    }
  }
  const json = await response.json();
  return json.data;
};

// Create card
export const createCard = async (question, answer, deckId) => {
  const response = await fetch(`${BASE_URL}/cards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      deckId,
      question,
      answer,
    }),
  });
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(INVALID_DECK_ID_ERROR);
      case 500:
        throw new Error(CREATE_CARD_ERROR);
      default:
        throw new Error(UNKNOWN_ERROR);
    }
  }
  return response.json();
};

// Update card
export const updateCard = async (id, question, answer) => {
  const response = await fetch(`${BASE_URL}/cards/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question: question,
      answer: answer,
    }),
  });
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(INVALID_CARD_ID_ERROR);
      case 404:
        throw new Error(CARD_NOT_FOUND_ERROR);
      case 500:
        throw new Error(UPDATE_CARD_ERROR);
      default:
        throw new Error(UNKNOWN_ERROR);
    }
  }
  return await response.json();
};

// Delete card
export const deleteCard = async (id) => {
  const response = await fetch(`${BASE_URL}/cards/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(INVALID_CARD_ID_ERROR);
      case 500:
        throw new Error(DELETE_CARD_ERROR);
      default:
        throw new Error(UNKNOWN_ERROR);
    }
  }
};
