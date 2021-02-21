import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const AuthContext = createContext(); // Buat dipake di class component

// BUat dipake di functional component / hooks
export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState('halo');
    const [loading, setLoading] = useState(true);
    const history = useHistory();

    useEffect(() => {
        authenticateLoggedIn();
    }, [currentUser]);

    const authenticateLoggedIn = async () => {
        // Di sini bakal diterapin untuk ngecek
        // Apakah sebelumnya admin sudah log in
        // Bisa menggunakan cookies, local storage, atau dari server

        // Implement login check here

        // Implement login check here
        setLoading(false);
    }

    const updateCurrentUser = (newUser) => {
        // Nanti bakal ditambahin ditaro di local storage/cookies/dll
        setCurrentUser(newUser);
    }

    const value = {
        currentUser,
        updateCurrentUser,
        loading
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;