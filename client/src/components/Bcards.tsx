import { FunctionComponent, useEffect, useState } from "react";
import { Card } from "../interfaces/cards/Cards";
import { getAllCards } from "../services/cardsService";
import { Link } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import '../styles/b-cards.css';
import { GiRotaryPhone } from "react-icons/gi";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";
import FavButton from "./FavButton";
import { useSearch } from "../context/SearchContext";

const Bcards: FunctionComponent = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { isAuthenticated } = useAuth();
  const { query } = useSearch();

  // pagination
  const [currentList, setCurrentList] = useState(0);
  const cardsPerList = 8;
  const offset = currentList * cardsPerList;
  // pagination

  // filter cards by search query
  const filteredCards = cards.filter((card) =>
    card.title.toLowerCase().includes(query.toLowerCase()) ||
    card.subtitle.toLowerCase().includes(query.toLowerCase())
  );

  // get current cards
  const currentCards = filteredCards.slice(offset, offset + cardsPerList);

  const handlePageClick = (e: { selected: number }) => {
    setCurrentList(e.selected);
  };

  // get all cards
  useEffect(() => {
    getAllCards()
      .then((res) => {
        setCards(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <h1 className="bcard-title title">Business Cards</h1>

      {isLoading ? (
        <div className="loading-container" role="status">
          <span className="loading-text">Loading...</span>
        </div>
      ) : (
        <>
          {filteredCards.length === 0 ? (
            <p className="empty-message">No results found for your search.</p>
          ) : (
            <ul className="cards-list">
              {currentCards.map((card: Card) => (
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
                      {isAuthenticated && (
                        <div className="contact-like contact-link">
                          <FavButton cardId={card._id} likes={card.likes} />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {!isLoading && filteredCards.length > cardsPerList && (
        <ReactPaginate
          previousLabel={<AiOutlineLeft className="pagination-icon" />}
          nextLabel={<AiOutlineRight className="pagination-icon" />}
          breakLabel="..."
          pageCount={Math.ceil(filteredCards.length / cardsPerList)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
};

export default Bcards;

