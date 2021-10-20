import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Game = ({ data, setData, addToFavorites, deleteToFavorites }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=2e0bd93ebba74c1bbd373d8ac15ca768`
        );
        // console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);

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
    <p>En cours de chargement...</p>
  ) : (
    <main>
      <h1>{data.name}</h1>
      <div className="game-infos-container1">
        <div className="game-images">
          <img
            className="game-page-image"
            src={data.background_image}
            alt={data.name}
          />
        </div>
        <div className="game-infos-container2">
          <div className="button-action"> {displayFavoriteButton()}</div>
          <div className="game-infos-container3">
            <div className="game-infos-details-col1">
              <p>
                <span>Platforms :</span>
              </p>
              <div>
                {data.platforms.map((platform, index) => {
                  return (
                    <div className="platforms" key={index}>
                      <p>{platform.platform.name}</p>
                    </div>
                  );
                })}
              </div>

              <p>
                <span>Released date : </span>
                {data.released}
              </p>
              <div>
                {data.publishers.map((publisher, index) => {
                  return (
                    <div>
                      <p>
                        <span>Publisher : </span>
                        {publisher.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="game-infos-details-col2">
              <div>
                {data.developers.map((developer, index) => {
                  return (
                    <div>
                      <p>
                        <span>Developer :</span> {developer.name}
                      </p>
                    </div>
                  );
                })}
              </div>
              <p>{data.tags[0].name}</p>
            </div>
          </div>
        </div>
      </div>
      <p>{data.description}</p>
    </main>
  );
};

export default Game;
