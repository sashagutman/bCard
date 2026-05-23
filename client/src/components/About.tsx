import { FunctionComponent } from "react";
import { FaUserPlus, FaIdCard, FaCog, FaLink, FaAddressCard, FaPen, FaStar, FaSearch } from "react-icons/fa";
import '../styles/about.css';

const About: FunctionComponent = () => {
    return ( 
        <div className="container">
            <div className="about-container">
                <h2 className="about-title title">About</h2>

                <h3 className="about-subtitle">What is it?</h3>
                <p className="about-text">
                    Business Cards is a convenient web application for creating, managing, and storing business cards.
                    In our service, users can add their cards with important information about their company or contacts,
                    manage them, and share them with others.
                </p>

                <h3 className="about-subtitle">Why is this needed?</h3>
                <p className="about-text">
                    This tool is designed for anyone who wants to easily and quickly create a digital version of their business card.
                    Unlike regular paper business cards, the digital version is always with you and accessible on different devices.
                </p>

                <div className="features-block block">
                    <h3 className="about-subtitle">Key Features:</h3>
                    <div className="features-items flex-body">
                        <div className="feature-item item-about">
                            <FaAddressCard className="icon" />
                            <h4>Create Business Cards</h4>
                            <p>Easily add cards with details about your company or contact.</p>
                        </div>
                        <div className="feature-item item-about">
                            <FaPen className="icon" />
                            <h4>Edit and Delete</h4>
                            <p>Update or remove your cards anytime with just a click.</p>
                        </div>
                        <div className="feature-item item-about">
                            <FaStar className="icon" />
                            <h4>Favorites</h4>
                            <p>Save the most important cards for quick access.</p>
                        </div>
                        <div className="feature-item item-about">
                            <FaSearch className="icon" />
                            <h4>Search</h4>
                            <p>Find the right card instantly using keywords or categories.</p>
                        </div>
                    </div>
                </div>

                <div className="benefits-block block">
                    <h3 className="about-subtitle">Who will benefit?</h3>
                    <div className="benefits">
                        <div className="benefit-item item-about">
                            <FaUserPlus className="icon benefits-icon" />
                            <p><strong>Entrepreneurs & Small Businesses</strong> - Digital cards for seamless networking.</p>
                        </div>
                        <div className="benefit-item item-about">
                            <FaIdCard className="icon benefits-icon" />
                            <p><strong>Freelancers</strong> - Showcase your services and connect with clients easily.</p>
                        </div>
                        <div className="benefit-item item-about">
                            <FaLink className="icon benefits-icon" />
                            <p><strong>Professionals & Networkers</strong> - Share your contact details on the go.</p>
                        </div>
                    </div>
                </div>

                <div className="step-block block">
                    <h3 className="about-subtitle">How does it work?</h3>
                    <div className="steps-items flex-body">
                        <div className="step-item item-about">
                            <FaUserPlus className="icon" />
                            <h4>Register</h4>
                            <p>Sign up on the website to create your account.</p>
                        </div>
                        <div className="step-item item-about">
                            <FaIdCard className="icon" />
                            <h4>Create Your Card</h4>
                            <p>Add important details and design your business card.</p>
                        </div>
                        <div className="step-item item-about">
                            <FaCog className="icon" />
                            <h4>Manage</h4>
                            <p>Edit, update, or delete your cards anytime.</p>
                        </div>
                        <div className="step-item item-about">
                            <FaLink className="icon" />
                            <h4>Share</h4>
                            <p>Send your business card to partners with a direct link.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default About;
