import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

interface ButtonGoBackProps {}

const ButtonGoBack: FunctionComponent<ButtonGoBackProps> = () => {
    const navigate = useNavigate();

    const navigateBack = () => {
        navigate(-1);};
    return ( 
        <>
             <button onClick={() => navigateBack()} className="custom-button" type="button">
                <div className="custom-button-progress">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        height="20px"
                        width="20px"
                    >
                        <path
                            d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                            fill="#000000"
                        ></path>
                        <path
                            d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                            fill="#000000"
                        ></path>
                    </svg>
                </div>
                <p className="custom-button-text">Go Back</p>
            </button>
        </>
     );
}
 
export default ButtonGoBack;