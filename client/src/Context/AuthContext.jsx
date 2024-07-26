import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );
    const [error, setError] = useState(null);

    const login = async (formData) => {
        try {
            const res = await axios.post("/api/login", formData);
            if (res.data.user) {
                setCurrentUser(res.data);
                setError(null);
                return true;
            }
            setError(res.data.message);
            return false;
        } catch (error) {
            setError("An error occurred while logging in. Please try again.");
            console.error("Login error:", error);
            return false;
        }
    };

    const logout = async () => {
        try {
            await axios.post("/api/logout");
            setCurrentUser(null);
            setError(null);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    const register =async (formData) => {
        try {
            const res = await axios.post('/api/register', formData);
            if (res.data.user) {
                setError(null);
                return true;
            }
            setError(res.data.message);
            return false;
            
        } catch (error) {
            setError("An error occurred while register in. Please try again.");
            console.error("Register error:", error);
            return false;
            
        }
    }

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser));
    }, [currentUser]);

    return (
        <AuthContext.Provider value={{ currentUser, login, logout,register, error }}>
            {children}
        </AuthContext.Provider>
    );
};
