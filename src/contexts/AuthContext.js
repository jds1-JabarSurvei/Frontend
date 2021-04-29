import React, { createContext, useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import APICall from 'utils/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwt from 'jwt-decode';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

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
            try {
                const jdsAdmin = jwt(cookies.get('jds'));
                if (jdsAdmin) {
                    setCurrentUser(jdsAdmin);
                } else {
                    setCurrentUser('');
                }
            } catch (e) {
                setCurrentUser('');
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
                console.log(jwt(cookies.get('jds')));
                if (res.data.login === "Success") {
                    updateCurrentUser(jwt(cookies.get('jds')));
                    history.push('/admin');
                    // Agar terbaca footer regex
                    window.location.reload();
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
        setCurrentUser(newUser);
    }

    const logout = () => {
        cookies.remove('jds');
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