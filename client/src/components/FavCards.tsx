import { useEffect, useState } from "react";
import { getAllCards } from "../services/cardsService";
import { decodeToken } from "../services/tokenService";
import { Card } from "../interfaces/cards/Cards";
import { Link } from "react-router-dom";
import "../styles/b-cards.css";
import "../styles/fav-card.css";
import { GiRotaryPhone } from "react-icons/gi";
import FavButton from "./FavButton";

const FavCards = () => {
  const [favorites, setFavorites] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId = decodeToken(localStorage.getItem("token")!)._id;

  const refetchFavorites = () => {
    setIsLoading(true);
    getAllCards()
      .then((res) => {
        const liked = res.data.filter((card: Card) =>
          card.likes.includes(userId)
        );
        setFavorites(liked);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    refetchFavorites();
  }, []);

  return (
    <div className="container">
      <h1 className="fav-title title">Favorite Cards</h1>

      {isLoading ? (
        <div className="loading-container" role="status">
          <span className="loading-text">Loading...</span>
        </div>
      ) : favorites.length === 0 ? (
        <p className="empty-message">Your favorites list is empty.</p>
      ) : (
        <ul className="cards-list">
          {favorites.map((card) => (
            <li key={card._id} className="cards-item">
              <Link to={`/CardDetails/${card._id}`} className="card-link">
                <div className="cards-img">
                  <img src={card.image.url} alt={card.image.alt} />
                </div>
              </Link>
              <div className="cards-content">
                <h4 className="cards-title">{card.title}</h4>
                <h5 className="cards-subtitle">{card.subtitle}</h5>
                <div className="cards-address">
                  <h6 className="address-label">Address:</h6>
                  <p className="address-info">
                    {card.address.street}: {card.address.houseNumber}, {card.address.city}
                  </p>
                </div>

                <div className="cards-contact">
                  <a href={`tel:${card.phone}`} className="contact-link contact-phone">
                    <GiRotaryPhone className="contact-icon" />
                  </a>
                  <div className="contact-like contact-link">
                    <FavButton
                      cardId={card._id}
                      likes={card.likes}
                      onToggle={refetchFavorites}
                    />
                  </div>
                </div>

              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FavCards;
