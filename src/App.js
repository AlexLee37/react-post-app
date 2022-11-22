import React, { useEffect, useState } from 'react';
import './styles/App.css';
import { BrowserRouter, Link } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context/context';
import MyButton from './components/UI/button/MyButton';

function App() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('auth')) {
            setIsAuth(true)
        }
    }, [])

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }


    return (
        <AuthContext.Provider value={{
            isAuth,
            setIsAuth
        }}>
            <BrowserRouter>
                <div className='navbar'>
                    <div className='navbar__links'>
                        <Link to='/about'>
                            <MyButton>About Website</MyButton>
                        </Link>
                        <Link to='/posts'>
                            <MyButton>Posts</MyButton>
                        </Link>
                        <Link to='/login'>
                            <MyButton>Login</MyButton>
                        </Link>
                        <MyButton onClick={logout}>Logout</MyButton>
                    </div>
                </div>
                <AppRouter />
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
