import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APICall from 'utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const AuthContext = createContext(); // Buat dipake di class component

// BUat dipake di functional component / hooks
export const useAuth = () => {
    return useContext(AuthContext);
}

const AuthContextProvider = (props) => {
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    useEffect(() => {
        authenticateLoggedIn();
    }, [currentUser]);

    const authenticateLoggedIn = async () => {
        // Kalo udah ada di local storage, brarti sebelomnya udah login

        if (!currentUser) {
            setLoading(true);
            const jdsAdmin = localStorage.getItem('jds-admin');
            if (jdsAdmin) {
                setCurrentUser(jdsAdmin);
            } else {
                setCurrentUser(false);
            }
            setLoading(false);
        }
    }

    const login = async (email, password) => {
        setLoading(true);
        let status = await APICall.post(`login`, {
            "email": email,
            "password": password
        })
            .then(res => {
                /* If successful */
                console.log(res);
                if (res.data.login === "Success") {
                    updateCurrentUser(res.data.email);
                    history.push('/admin');
                    toast.success('Login Successful');
                    return true;
                }
                return false;
            }).catch(() => {
                /* If error */
                return false;
            });
        setLoading(false);
        return status;
    }

    const updateCurrentUser = (newUser) => {
        // Nanti bakal ditambahin ditaro di local storage/cookies/dll
        localStorage.setItem('jds-admin', newUser);
        setCurrentUser(newUser);
    }

    const logout = () => {
        localStorage.removeItem('jds-admin');
        setCurrentUser();
        history.push('/login');

        // Agar terbaca footer regex
        window.location.reload();
        
        toast.error('Logged out');
    }

    const value = {
        currentUser,
        loading,
        updateCurrentUser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {props.children}
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
            />
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;