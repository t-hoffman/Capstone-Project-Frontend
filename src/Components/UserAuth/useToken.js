import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const useToken = () => {
  const API_URL = process.env.REACT_APP_API_URL;

  const getToken = () => {
    const userToken = window.localStorage.getItem("token");
    return userToken;
  };

  const saveToken = (userToken) => {
    window.localStorage.setItem("token", userToken);
    setToken(userToken);
  };

  const deleteToken = async () => {
    if (!token) return false;

    const options = {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    };

    try {
      await fetch(`${API_URL}/logout`, options);
      setToken(null);
      setUserInfo(null);
      window.localStorage.removeItem("token");
    } catch (e) {
      console.error(e);
    }
  };

  const [token, setToken] = useState(getToken());
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const options = {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        };
        const user = await (await fetch(`${API_URL}/verify`, options)).json();

        if (user.msg === "Signature verification failed") return deleteToken();
        setUserInfo(user);
      } catch (err) {
        console.error("err", err);
        window.localStorage.removeItem("token");
        navigate("/");
      }
    };

    if (token) getUserInfo();
    // eslint-disable-next-line
  }, [token]);

  return {
    setToken: saveToken,
    deleteToken: deleteToken,
    userInfo: userInfo,
    setUserInfo: setUserInfo,
    navigate: navigate,
    token,
  };
};

export default useToken;
