import { useState } from "react";
import { Button, Input } from "../componentsImport.js";

function CreateCardForm({ id, question, answer, fetchCards }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newQuestion, setNewQuestion] = useState(question);
  const [newAnswer, setNewAnswer] = useState(answer);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSaveClick = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8080/cards/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: newQuestion,
          answer: newAnswer,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      await fetchCards();
    } catch (error) {
      console.error("Error updating card:", error);
      setError(error.message || "An unknown error occurred");
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };

  return (
    <form onSubmit={handleSaveClick} className="flex flex-col gap-4 w-full">
      <Input
        id="question"
        name="question"
        label="Question"
        value={newQuestion}
        handleChange={(e) => setNewQuestion(e.target.value)}
        maxLength={100}
        type="text"
      />
      <Input
        id="answer"
        name="answer"
        label="Answer"
        value={newAnswer}
        handleChange={(e) => setNewAnswer(e.target.value)}
        maxLength={300}
        type="text"
        textarea
      />
      <Button
        className="mt-4 flex items-center justify-center px-4 py-2 border border-transparent
        text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
        // handleClick=
      >
        {isLoading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}

export default CreateCardForm;
