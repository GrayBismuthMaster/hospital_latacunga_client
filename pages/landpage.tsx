import React from "react";
import NavBar from "../components/LandingPage/NavBar";
import Banner from "../components/LandingPage/Banner/Banner";
import QuienesSomos from "../components/LandingPage/QuienesSomos/QuienesSomos";
import Servicios from "../components/LandingPage/Servicios/Servicios";
import Contacto from '../components/LandingPage/Contacto/Contacto'
import Footer from "../components/LandingPage/Footer/Footer";
import DondeEncontrarnos from '../components/LandingPage/DondeEncontrarnos/DondeEncontrarnos';
const landpage = () => {
    return(
        <>
            <NavBar/>
            <Banner/>
            <QuienesSomos/>
            <Servicios/>
            <DondeEncontrarnos/>
            <Contacto/>
            <Footer/>
        </>
    )
}

export default landpage;