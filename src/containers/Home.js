import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "react-loader-spinner";

const Home = ({
  data,
  setPage,
  page,
  search,
  setData,
  addToFavorites,
  deleteToFavorites,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [platform, setPlatform] = useState("4");
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fechData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=2e0bd93ebba74c1bbd373d8ac15ca768&page=${page}&search=${search}&platforms=${platform}`
        );
        console.log("dsd", response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fechData();
  }, [page, search, platform]);

  const onClickPlaystation = () => {
    setPlatform("187");
  };

  /* FAVORITE BUTTON */

  const onAddToFavorites = (event) => {
    event.preventDefault(); // Permit to avoid the loading of the form
    setIsAdding(true);
    addToFavorites();
  };

  const onDeleteToFavorites = (event) => {
    event.preventDefault(); // Permit to avoid the loading of the form
    setIsAdding(false);
    deleteToFavorites();
  };

  const displayFavoriteButton = () => {
    if (!isAdding) {
      return (
        <form onSubmit={onAddToFavorites}>
          <button type="submit" class="addToFavorites">
            Save to Collection
          </button>
        </form>
      );
    } else {
      return (
        <form onSubmit={onDeleteToFavorites}>
          <button type="submit" class="deleteToFavorites">
            Delete from the Collection
          </button>
        </form>
      );
    }
  };

  return isLoading ? (
    <Loader
      type="Circles"
      color="white"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
  ) : (
    <section className="main">
      <h1>Most Relevance Games</h1>
      <button onClick={onClickPlaystation}>Playstation</button>
      <main id="listGames">
        {data.results.map((game, index) => {
          return (
            <div className="game-bloc-container">
              <div key={index} className="button-action-home">
                {displayFavoriteButton(game)}
              </div>
              <Link to={`/games/${game.id}`}>
                <div key={index} className="game-block">
                  <img
                    className="image-games"
                    src={game.background_image}
                    alt={game.name}
                  />

                  <p class="name">{game.name}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </main>
      <div className="pagination">
        <div className="button-previous">
          <button
            onClick={() => {
              setPage(page - 1);
            }}
          >
            {`<`} Previous
          </button>
        </div>
        <div className="button-next">
          <button
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Next {`>`}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;
