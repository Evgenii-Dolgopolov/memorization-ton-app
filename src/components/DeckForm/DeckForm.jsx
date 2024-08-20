import { Button, Input } from "../componentsImport.js";

function DeckForm({
  buttonName,
  handleSubmit,
  handleNameDeckChange,
  deckName,
  description,
  handleDeckDescriptionChange,
  error,
}) {
  return (
    <form
      className="flex flex-col items-center justify-center w-full min-h-36 bg-yellow-200
      rounded-md shadow-md p-4 gap-4"
      onSubmit={handleSubmit}
    >
      {error && <p className="text-red-500">{error}</p>}
      <Input
        id="deck-name"
        name="deckName"
        label="Deck Name"
        value={deckName}
        handleChange={handleNameDeckChange}
        maxLength={100}
        type="text"
        // required={true}
      />
      <Input
        id="deck-description"
        name="deckDescription"
        label="Description"
        value={description}
        handleChange={handleDeckDescriptionChange}
        maxLength={300}
        type="text"
        // required={true}
        textarea
      />
      <Button
        className="mt-4 w-full flex items-center justify-center px-4 py-2 border
        border-transparent text-sm font-medium rounded-md shadow-sm text-white
        bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2
        focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
      >
        {buttonName}
      </Button>
    </form>
  );
}

export default DeckForm;
