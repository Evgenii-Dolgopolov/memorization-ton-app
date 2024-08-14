function Button({ className, buttonName, type, handleClick }) {
  return (
    <button className={`${className}`} type={type} onClick={handleClick}>
      {buttonName}
    </button>
  );
}

export default Button;
