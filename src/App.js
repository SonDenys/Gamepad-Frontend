import "./css/App.css";
import "./css/Header.css";
import "./css/Home.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Footer from "./components/Footer";
import Signup from "./containers/Signup";
import Game from "./containers/Game";
import Favorites from "./containers/Favorites";
import Cookies from "js-cookie";
import axios from "axios";
import { useState } from "react";
import SearchBox from "./components/SearchBox";

function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [idUser, setIdUser] = useState(Cookies.get("idUser") || null);

  const setUser = (token, idUser) => {
    // Create the cookie as token
    if (token) {
      setToken(token);
      Cookies.set("token", token, {
        expires: 3,
      });
      // Create the cookie as idUser
      if (idUser) {
        setIdUser(idUser);
        Cookies.set("idUser", idUser, {
          expires: 3,
        });
      }
    } else {
      setToken(null);
      setIdUser(null);
      Cookies.remove("token");
      Cookies.remove("idUser");
    }
  };

  const addToFavorites = async () => {
    try {
      // Get the cookie "idUser" and assign it to the variable userId
      const userId = Cookies.get("idUser");
      // Call the request Add
      console.log("bljio", data);
      const response = await axios.post(
        `https://gamepad-backend.herokuapp.com/user/favorites/add`,
        // Select the body of the datas we want to get from the route in the backend
        {
          name: data.name,
          image: data.background_image,
          userId: userId,
          gameId: data.id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  };

  const deleteToFavorites = async () => {
    try {
      // Get the cookie "idUser" and assign it to the variable userId
      const userId = Cookies.get("idUser");
      // Call the request delete
      console.log("delete", data);
      const response = await axios.post(
        `https://gamepad-backend.herokuapp.com/user/favorites/delete`,
        // Select the body of the datas we want to get from the route in the backend
        {
          name: data.name,
          image: data.background_image,
          userId: userId,
          gameId: data.id,
        },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
    }
  };

  return (
    <section className="App">
      <div className="App-container">
        <Router>
          <Header setUser={setUser} token={token} />

          <Switch>
            <Route exact path="/">
              <SearchBox setSearch={setSearch} data={data} />
              <Home
                data={data}
                page={page}
                setPage={setPage}
                search={search}
                setData={setData}
                addToFavorites={addToFavorites}
                deleteToFavorites={deleteToFavorites}
              />
            </Route>
            <Route exact path="/games/:id">
              <Game
                token={token}
                setUser={setUser}
                idUser={idUser}
                setIdUser={setIdUser}
                data={data}
                setData={setData}
                addToFavorites={addToFavorites}
                deleteToFavorites={deleteToFavorites}
              />
            </Route>
            <Route path="/login">
              <Login
                setUser={setUser}
                token={token}
                idUser={idUser}
                setIdUser={setIdUser}
              />
            </Route>
            <Route path="/signup">
              <Signup
                setUser={setUser}
                token={token}
                idUser={idUser}
                setIdUser={setIdUser}
              />
            </Route>
            {token ? (
              <Route path="/favorites">
                <Favorites token={token} search={search} />
              </Route>
            ) : (
              <Redirect to="/login" />
            )}
          </Switch>
          <Footer />
        </Router>
      </div>
    </section>
  );
}

export default App;
