import { Link } from "react-router-dom";

function Button({ className, buttonName, ...attrs }) {
  const Tag = attrs.to ? Link : "button";

  return (
    <Tag {...attrs} className={`${className}`}>
      {buttonName}
    </Tag>
  );
}

export default Button;
