import React, { useState } from "react";

type ReusableFormProps = {
  actionType: "createDeck" | "createCard";
  fetchData: () => Promise<void>;
  closeForm: () => void;
};

const ReusableForm: React.FC<ReusableFormProps> = ({ actionType, fetchData, closeForm }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint =
        actionType === "createDeck"
          ? "http://localhost:8080/decks"
          : "http://localhost:8080/cards";
      const method

 = actionType === "createDeck" ? "POST" : "POST";
      const body = JSON.stringify({ name, description });

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      await fetchData();
      closeForm();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-36 bg-yellow-200 rounded-md shadow-md p-4 gap-4">
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            {actionType === "createDeck" ? "Deck Name" : "Question"}
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={100}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        {actionType === "createDeck" && (
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              maxLength={300}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
            />
          </div>
        )}
        <button
          type="submit"
          className="mt-4 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading
            ? actionType === "createDeck"
              ? "Creating Deck..."
              : "Creating Card..."
            : actionType === "createDeck"
            ? "Create Deck"
            : "Create Card"}
        </button>
      </form>
    </div>
  );
};

export default ReusableForm;