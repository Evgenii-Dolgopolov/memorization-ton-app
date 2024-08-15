import { Button, Input } from "../componentsImport.js";

function CardForm({
  buttonName,
  question,
  handleQuestionChange,
  answer,
  handleAnswerChange,
  handleSubmit,
  error,
}) {
  return (
    <form
      className="flex flex-col items-center justify-center w-full min-h-36 bg-blue-200
      rounded-md shadow-md p-4 gap-4"
    >
      {error && <p className="text-red-500">{error}</p>}
      <Input
        id="question"
        name="question"
        label="Question"
        value={question}
        handleChange={handleQuestionChange}
        maxLength={100}
        type="text"
      />
      <Input
        id="answer"
        name="answer"
        label="Answer"
        value={answer}
        handleChange={handleAnswerChange}
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

export default CardForm;
