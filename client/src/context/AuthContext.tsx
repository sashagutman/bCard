import { createContext, useContext, useState, useEffect } from "react";
import { decodeToken } from "../services/tokenService";
import { DecodedToken } from "../interfaces/users/Token";
import { getUserById } from "../services/userService";

interface AuthContextType {
  isAuthenticated: boolean;
  isBusiness: boolean;
  profileImage: string | null;
  login: (token: string, isBusiness: boolean) => void;
  logout: () => void;
  setProfileImage: (image: string | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isBusiness, setIsBusiness] = useState<boolean>(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    let businessStatus = false;

    if (token) {
      try {
        const decoded: DecodedToken = decodeToken(token);
        businessStatus = decoded.isBusiness === true;

        getUserById(decoded._id)
          .then((res) => {
            setProfileImage(res.data.image?.url || null);
          })
          .catch(() => {
            setProfileImage(null);
          });

      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }

    setIsAuthenticated(!!token);
    setIsBusiness(businessStatus);
  }, []);

  const login = (token: string, isBusiness: boolean) => {
    localStorage.setItem("token", token);
    localStorage.setItem("isBusiness", isBusiness.toString());
    setIsAuthenticated(true);
    setIsBusiness(isBusiness);
    
    const decoded = decodeToken(token);
    getUserById(decoded._id)
      .then((res) => {
        setProfileImage(res.data.image?.url || null);
      })
      .catch(() => setProfileImage(null));
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isBusiness");
    setIsAuthenticated(false);
    setIsBusiness(false);
    setProfileImage(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, isBusiness, profileImage, login, logout, setProfileImage }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};




