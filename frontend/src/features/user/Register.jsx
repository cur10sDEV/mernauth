import ColorButtons from "../../ui/ColorButtons";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useUser from "../../hooks/useUser";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [{ name, email, password, confirmPassword }, setFormData] =
    useState(initialState);

  const {
    registerUser,
    state: { userInfo },
  } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo !== null) {
      navigate("/profile");
    }
  }, [navigate, userInfo]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ name, email, password, confirmPassword });
  };

  return (
    <div className="max-w-2xl rounded-md border-[1px] border-gray-400 p-12">
      <h2 className="mb-6 flex flex-col items-start justify-start text-4xl font-bold">
        Register
      </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          className="my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1"
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />
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
        <label htmlFor="password">Password</label>
        <input
          className="my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1"
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
        />
        <label htmlFor="email">Confirm Password</label>
        <input
          className="my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleChange}
        />
        <ColorButtons bgColor="bg-blue-600">Register</ColorButtons>
      </form>
      <p className="mt-4">
        Already have an account?{" "}
        <Link to="/login">
          <span className="ml-1 text-blue-600 underline">Login</span>
        </Link>
      </p>
    </div>
  );
};
export default Register;
