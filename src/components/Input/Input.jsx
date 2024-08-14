function Input({
  id,
  name,
  label,
  value,
  handleChange,
  maxLength,
  type,
  // required,
  textarea,
}) {
  const CustomTag = textarea ? `textarea` : `input`;
  return (
    <label
      className="block w-full text-sm font-medium text-gray-700"
      htmlFor={id}
    >
      {label}
      <CustomTag
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm resize-none"
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        type={type}
        // TODO: разобраться с required
        // required={required}
      />
    </label>
  );
}

export default Input;
