import { useEffect, useState } from "react";
import ColorButtons from "../../ui/ColorButtons";
import { Link, useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const [{ email, password }, setFormData] = useState(initialState);

  const {
    loginUser,
    state: { userInfo },
  } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo !== null) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({ email, password });
  };

  return (
    <div className="max-w-2xl rounded-md border-[1px] border-gray-400 p-12">
      <h2 className="mb-6 flex flex-col items-start justify-start text-4xl font-bold">
        Sign In
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input
          className="my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1"
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        />
        <label htmlFor="email">Password</label>
        <input
          className="my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1"
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
        />
        <ColorButtons bgColor="bg-blue-600">Sign In</ColorButtons>
      </form>
      <p className="mt-4">
        New Customer?{" "}
        <Link to="/register">
          <span className="ml-1 text-blue-600 underline">Register</span>
        </Link>
      </p>
    </div>
  );
};
export default Login;
