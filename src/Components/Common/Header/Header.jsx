import React from "react";
import Logo from "../../Assets/LogoNoB.png"
import { Navbar } from "../../DashBoard"
import './Header.css'

const Dashboard_URL ='/header';
function Header () {
 
    return (
        <section className="header" >
            <section className="header-top" >
                <section className="header-top_logo" >
                   <img className="header-logo" src={Logo} />
                    
                </section>
                <section className="header-top_navbar">
                    {/* <Navbar /> */}

                </section>
            </section>

            <section className="header-bottom">
                <section className="header-bottom_phone">
                    000     
                </section>
                <section className="header-bottom_email">
                    mail
                </section>
            </section>
        </section>
       
    )
}

export default Header;