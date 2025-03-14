import React from 'react';
import Navbar from '../pages/shared/Navbar/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../pages/shared/Footer/Footer';

const Main = () => {
    const location = useLocation();
    // console.log(location);
    const noHeaderFooter =
      location.pathname.includes("login") ||
      location.pathname.includes("signup");

    return (
        <div>
            {noHeaderFooter || <Navbar />}
            <Outlet />
            {noHeaderFooter || <Footer/>}
        </div>
    );
};

export default Main;