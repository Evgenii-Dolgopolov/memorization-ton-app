import React, { useState } from "react";

type ReusableFormProps = {
  endpoint: string;
  fetchData: () => Promise<void>;
  fields: { id: string; label: string; type: "text" | "textarea"; maxLength: number }[];
  buttonText: string;
  initialValues: { [key: string]: string };
};

const ReusableForm: React.FC<ReusableFormProps> = ({
  endpoint,
  fetchData,
  fields,
  buttonText,
  initialValues,
}) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormValues((prevValues) => ({ ...prevValues, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log(`${buttonText} successful:`, data);
      await fetchData();
    } catch (error) {
      console.error(`Error ${buttonText.toLowerCase()}:`, error);
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
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-gray-700"
            >
              {field.label}
            </label>
            {field.type === "text" ? (
              <input
                type="text"
                id={field.id}
                value={formValues[field.id] || ""}
                onChange={handleChange}
                maxLength={field.maxLength}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            ) : (
              <textarea
                id={field.id}
                value={formValues[field.id] || ""}
                onChange={handleChange}
                maxLength={field.maxLength}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className="mt-4 flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {isLoading ? `${buttonText}...` : buttonText}
        </button>
      </form>
    </div>
  );
};

export default ReusableForm;