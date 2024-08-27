import {
  BASE_URL,
  UNKNOWN_ERROR,
  INVALID_USER_ID_ERROR,
  FETCH_DECKS_ERROR,
  CREATE_DECK_ERROR,
  INVALID_DECK_ID_ERROR,
  DECK_NOT_FOUND_ERROR,
  UPDATE_DECK_ERROR,
  DELETE_DECK_ERROR,
} from "../utils/constants.js";

// Get all decks
export const fetchDecks = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/decks`, {
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
        throw new Error(FETCH_DECKS_ERROR);
      default:
        throw new Error(UNKNOWN_ERROR);
    }
  }
  const json = await response.json();
  return json.data;
};

// Create deck
export const createDeck = async (deckName, description, userId) => {
  const response = await fetch(`${BASE_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: deckName,
      description: description,
      userId,
    }),
  });
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(INVALID_USER_ID_ERROR);
      case 500:
        throw new Error(CREATE_DECK_ERROR);
      default:
        throw new Error(UNKNOWN_ERROR);
    }
  }
  return response.json();
};

// Update deck
export const updateDeck = async (id, name, description) => {
  const response = await fetch(`${BASE_URL}/decks/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description }),
  });
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(INVALID_DECK_ID_ERROR);
      case 404:
        throw new Error(DECK_NOT_FOUND_ERROR);
      case 500:
        throw new Error(UPDATE_DECK_ERROR);
      default:
        throw new Error(UNKNOWN_ERROR);
    }
  }
  return await response.json();
};

// Delete deck
export const deleteDeck = async (id) => {
  const response = await fetch(`${BASE_URL}/decks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    switch (response.status) {
      case 400:
        throw new Error(INVALID_DECK_ID_ERROR);
      case 500:
        throw new Error(DELETE_DECK_ERROR);
      default:
        throw new Error(UNKNOWN_ERROR);
    }
  }
};
