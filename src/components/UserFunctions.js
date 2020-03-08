import axios from "axios";
import qs from "qs";

export const register = newUser => {
  return axios
    .post(
      "users/register",
      {
        username: newUser.username,
        email: newUser.email,
        name: newUser.name,
        password: newUser.password
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      }
    )
    .then(response => {
      console.log(`Registered ${response.data}`);
    })
    .catch(error => console.log(error));
};

export const login = user => {
  const data = {
    email: user.email,
    password: user.password
  };

  const payload = qs.stringify(data);
  return axios
    .post("users/login", payload, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(response => {
      localStorage.setItem("usertoken", response.data.token);

      return {
        data: response.data,
        code: "success"
      };
    })
    .catch(error => {
      return {
        msg: `invalid username and password ${error}`,
        code: "failed"
      };
    });
};

export const getUser = id => {
  return axios
    .get(`users/getuser/${id}`, {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    })
    .then(response => response)
    .catch(error => error);
};
