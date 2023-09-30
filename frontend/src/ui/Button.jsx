import { Link } from "react-router-dom";

const Button = ({ onClick, children, to }) => {
  if (to) {
    return (
      <Link to={to}>
        <button
          className="font-semibold text-gray-400 hover:text-white"
          onClick={onClick}
        >
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button
      className="font-semibold text-gray-400 hover:text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
