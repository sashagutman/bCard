import { FunctionComponent } from "react";
import "../styles/footer.css";
import { useAuth } from "../context/AuthContext"; 
import { Link } from "react-router-dom";

const Footer: FunctionComponent = () => {
    const { isAuthenticated, isBusiness } = useAuth();

    return ( 
        <footer className="footer">
            <div className="_container">
                <ul className="footer-list">
                    <li className="footer-item">
                        <Link to="/about" className="footer-link">About
                            <i className="fa-solid fa-circle-info"></i>
                        </Link>
                    </li>
                    
                    {isAuthenticated && (
                        <li className="footer-item">
                            <Link to="/fav-cards" className="footer-link">Favorites
                                <i className="fa-regular fa-heart"></i>
                            </Link>
                        </li>
                    )}

                    {isBusiness && (
                        <>
                            <li className="footer-item">
                                <Link to="/my-cards" className="footer-link">My Cards
                                    <i className="fa-solid fa-address-card"></i>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </footer>
    );
}

export default Footer;