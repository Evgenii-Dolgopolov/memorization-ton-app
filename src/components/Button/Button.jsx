import { Link } from "react-router-dom";

function Button({ className, ...attrs }) {
  const Tag = attrs.to ? Link : "button";

  return <Tag {...attrs} className={`${className}`}></Tag>;
}

export default Button;
