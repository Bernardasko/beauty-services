import axios from "axios";

export const login = async (values) => {
  const response = await axios.post(
    "http://127.0.0.1:3000/api/v1/users/login",
    values
  );
  // console.log(response.data);
  localStorage.setItem("user", JSON.stringify(response.data));
};

export const signup = async (values) => {
  const response = await axios.post(
    "http://127.0.0.1:3000/api/v1/users/signup",
    values
  );
  // console.log(response.data);
  localStorage.setItem("user", JSON.stringify(response.data));
}
export const getLogedInUser = () => {
    const logedInUser = JSON.parse(localStorage.getItem("user"));
    if (!logedInUser) return null;
    return logedInUser;
};


export const authenticate = () => {
  const logedInUser = getLogedInUser();
  const token = logedInUser ? logedInUser.token : null;
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const logout = () => {
  localStorage.removeItem("user");
};