import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
  isLoading: false,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case "register":
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case "login":
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case "logout":
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case "get":
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case "update":
      return {
        ...state,
        userInfo: action.payload,
        isLoading: false,
      };
    case "apiCall":
      return {
        ...state,
        isLoading: true,
      };
    default:
      throw new Error("Unknown action type");
  }
};

export const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
  }, [state]);

  const registerUser = async (formData) => {
    try {
      dispatch({ type: "apiCall" });
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch({ type: "register", payload: data.data });
        toast.success(data.message);
        navigate("/profile");
      } else if (data.status === "failed") {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loginUser = async (formData) => {
    try {
      dispatch({ type: "apiCall" });
      const res = await fetch("/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch({ type: "login", payload: data.data });
        toast.success(data.message);
        navigate("/profile");
      } else if (data.status === "failed") {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      dispatch({ type: "apiCall" });
      const res = await fetch("/api/users/profile");
      const data = await res.json();
      if (data.status === "success") {
        dispatch({ type: "get", payload: data.data });
        toast.success(data.message);
      } else if (data.status === "failed") {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (formData) => {
    try {
      dispatch({ type: "apiCall" });
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch({ type: "update", payload: data.data });
        toast.success(data.message);
      } else if (data.status === "failed") {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logoutUser = async () => {
    try {
      const res = await fetch("/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (data.status === "success") {
        dispatch({ type: "logout", payload: data.data });
        toast.success(data.message);
        navigate("/");
      } else if (data.status === "failed") {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        state,
        registerUser,
        loginUser,
        getUser,
        updateUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
