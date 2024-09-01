import { Link } from "react-router-dom";

function Template({ className, heading, description, children, ...attrs }) {
  const Tag = attrs.to ? Link : "div";
  return (
    <Tag
      className={`${className} flex flex-col items-center justify-center w-full min-h-36
      rounded-md shadow-md p-4 gap-4`}
      {...attrs}
    >
      <h2 className="font-bold text-lg px-4">{heading}</h2>
      <p className="text-sm text-center px-4 max-w-full lg:max-w-md">
        {description}
      </p>
      {children}
    </Tag>
  );
}

export default Template;
