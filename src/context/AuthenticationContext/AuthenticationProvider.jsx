import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext();

export const AuthenticationProvider = ({ children }) => {
  const [isUserLoggedIn, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loginDetails = JSON.parse(localStorage?.getItem("session"));
    loginDetails?.login && setLogin(true);
    loginDetails?.username && setUsername(loginDetails.username);
    loginDetails?.userId && setUserId(loginDetails.userId);
  }, []);

  const loginUser = async ({ username, password, from }) => {
    try {
      const {
        data: {
          response: { firstname, userId }
        },
        status
      } = await axios({
        method: "POST",
        url: "https://uandistoreapi.herokuapp.com/users/authenticate",
        headers: { username: username, password: password }
      });

      if (status === 200) {
        localStorage?.setItem(
          "session",
          JSON.stringify({ login: true, username: firstname, userId: userId })
        );

        setUsername(firstname);
        setUserId(userId);
        setLogin(true);
        navigate(from);
      }
    } catch (error) {
      return error.response;
    }
  };

  const signUpNewUser = async ({ username, password, firstname, lastname }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: "https://uandistoreapi.herokuapp.com/users",
        data: {
          firstname: firstname,
          lastname: lastname,
          username: username,
          password: password
        }
      });

      if (status === 201) {
        localStorage?.setItem(
          "session",
          JSON.stringify({
            login: true,
            username: data.response.firstname,
            userId: data.response.userId
          })
        );

        setUsername(data.response.firstname);
        setUserId(userId);
        setLogin(true);
        return { status };
      }
    } catch (error) {
      return error.response;
    }
  };

  const updateUserDetails = async ({ username, ...body }) => {
    try {
      const { data, status } = await axios({
        method: "POST",
        url: `https://uandistoreapi.herokuapp.com/users/${username}`,
        data: {
          ...body
        }
      });

      if (status === 200) {
        localStorage?.setItem(
          "session",
          JSON.stringify({
            login: true,
            username: data.response.firstname,
            userId: data.response.userId
          })
        );

        setUsername(data.response.firstname);
        setUserId(userId);
        setLogin(true);
        return { status };
      }
    } catch (error) {
      return error.response;
    }
  };

  const logOutUser = () => {
    localStorage?.removeItem("session");
    setUsername("");
    setUserId("");
    setLogin(false);
  };
  return (
    <AuthenticationContext.Provider
      value={{
        isUserLoggedIn,
        loginUser,
        username,
        logOutUser,
        signUpNewUser,
        updateUserDetails,
        userId
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);
