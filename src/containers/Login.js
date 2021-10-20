import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setUser, setIdUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // requête axios
      const response = await axios.post(
        "https://gamepad-backend.herokuapp.com/user/login",
        {
          email: email,
          password: password,
        }
      );

      // "http://localhost:3000/user/login"
      // "https://gamepad-backend.herokuapp.com/user/login"

      // If we get the Token and the Id
      if (response.data.token) {
        // Save the Token and the Id in the state user
        console.log("userToken ===>", response.data.token);
        setUser(response.data.token, response.data.id);

        if (response.data.idUser) {
          setIdUser(response.data.idUser);
          console.log("idUser ==>", response.data.idUser);
        }

        // Redirect the user to the Homepage
        history.push("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <section className="login-container">
      <div className="login-col1">
        <div className="login-title">
          <h2>How it works</h2>
        </div>

        <div className="login-description">
          <div className="login-details1">
            <p>Icons 1</p>
            <p>
              Log in to your free accout to be able to get all features of
              Gamepad
            </p>
          </div>
          <div className="login-details2">
            <p>Icons 2</p>
            <p>Add a game to your collection</p>
          </div>
          <div className="login-details3">
            <p>Icons 3</p>
            <p>Leave a review for a game</p>
          </div>
        </div>
      </div>
      <div className="login-col2">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} class="login-form">
          <input
            className="email"
            placeholder="Email..."
            type="text"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <input
            className="password"
            placeholder="Password..."
            type="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <input value="Connexion" type="submit" />
        </form>
        <Link to={`/signup`}>
          <p>Don't have an account yet ?</p>
        </Link>
      </div>
    </section>
  );
};

export default Login;
