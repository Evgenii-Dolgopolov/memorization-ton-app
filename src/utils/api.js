import { BASE_URL, UNKNOWN_ERROR } from "./constants.js";

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
