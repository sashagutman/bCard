import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../interfaces/cards/Cards";
import { getCardById } from "../services/cardsService";
import '../styles/cardDetails.css'
import ButtonGoBack from "./ButtonGoBack";

const CardDetails = () => {
    const { cardId } = useParams<{ cardId: string }>();
    const [card, setCard] = useState<Card | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!cardId) return;
        getCardById(cardId)
            .then((res) => {
                setCard(res.data);
                setIsLoading(false);
            })
            .catch(() => {
                setError("error");
                setIsLoading(false);
            });
    }, [cardId]);

    if (isLoading) return <span className="loading-text">Loading...</span>;
    if (error) return <span className="error-text">{error}</span>;
    if (!card) return <span className="error-text">Card not found</span>;

    return (
        <>
            <div className="container">
                <h1 className="details-title title">{card.title}</h1>
                <div className="card-details">
                    <div className="details-img">
                        <img src={card.image.url} alt={card.image.alt} className="card-image" />
                    </div>
                    <h2 className="details-subtitle">{card.subtitle}</h2>
                    <div className="details-contacts">
                        <span>{card.description}</span>
                        <div className="contacts-body">
                            <p className="contacts-body_title">Email:</p>
                            <a className="contacts-body_link linkEffect linkEffect--rightToLeft" href={`mailto:${card.email}`}>{card.email}</a>
                        </div>
                        <div className="contacts-body">
                            <p className="contacts-body_title">Phone:</p>
                            <a className="contacts-body_link linkEffect linkEffect--rightToLeft" href={`tel:${card.phone}`}>{card.phone}</a>
                        </div>
                        <div className="contacts-body">
                            <p className="contacts-body_title">Website:</p>
                            <a className="contacts-body_link linkEffect linkEffect--rightToLeft" href={card.web} target="_blank" rel="noopener noreferrer">Visit Website
                            </a>
                        </div>
                        <div className="contacts-body">
                            <p className="contacts-body_title">Address:</p>
                            <a className="contacts-body_link linkEffect linkEffect--rightToLeft" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(card.address.street + ' ' + card.address.houseNumber + ', ' + card.address.city)}`} target="_blank" rel="noopener noreferrer">
                            <span>{card.address.city}, {card.address.street} {card.address.houseNumber}</span>
                            </a>
                        </div>
                        <div className="contacts-body">
                            <p className="contacts-body_title">Zip:</p>
                            <a className="contacts-body_link linkEffect linkEffect--rightToLeft" target="_blank" rel="noopener noreferrer">{card.address.zip}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <ButtonGoBack />

        </>
    );
};

export default CardDetails;

