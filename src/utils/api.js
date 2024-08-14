import {
  BASE_URL,
  UNKNOWN_ERROR,
  INVALID_USER_ID_ERROR,
  FETCH_DECKS_ERROR,
  CREATE_DECK_ERROR,
} from "./constants.js";

// Get all decks
// export const fetchDecks = async (userId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/users/${userId}/decks`, {
//       method: "GET",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     if (!response.ok) {
//       debugger;
//       throw new Error(`Error: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error(UNKNOWN_ERROR);
//     }
//   }
// };

export const fetchDecks = async (userId) => {
  const response = await fetch(`${BASE_URL}/users/${userId}/decks`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    if (response.status === 400) {
      throw new Error(INVALID_USER_ID_ERROR);
    }
    if (response.status === 500) {
      throw new Error(FETCH_DECKS_ERROR);
    } else {
      throw new Error(UNKNOWN_ERROR);
    }
  }
  return await response.json();
};

// Create deck
// export const createDeck = async (deckName, description, userId) => {
//   try {
//     const response = await fetch(`${BASE_URL}/decks`, {
//       method: "POST",
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name: deckName,
//         description,
//         userId,
//       }),
//     });
//
//     if (!response.ok) {
//       throw new Error(`Error: ${response.status}`);
//     }
//
//     return await response.json();
//   } catch (error) {
//     if (error instanceof Error) {
//       throw new Error(error.message);
//     } else {
//       throw new Error(UNKNOWN_ERROR);
//     }
//   }
// };
export const createDeck = async (deckName, description, userId) => {
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
    if (response.status === 400 || 500) {
      throw new Error(CREATE_DECK_ERROR);
      // }
      // if (response.status === 500) {
      //   throw new Error(CREATE_DECK_ERROR);
    } else {
      throw new Error(UNKNOWN_ERROR);
    }
  }
  return await response.json();
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
