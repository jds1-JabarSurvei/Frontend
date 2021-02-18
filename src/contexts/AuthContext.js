import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState();
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        authenticateLoggedIn();
    }, []);

    const authenticateLoggedIn = async () => {
        // Di sini bakal diterapin untuk ngecek
        // Apakah sebelumnya admin sudah log in
        // Bisa menggunakan cookies, local storage, atau dari server

        // Implement login check here

        // Implement login check here
        setLoading(false);
    }

    const value = {
        currentUser,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;