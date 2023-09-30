import { useNavigate } from "react-router-dom";
import useUser from "../../hooks/useUser";
import ColorButtons from "../../ui/ColorButtons";
import { useEffect, useState } from "react";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Profile = () => {
  const {
    updateUser,
    state: { userInfo },
  } = useUser();

  const [{ name, email, password, confirmPassword }, setFormData] = useState(
    userInfo || initialState,
  );

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
    updateUser({ name, email, password, confirmPassword });
    setFormData({ ...initialState, ...userInfo });
  };

  return (
    <div className="max-w-2xl rounded-md border-[1px] border-gray-400 p-12">
      <h2 className="mb-6 flex flex-col items-start justify-start text-4xl font-bold">
        Update Profile
      </h2>
      <form onSubmit={handleSubmit}>
        <label className="text-gray-900" htmlFor="name">
          Name
        </label>
        <input
          className="my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1"
          id="name"
          name="name"
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={handleChange}
        />
        <label className="text-gray-900" htmlFor="email">
          Email Address
        </label>
        <input
          className="my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1"
          id="email"
          name="email"
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={handleChange}
        />
        <label className="text-gray-900" htmlFor="password">
          Password
        </label>
        <input
          className="my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1"
          id="password"
          name="password"
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={handleChange}
        />
        <label className="text-gray-900" htmlFor="email">
          Confirm Password
        </label>
        <input
          className="my-1 mb-4 w-full rounded-md border-[1px] px-2 py-1"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleChange}
        />
        <ColorButtons bgColor="bg-blue-600">Update</ColorButtons>
      </form>
    </div>
  );
};
export default Profile;
