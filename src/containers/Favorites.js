import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fechData = async () => {
      try {
        const userToken = Cookies.get("token");
        const userId = Cookies.get("idUser");
        const response = await axios.get(
          `https://gamepad-backend.herokuapp.com/user/favorites/${userId}`,
          {
            headers: { authorization: `Bearer ${userToken}` },
          }
        );

        // http://localhost:3000/user/favorites/${userId}
        // https://gamepad-backend.herokuapp.com/user/favorites/${userId}

        console.log(response.data);
        setFavorites(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fechData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <div>
      <p className="my-collection">My Collection</p>
      <main id="listGames">
        {favorites.favorites.map((favorite, index) => {
          console.log(favorite);
          return (
            <Link to={`/games/${favorite.gameId}`}>
              <div key={index} className="game-block">
                <img
                  className="image-games"
                  src={favorite.image}
                  alt={favorite.name}
                />
                <p class="name">{favorite.name}</p>
              </div>
            </Link>
          );
        })}
      </main>
    </div>
  );
};

export default Favorites;
