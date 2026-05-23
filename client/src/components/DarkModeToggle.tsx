import { FunctionComponent, useEffect, useRef } from "react";
import { useLocalStorage } from "./../helpers/useLocalStorage.ts";
import '../styles/darkMode.css'
import moon from '../image/darkMode/moon.svg'
import sun from '../image/darkMode/sun.svg'

interface DarkModeToggleProps {}
 
const DarkModeToggle: FunctionComponent<DarkModeToggleProps> = () => {

    const btnRef = useRef<HTMLButtonElement | null>(null);
    const [darkMode, setDarkMode] = useLocalStorage<"light" | "dark">("theme", "light");  
    useEffect(() => {
      if (darkMode === "dark") {
        document.body.classList.add("dark");
        btnRef.current?.classList.add("dark-mode-btn--active");
      } else {
        document.body.classList.remove("dark");
        btnRef.current?.classList.remove("dark-mode-btn--active");
      }
    }, [darkMode]);
  
    const toggleDarkMode = () => {
      setDarkMode((currentValue) =>
        currentValue === "light" ? "dark" : "light"
      );
    };

    return ( 
        <>
            <button ref={btnRef} className='dark-mode-btn' onClick={toggleDarkMode}>
                <img className="dark-mode-btn__icon" src={sun} />
                <img className="dark-mode-btn__icon" src={moon} />
            </button>
        </>
     );
}
 
export default DarkModeToggle;