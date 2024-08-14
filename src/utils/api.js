import { BASE_URL, UNKNOWN_ERROR } from "./constants.js";

// Get all decks
export const fetchDecks = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/users/${userId}/decks`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(UNKNOWN_ERROR);
    }
  }
};

// Create deck
export const createDeck = async (deckName, description, userId) => {
  try {
    const response = await fetch(`${BASE_URL}/decks`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: deckName,
        description,
        userId,
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(UNKNOWN_ERROR);
    }
  }
};

// Update deck
export const updateDeck = async (id, name, description) => {
  try {
    const response = await fetch(`${BASE_URL}/decks/${id}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, description }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(UNKNOWN_ERROR);
    }
  }
};

// Delete deck
export const deleteDeck = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/decks/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error(UNKNOWN_ERROR);
    }
  }
};
