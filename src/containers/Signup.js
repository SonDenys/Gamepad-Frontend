import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  // Create a fonction handleSubmit
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      // if the passwords are not corrects
      if (password !== confirmPassword) {
        setErrorPassword(false);
        setErrorMessage("Your passwords are not the same");
        // if we get a token ===> OK
      } else {
        // if the passwords are corrects
        // Call the API to save the dataUsers
        const response = await axios.post(
          "https://gamepad-backend.herokuapp.com/user/signup",
          {
            email: email,
            username: username,
            password: password,
          }
        );

        // http://localhost:3000/user/signup
        // https://gamepad-backend.herokuapp.com/user/signup

        console.log(response.data.id);

        // If we get the Token and the Id
        if (response.data.token) {
          // Save the Token and the Id in the state user
          console.log("userToken ===>" + response.data.token);
          setUser(response.data.token, response.data.id);
        }
        // redirect the user to "/"
        setErrorPassword(true);
        history.push("/");
      }
    } catch (error) {
      console.log(error.response);
      console.log(error.message);
      if (error.response.status === 409) {
        setErrorMessage("This email has already an account");
      }
      console.log(error.mesage);
    }
  };

  return (
    <section className="signup-container">
      <div className="signup-col1">
        <div className="signup-title">
          <h2>How it works</h2>
        </div>

        <div className="signup-description">
          <div className="signup-details1">
            <p>Icons 1</p>
            <p>
              Log in to your free accout to be able to get all features of
              Gamepad
            </p>
          </div>
          <div className="signup-details2">
            <p>Icons 2</p>
            <p>Add a game to your collection</p>
          </div>
          <div className="signup-details3">
            <p>Icons 3</p>
            <p>Leave a review for a game</p>
          </div>
        </div>
      </div>
      <div className="signup-col2">
        <h2>Sign up</h2>
        <form onSubmit={handleSubmit} class="signup-form">
          <input
            onChange={(event) => setUsername(event.target.value)}
            type="text"
            placeholder="Username"
            value={username}
          />
          <input
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            placeholder="Email"
            value={email}
          />
          <input
            className={errorPassword}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            placeholder="Password..."
            value={password}
          />
          <input
            className={errorPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            type="password"
            placeholder="Confirm Password..."
            value={confirmPassword}
          />

          <p style={{ color: "red" }}>{errorMessage}</p>

          <input type="submit" value="Inscription" />
          <Link to={`/login`}>
            <p>You have already an account ?</p>
          </Link>
        </form>
      </div>
    </section>
  );
};

export default Signup;
