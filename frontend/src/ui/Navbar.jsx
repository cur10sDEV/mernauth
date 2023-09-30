import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faRightFromBracket,
  faUserPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

const Navbar = () => {
  const {
    logoutUser,
    state: { userInfo },
  } = useUser();

  return (
    <nav className="mb-24 flex w-screen items-center justify-between bg-gray-900 px-48 py-4">
      <Link to="/">
        <h1 className="text-2xl font-bold tracking-wider text-white">
          MERN Auth
        </h1>
      </Link>
      <div className="auth-buttons space-x-4">
        {userInfo === null ? (
          <>
            <Button to="/login">
              <span className="mr-2">
                <FontAwesomeIcon icon={faRightToBracket} />
              </span>
              Sign In
            </Button>
            <Button to="/register">
              <span className="mr-1">
                <FontAwesomeIcon icon={faUserPlus} />
              </span>
              Sign Up
            </Button>
          </>
        ) : (
          <div className="space-x-4">
            <Button to="/profile">
              <span className="mr-2">
                <FontAwesomeIcon icon={faUser} />
              </span>
              {userInfo.name}
            </Button>
            <Button onClick={logoutUser}>
              <span className="mr-2">
                <FontAwesomeIcon icon={faRightFromBracket} />
              </span>
              Logout
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
