import { Link } from "react-router-dom";

const ColorButtons = ({ onClick, children, bgColor, to }) => {
  if (to) {
    return (
      <Link to={to}>
        <button
          className={`text-l rounded-md p-2 px-4 font-semibold text-white hover:shadow-md ${bgColor}`}
          onClick={onClick}
        >
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      className={`text-l rounded-md p-2 px-4 font-semibold text-white hover:shadow-md ${bgColor}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default ColorButtons;
