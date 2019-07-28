import * as React from 'react';
import { useEffect } from 'react';
import { navigate, Router } from '@reach/router';
import { isAuthorizated } from './public/services/login-services';
import MainPage from './pages/main';
import LoginPage from './pages/login';
import EditProductPage from './pages/edit-product';

import './configurations/api.interseptor';
import './app.css';

const App = () => {

    useEffect(() => {
        if (isAuthorizated()) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, []);

    return(
        <div className="container">
            <Router>
                <MainPage path="/" />
                <LoginPage path="/login" />
                <EditProductPage path="edit/:productId" />
            </Router>
        </div>
    )
}

export default App;

