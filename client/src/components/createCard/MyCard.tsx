import { useEffect, useState } from "react";
import { Card } from "../../interfaces/cards/Cards";
import { getAllCards, deleteCard } from "../../services/cardsService";
import { decodeToken } from "../../services/tokenService";
import { Link } from "react-router-dom";
import "../../styles/myCard.css";
import { GoPlusCircle } from "react-icons/go";
import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import FavButton from "../FavButton";
import ConfirmModal from "../ConfirmModal";


const MyCard = () => {
    const [myCards, setMyCards] = useState<Card[]>([]);
    const userId = decodeToken(localStorage.getItem("token")!)._id;
    //confirm delete
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [selectedCardId, setSelectedCardId] = useState<string | null>(null);


    const fetchMyCards = () => {
        getAllCards()
            .then((res) => {
                const userCards = res.data.filter((card: Card) => card.user_id === userId);
                setMyCards(userCards);
            })
            .catch((err) => console.error(err));
    };

    const handleDeleteClick = (cardId: string) => {
        setSelectedCardId(cardId);
        setShowConfirmModal(true);
      };
      
      const confirmDelete = () => {
        if (!selectedCardId) return;
      
        deleteCard(selectedCardId)
          .then(() => {
            fetchMyCards();
            setShowConfirmModal(false);
            setSelectedCardId(null);
          })
          .catch((err) => console.error(err));
      };
      
      const cancelDelete = () => {
        setShowConfirmModal(false);
        setSelectedCardId(null);
      };
      

    useEffect(() => {
        fetchMyCards();
    }, []);

    return (
        <>
        <div className="container">
            <div className="mycard-inner">
                <h1 className="mycard-title title">My Cards</h1>
                <Link to="/new-card" className="mycard-link">
                    <button type="button" className="button">
                        <span className="button__text">Create Card</span>
                        <span className="button__icon">
                            <GoPlusCircle className="add-icon" />
                        </span>
                    </button>
                </Link>
                {myCards.length === 0 ? (
                    <>
                        <p className="mycard-text">
                            You don't have any cards yet. Want to share your business with others? Click to create your first card!
                        </p>
                    </>
                ) : (
                    <ul className="cards-list">
                        {myCards.map((card) => (
                            <li key={card._id} className="cards-item">
                                <Link to={`/CardDetails/${card._id}`} className="card-link">
                                    <div className="cards-img">
                                        <img src={card.image.url} alt={card.image.alt} />
                                    </div>
                                    <div className="cards-content">
                                        <h4 className="cards-title">{card.title}</h4>
                                        <h5 className="cards-subtitle">{card.subtitle}</h5>
                                        <div className="cards-address">
                                            <h6 className="address-label">Address:</h6>
                                            <p className="address-info">
                                                {card.address.street}: {card.address.houseNumber}, {card.address.city}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                <div className="cards-btn">
                                    <button className="delete-button mycard-btn" onClick={() => handleDeleteClick(card._id)}>
                                        <FaTrashAlt />
                                    </button>
                                    <div className="contact-like contact-link">
                                        <FavButton cardId={card._id} likes={card.likes} />
                                    </div> 
                                    <Link to={`/edit-card/${card._id}`} className="edit-button mycard-btn">
                                            <FaRegEdit />
                                    </Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
            {showConfirmModal && (
                <ConfirmModal
                    message="Are you sure you want to delete this card?"
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </>
    );
};

export default MyCard;
