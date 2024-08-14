import { Button, Input } from "../componentsImport.js";

function DeckForm({
  buttonName,
  handleSubmit,
  handleNameDeckChange,
  deckName,
  description,
  handleDeckDescriptionChange,
}) {
  return (
    <form>
      <Input
        id="deck-name"
        name="deckName"
        label="Deck Name"
        value={deckName}
        handleChange={handleNameDeckChange}
        maxLength={100}
        type="text"
      />
      <Input
        id="deck-description"
        name="deckDescription"
        label="Description"
        value={description}
        handleChange={handleDeckDescriptionChange}
        maxLength={300}
        type="text"
        textarea
      />
      <Button
        className="mt-4 w-full flex items-center justify-center px-4 py-2 border
        border-transparent text-sm font-medium rounded-md shadow-sm text-white
        bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
        onClick={handleSubmit}
      >
        {buttonName}
      </Button>
    </form>
  );
}

export default DeckForm;
